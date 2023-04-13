export interface ExpjsAnswer {
    flags: Record<string, string[] | undefined>;
    i?: string;
    experiments?: string;
}

export interface Config {
    nonce?: string;        // nonce will be added to style and script tags (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce)
    enableVisual: boolean; // default true
    enableHTML: boolean;   // default true. Ignored if enableVisual = false
    enableJS: boolean;     // default false. Ignored if enableVisual = false
    enableRedir: boolean;  // default true
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
