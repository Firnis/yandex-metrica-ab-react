interface ExpjsAnswer {
    flags: Record<string, string[] | undefined>;
    i?: string;
    experiments?: string;
}

type InitFn = "init";

interface Window {
    ymab: {
        (clientId: number | string, func: InitFn, iParam?: string, features?: Record<string, string>, callback: (data: ExpjsAnswer) => void): void;
        a?: IArguments[];
    }
}
