import React, { Context, ReactNode, useContext, useEffect, useState } from 'react';

import { ReturnType, NamedReturnType } from './types';
import { useExperiments, UseExperiments } from './useExperiments';

export const MetricaExperimentsContext = React.createContext<ReturnType>({
    flags: {},
    ready: false,
});

const DEFAULT_ANTIFLICKER_TIMEOUT = 4000;

interface ContextExperiments extends UseExperiments {
    children: ReactNode;
    // Если включен antiflicker, то приложение не будет отрисовано, пока не получит флаги экспериментов
    enableAntiflicker?: boolean;
    // По завершению таймаута приложение отрисуется без флагов
    antiflickerTimeout?: number;
}

export const MetricaExperimentsProvider: React.FC<ContextExperiments> = (props) => {
    const { children, enableAntiflicker, antiflickerTimeout = DEFAULT_ANTIFLICKER_TIMEOUT, ...params } = props;
    const [hidden, setHidden] = useState(enableAntiflicker);
    const data = useExperiments(params);

    useEffect(() => {
        if (!enableAntiflicker) {
            return;
        }

        if (data.ready) {
            setHidden(false);
            return;
        }

        const timer = setTimeout(() => setHidden(false), antiflickerTimeout);

        return () => clearTimeout(timer);
    }, [data]);

    if (hidden) {
        return null;
    }

    return (
        <MetricaExperimentsContext.Provider value={ data }>
            { children }
        </MetricaExperimentsContext.Provider>
    );
}

export const useExperimentsContext = <T extends Record<string, string>>() => useContext(MetricaExperimentsContext as Context<NamedReturnType<T>>);

export function useFlagContext<T extends Record<string, string>>(name: keyof T, takeFirst?: false): { ready: boolean, value: Array<string> };
export function useFlagContext<T extends Record<string, string>>(name: keyof T, takeFirst: true): { ready: boolean, value: string };
export function useFlagContext<T extends Record<string, string>>(name: keyof T, takeFirst = false) {
    const answer = useExperimentsContext<T>();
    const value = answer.flags[name] || [];

    return {
        value: takeFirst ? (value[0] || '') : value,
        ready: answer.ready,
    };
};
