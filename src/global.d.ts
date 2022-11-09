interface ExpjsAnswer {
    flags: Record<string, string[] | undefined>;
    i?: string;
    experiments?: string;
}

type InitFn = "init";

interface Window {
    ymab: {
        (clientId: number | string, func: InitFn, iParam?: string, callback: (data: ExpjsAnswer) => void),
        a?: IArguments[];
    }
}
