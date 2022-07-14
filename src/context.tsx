import React, { useState, useEffect, ReactNode, useContext } from 'react';
import { Answer, NoAnswer } from './types';

export const MetricaExperimentsContext = React.createContext<Answer | NoAnswer>({
    flags: {},
    ready: false,
});

interface UseExperiments {
    clientId: number | string;
    param?: string;
    children: ReactNode;
}

export const MetricaExperimentsProvider: React.FC<UseExperiments> = (props) => {
    const { clientId, param } = props;

    const [data, setData] = useState<Answer | NoAnswer>({ ready: false, flags: {} });

    useEffect(() => {
        window.ymab(clientId, "init", param, (data) => {
            setData({
                ...data,
                ready: true,
            });
        });
    }, [clientId, param]);

    return (
        <MetricaExperimentsContext.Provider value={{ ...data }}>
            { props.children }
        </MetricaExperimentsContext.Provider>
    );
}

export const useExperimentsContext = () => useContext(MetricaExperimentsContext);
