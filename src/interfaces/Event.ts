export interface Event {
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
}

export interface Event {
}

export interface Teams {
    local: Event;
    visitor: Event;
}
