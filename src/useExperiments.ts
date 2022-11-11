import { useState, useEffect } from 'react';
import { Answer, NoAnswer } from './types';

export interface UseExperiments {
    clientId: number | string;
    param?: string;
    clientFeatures?: Record<string, string>;
}

export const useExperiments = (params: UseExperiments) => {
    const { clientId, param, clientFeatures } = params;

    const [data, setData] = useState<Answer | NoAnswer>({ ready: false, flags: {} });

    useEffect(() => {
        window.ymab(clientId, "init", param, clientFeatures, (data) => {
            setData({
                ...data,
                ready: true,
            });
        });
    }, [clientId, param, clientFeatures]);

    return data;
}
