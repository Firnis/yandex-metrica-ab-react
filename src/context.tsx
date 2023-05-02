import React, { Context, ReactNode, useContext } from 'react';

import { ReturnType, NamedReturnType } from './types';
import { useExperiments, UseExperiments } from './useExperiments';

export const MetricaExperimentsContext = React.createContext<ReturnType>({
    flags: {},
    ready: false,
});

interface ContextExperiments extends UseExperiments {
    children: ReactNode;
}

export const MetricaExperimentsProvider: React.FC<ContextExperiments> = (props) => {
    const { children, ...params } = props;

    const data = useExperiments(params);

    return (
        <MetricaExperimentsContext.Provider value={{ ...data }}>
            { children }
        </MetricaExperimentsContext.Provider>
    );
}

export const useExperimentsContext = <T extends Record<string, string>>() => useContext(MetricaExperimentsContext as Context<NamedReturnType<T>>);
