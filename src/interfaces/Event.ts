export interface SportEvent {
    sport: string;
    date: DateClass;
    details: Details;
    teams: Teams;
    channels: string[];
    event: Event;
    links?: string[];
}

export interface DateClass {
    hour: string;
    day: string;
    zone: string;
}

export interface Details {
    competition: string;
    round?: string;
}

export interface Event {
    name?: string;
    description?: string;
    startDate?: string;
    duration?: string;
}

export interface Teams {
    local: {
        name?: string;
        image?: string;
    }
    visitor: {
        name?: string;
        image?: string;
    }
}
