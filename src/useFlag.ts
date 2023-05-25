import { UseExperiments, useExperiments } from './useExperiments';

export function useFlag<T extends Record<string, string>>(name: keyof T, params: UseExperiments, takeFirst?: false): { ready: boolean, value: Array<string> };
export function useFlag<T extends Record<string, string>>(name: keyof T, params: UseExperiments, takeFirst: true): { ready: boolean, value: string };

export function useFlag<T extends Record<string, string>>(name: keyof T, params: UseExperiments, takeFirst = false) {
    const { ready, flags } = useExperiments<T>(params);
    const value = flags[name] || [];

    return {
        value: takeFirst ? (value[0] || '') : value,
        ready,
    };
}
