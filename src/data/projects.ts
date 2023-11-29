export type Project = {
    title: string;
    techs: string[];
    link: string;
    isComingSoon?: boolean;
};

const projects: Project[] = [
    {
        title: "microp64",
        techs: ["asm"],
        link: "https://github.com/ugurilter/microp64",
        // isComingSoon: true,
    },
    {
        title: "algvis",
        techs: ["java"],
        link: "https://ugurilter.github.io/AlgVis/",
        // isComingSoon: true,
    },
    {
        title: "sharedmem",
        techs: ["C"],
        link: "https://github.com/ugurilter/shared-mem",
        // isComingSoon: true,
    },
    {
        title: "rascar",
        techs: ["java", "raspberry-pi"],
        link: "https://ugurilter.github.io/RasCar/",
        // isComingSoon: true,
    },
];

export default projects;
