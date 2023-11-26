type Social = {
    label: string;
    link: string;
};

type Presentation = {
    mail: string;
    title: string;
    description: string;
    socials: Social[];
    profile?: string;
};

const presentation: Presentation = {
    mail: "ugur@ilter.tech",
    title: "Hi, I’m Ugur 👋",
    profile: "/profile-pic.jpeg",
    description:
        "Hello, I'm a *Sr. Embedded Software Engineer* (currently working for *Airties*) with over *6+ years* of embedded software development experience. Outside of work I'm interested in web development technologies such as *nodejs*, *reactjs* and *nextjs*. I also love to play video games in my spare time! 🎮",
    socials: [
        {
            label: "Linkedin",
            link: "https://linkedin.com/in/ugurilter/",
        },
        {
            label: "Insta",
            link: "https://instagram.com/u_ilter",
        },
        {
            label: "Github",
            link: "https://github.com/ugurilter",
        },
        {
            label: "Steam",
            link: "https://steamcommunity.com/id/kerneldev/",
        },
        {
            label: "Discord",
            link: "https://discord.com/users/144871706257784832",
        },
    ],
};

export default presentation;
