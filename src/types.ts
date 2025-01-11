export interface ExpjsAnswer {
    flags: Record<string, string[] | undefined>;
    i?: string;
    experiments?: string;
    testids?: number[];
}

export interface Config {
    /**
     * nonce will be added to style and script tags (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce)
     */
    nonce?: string;
    /**
     * Enables Visual Editor
     *
     * Default: true
     */
    enableVisual: boolean;
    /**
     * Enables HTML tab in Visual Editor
     * Ignored if enableVisual = false
     *
     * Default: true
     */
    enableHTML: boolean;
    /**
     * Enables JS tab in Visual Editor
     * Ignored if enableVisual = false
     *
     * Default: false
     */
    enableJS: boolean;
    /**
     * Enables redirect experiments
     *
     * Default: true
     */
    enableRedir: boolean;
    /**
     * Enables watch mode
     * Runs the MutationObserver and reapplies the changes when the element changes.
     * Applied only for experiments with Visual Editor
     * Ignored if enableVisual = false
     * Visual Editor changes won't be applied after rerender if enableWatch = false
     *
     * Default: true
     */
    enableWatch: boolean;
    /**
     * Save experiment marker before redirect
     *
     * Default: true
     */
    storeRedirParam: boolean | 'localstorage' | 'cookie' | 'get';
    /**
     * How long wait for Yandex Metrica counter to initialize before make a redirect.
     * Applied only to experiments with redirect
     * Number in milliseconds
     *
     * Default: 100
     */
    metrikaTimeout: number;
    /**
     * Enables Adv experiments
     *
     * Default: true
     */
    enableAdv: boolean;
    /**
     * Enables sending Yandex Metrica cookies to uaas.yandex.ru
     *
     * Default: true
     */
    enableSendYmUid: boolean;
    /**
     * Enables setting Yandex Metrica cookies
     *
     * Default: false
     */
    enableSetYmUid: boolean;
    /**
     * Defines the domain for setting cookies
     *
     * Default: undefined
     */
    cookieDomain?: string | undefined;
    /**
     * Enables saving the Referer in the sessionStorage upon redirect so that it can be sent to Yandex Metrica
     *
     * Default: false
     */
    storeReferer: boolean;
    /**
     * Enables removal of the ab_redir parameter from the page URL upon successful redirect
     *
     * Default: false
     */
    removeAbRedirParam: boolean;
}

export interface Answer extends ExpjsAnswer {
    /**
     * Is flags ready to use
     */
    ready: true;
}

export interface NoAnswer {
    flags: Record<string, undefined>;
    i?: undefined;
    experiments?: undefined;
    testids?: undefined;
    /**
     * Is flags ready to use
     */
    ready: false;
}

export interface AnswerNamed<T> extends Omit<Answer, 'flags'> {
    /**
     * Key-Value storage of all flags
     */
    flags: Partial<Record<keyof T, string[]>>;
}

export interface NoAnswerNamed<T> extends Omit<NoAnswer, 'flags'> {
    /**
     * Empty storage of flags
     */
    flags: Partial<Record<keyof T, undefined>>;
}

export type ReturnType = Answer | NoAnswer;
export type NamedReturnType<T> = AnswerNamed<T> | NoAnswerNamed<T>;
