export interface ExpjsAnswer {
    flags: Record<string, string[] | undefined>;
    i?: string;
    experiments?: string;
    testids?: number[];
}

export interface Config {
    nonce?: string;        // nonce will be added to style and script tags (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce)
    enableVisual: boolean; // default true
    enableHTML: boolean;   // default true. Ignored if enableVisual = false
    enableJS: boolean;     // default false. Ignored if enableVisual = false
    enableRedir: boolean;  // default true
    // Runs the MutationObserver and reapplies the changes when the element changes.
    // Applied only for experiments with visual-editor
    enableWatch: boolean;     // default true, if enableVisual !== false
    // Save experiment marker before redirect
    storeRedirParam: boolean | 'localstorage' | 'cookie' | 'get';  // default true
    // How long wait for Yandex metrica counter to initialize before make a redirect.
    // Applied only to experiments with redirect
    metrikaTimeout: number;    // default 100.
}

export interface Answer extends ExpjsAnswer {
    ready: true;
}

export interface NoAnswer {
    flags: Record<string, undefined>;
    i?: undefined;
    experiments?: undefined;
    testids?: undefined;
    ready: false;
}

export interface AnswerNamed<T> extends Omit<Answer, 'flags'> {
    flags: Partial<Record<keyof T, string[]>>;
    ready: true;
}

export interface NoAnswerNamed<T> extends Omit<NoAnswer, 'flags'> {
    flags: Partial<Record<keyof T, undefined>>;
}

export type ReturnType = Answer | NoAnswer;
export type NamedReturnType<T> = AnswerNamed<T> | NoAnswerNamed<T>;
