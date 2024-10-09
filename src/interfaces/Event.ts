export interface Event {
    title: string;
    teams: {
        home: string | null;
        away: string | null;
    };
    sport: string;
    competition: string;
    date: {
        day: string;
        time: string;
        zone: string;
    };
    channels: string[];
}