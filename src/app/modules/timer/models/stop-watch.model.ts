export interface stopWatchModel {
    minutes?: number;
    seconds?: number;
    milliseconds: number;
}

export interface stopWatchToShowModel {
    minutes: string;
    seconds: string;
    milliseconds: string;
}

export interface lap {
    minutes: string;
    seconds: string;
    milliseconds: string;
    id?: number
}

export interface toLocalStore {
    status?: string;
    startTime?: stopWatchToShowModel;
    diffPoint?: number;
    lapArr?: lap[];
}
