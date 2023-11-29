function fill_status(data) {
    const status_map = {
        'online': { mclass: 'st-green', text: 'online', cclass: 'st-c-green' },
        'offline': { mclass: 'st-red', text: 'offline', cclass: 'st-c-red' },
        'idle': { mclass: 'st-orange', text: 'idle', cclass: 'st-c-orange' },
        'dnd': { mclass: 'st-red', text: 'DnD', cclass: 'st-c-red' }
    };

    const statusElement    = document.getElementById('status');
    const statusCElement   = document.getElementById('status-c');
    const statusTxtElement = document.getElementById('statusTxt');
    const dc_status        = data.d.discord_status;
    
    if (dc_status) {
        console.log(status_map[dc_status].mclass);
        const statusClass  = status_map[dc_status].mclass ?? '';
        const statusCClass = status_map[dc_status].cclass ?? '';
        const statusText   = status_map[dc_status].text ?? '';

        statusCElement.classList.remove('st-c-green', 'st-c-red', 'st-c-orange');
        statusElement.classList.remove('st-green', 'st-red', 'st-orange');
        statusCElement.classList.add(statusCClass);
        statusElement.classList.add(statusClass);
        statusTxtElement.textContent = statusText;
    }
}

function fill_listening(activity) {
    const listeningElem = document.getElementById('listening');

    listeningElem.innerHTML = activity.state + ' - ' + activity.details;
}

function fill_playing(activity) {
    const playingElem = document.getElementById('playing');

    playingElem.innerHTML = activity.name;
}

function fill_working(activity) {
    const workingElem = document.getElementById('working');

    workingElem.innerHTML = activity.state.split('Workspace: ')[1] + '<br/>' + activity.details.split('Editing ')[1];
}

function clean_up_user_data() {
    const listeningElem = document.getElementById('listening');
    const playingElem   = document.getElementById('playing');
    const workingElem   = document.getElementById('working');

    listeningElem.innerHTML = '-';
    playingElem.innerHTML   = '-';
    workingElem.innerHTML   = '-';
}

function update_user_data(j) {
    var data = JSON.parse(j);
    console.log(data);

    fill_status(data);

    const dc_activities = data.d.activities;

    clean_up_user_data();

    dc_activities.forEach(activity => {
        if (activity.name === 'YouTube Music') {
            fill_listening(activity);
        } else if (activity.name === 'Visual Studio Code') {
            fill_working(activity);
        } else if (activity.name && !activity.details) {
            fill_playing(activity);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    clean_up_user_data();

    const socket = new WebSocket("wss://api.lanyard.rest/socket");
    let data = { subscribe_to_id: '144871706257784832' };
    let type = 'one';
    let Users = new Map();

    socket.onopen = () => console.log("opened socket connection");

    socket.onmessage = (event) => {
        const json = JSON.parse(event.data);

        switch (json.op) {
            case 1: {
                if (socket.readyState == socket.OPEN) {
                    socket.send(JSON.stringify({ op: 2, d: data }));
                }

                setInterval(() => {
                    if (socket.readyState == socket.OPEN) {
                        socket.send(JSON.stringify({ op: 3 }));
                    }
                }, json.d.heartbeat_interval);

                break;
            }

            case 0: {
                switch (json.t) {
                    case "INIT_STATE": {
                        Users = new Map([[json.d.discord_user.id, json.d]]);
                        update_user_data(event.data);
                        break;
                    }
                    case "PRESENCE_UPDATE": {
                        Users.set(json.d.discord_user.id, json.d);
                        update_user_data(event.data);
                        break;
                    }
                }
            }
        }

    };
});