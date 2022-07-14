import { useState, useEffect } from 'react';
import { Answer, NoAnswer } from './types';

interface UseExperiments {
    clientId: number | string;
    param?: string;
}

export const useExperiments = (params: UseExperiments) => {
    const { clientId, param } = params;

    const [data, setData] = useState<Answer | NoAnswer>({ ready: false, flags: {} });

    useEffect(() => {
        window.ymab(clientId, "init", param, (data) => {
            setData({
                ...data,
                ready: true,
            });
        });
    }, [clientId, param]);

    return data;
}
