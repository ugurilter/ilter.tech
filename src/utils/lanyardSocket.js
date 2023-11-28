function update_user_data(j) {
    var data = JSON.parse(j);
    const dc_status = data.d.discord_status;
    const dc_activity = data.d.activities[0];
    const statusElement = document.getElementById('status');
    const statusCElement = document.getElementById('status-c');
    const statusTxtElement = document.getElementById('statusTxt');

    const status_map = {
        'online': 'st-green',
        'offline': 'st-red',
        'idle': 'st-orange',
        'dnd': 'st-red'
    };

    const status_c_map = {
        'online': 'st-c-green',
        'offline': 'st-c-red',
        'idle': 'st-c-orange',
        'dnd': 'st-c-red'
    }

    if (dc_status) {
        const statusClass = status_map[dc_status] ?? '';
        const statusCClass = status_c_map[dc_status] ?? '';

        if (statusElement && statusCElement && statusTxtElement) {
            statusCElement.classList.remove('st-c-green', 'st-c-red', 'st-c-orange');
            statusElement.classList.remove('st-green', 'st-red', 'st-orange');
            statusCElement.classList.add(statusCClass);
            statusElement.classList.add(statusClass);
            statusTxtElement.textContent = dc_status;
        }
    }

    if (dc_activity) {
        const activityTypeElement = document.getElementById('activity-type');

        if (dc_activity.name === 'YouTube Music') {
            activityTypeElement.innerHTML =  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /></svg>';
            activityTypeElement.innerHTML += 'Listening: ';
            activityTypeElement.innerHTML += '<marquee scrollamount=3 behavior="scroll">' + dc_activity.state + ' - ' + dc_activity.details + '</marquee>'
        } else if (activityElement && dc_activity.name === 'Custom Status') {
            activityElement.innerHTML =  dc_activity.state + dc_activity.emoji.name;
        } else if (activityElement && !dc_activity.state && !dc_activity.details) {
            activityElement.innerHTML = 'Playing: ' + dc_activity.name;
            console.log(data);
            // https://cdn.discordapp.com/app-icons/358425751197974528/ea12a992732b0b6d521b109b88e60b9b.webp?size=40&keep_aspect_ratio=false
            // activityElement.innerHTML += 'https://cdn.discordapp.com/app-icons/' + dc_activity.application_id + '/' + dc_activity.assets.large_image + '.webp?size=40&keep_aspect_ratio=false';
        }
    } else {
        const activityElement = document.getElementById('activity-type');

        if (activityElement) {
            activityElement.innerHTML = 'Doing nothing...';
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
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