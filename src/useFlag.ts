import { UseExperiments, useExperiments } from './useExperiments';

export const useFlag = <T extends Record<string, string>>(name: keyof T, params: UseExperiments) => {
    const { ready, flags } = useExperiments<T>(params);

    return { ready, value: flags[name] };
}
