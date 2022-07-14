interface ExpjsAnswer {
    flags: Record<string, string[] | undefined>;
    i?: string;
    experiments?: string;
}

type InitFn = "init";

type Init = (clientId: number | string, func: InitFn, iParam?: string, callback: (data: ExpjsAnswer) => void) => void;

interface Window {
    ymab: Init;
}
