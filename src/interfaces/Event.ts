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

export interface Team {
    name?: string;
    image?: string;
}

export interface Teams {
    local: Team;
    visitor: Team;
}

// Tipos de utilidad para mejorar la seguridad de tipos
export type ThemeMode = 'light' | 'dark';
export type ViewMode = 'grid' | 'list';
