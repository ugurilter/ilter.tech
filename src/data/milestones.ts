export type Milestone = {
    company: string;
    start: Date;
    end: Date;
    country: string;
    city: string;
    position: string;
    description?: string;
};

const milestones: Milestone[] = [
    {
        company: "Airties",
        start: new Date("2022-03-01"),
        end: new Date(),
        country: "Turkey",
        city: "Izmir",
        position: "Sr. Embedded Software Engineer",
    },
    {
        company: "Airties",
        start: new Date("2020-06-01"),
        end: new Date("2022-03-01"),
        country: "Turkey",
        city: "Izmir",
        position: "Experienced Embedded Software Engineer",
    },
    {
        company: "Airties",
        start: new Date("2017-08-01"),
        end: new Date("2020-06-01"),
        country: "Turkey",
        city: "Izmir",
        position: "Embedded Software Engineer",
    },
    {
        company: "Airties",
        start: new Date("2017-07-01"),
        end: new Date("2017-08-01"),
        country: "Turkey",
        city: "Izmir",
        position: "Software Engineering Intern",
    },
    {
        company: "Astron",
        start: new Date("2016-10-01"),
        end: new Date("2017-02-01"),
        country: "Turkey",
        city: "Izmir",
        position: "Software Engineer",
    },
    {
        company: "FCR Tech",
        start: new Date("2016-06-01"),
        end: new Date("2016-09-01"),
        country: "Czech Republic",
        city: "Prague",
        position: "Software Engineering Intern",
    },
    {
        company: "Yasar University",
        start: new Date("2015-06-01"),
        end: new Date("2016-06-01"),
        country: "Turkey",
        city: "Izmir",
        position: "Undergraduate Research Assistant",
    },
];

export default milestones;
