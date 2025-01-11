import { UseExperiments, useExperiments } from './useExperiments';
import type { Answer } from './types';

type Ready = Pick<Answer, 'ready'>;

export function useFlag<T extends Record<string, string>>(name: keyof T, params: UseExperiments, takeFirst?: false): Ready & {
    /**
     * Flag values
     */
    value: Array<string>
};
export function useFlag<T extends Record<string, string>>(name: keyof T, params: UseExperiments, takeFirst: true): Ready & {
    /**
     * Flag value
     */
    value: string
};

export function useFlag<T extends Record<string, string>>(name: keyof T, params: UseExperiments, takeFirst = false) {
    const { ready, flags } = useExperiments<T>(params);
    const value = flags[name] || [];

    return {
        value: takeFirst ? (value[0] || '') : value,
        ready,
    };
}
