interface ExpjsAnswer {
    flags: Record<string, string[]>;
    i: string;
    experiments: string;
}

export interface Answer extends ExpjsAnswer {
    ready: true;
}

export interface NoAnswer {
    flags: Record<string, undefined>;
    i?: undefined;
    experiments?: undefined;
    ready: false;
}
