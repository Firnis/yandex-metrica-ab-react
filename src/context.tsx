import React, { ReactNode, useContext } from 'react';
import { Answer, NoAnswer } from './types';
import { useExperiments, UseExperiments } from './useExperiments';

export const MetricaExperimentsContext = React.createContext<Answer | NoAnswer>({
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

export const useExperimentsContext = () => useContext(MetricaExperimentsContext);
