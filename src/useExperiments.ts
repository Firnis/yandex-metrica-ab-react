import { useState, useEffect } from 'react';
import { Config, Answer, NoAnswer, ExpjsAnswer } from './types';
import { createSnippet } from './createSnippet';

export interface UseExperiments {
    clientId: string;
    param?: string;
    config?: Partial<Config>;
    clientFeatures?: Record<string, string>;
}

export const useExperiments = (params: UseExperiments) => {
    const { clientId, clientFeatures, config, param: i  } = params;
    const [data, setData] = useState<Answer | NoAnswer>({ ready: false, flags: {} });

    useEffect(() => createSnippet(), []);

    useEffect(() => {
        window.ymab({
            clientId,
            clientFeatures,
            config,
            i,
            callback: (data: ExpjsAnswer) => setData({
                ...data,
                ready: true,
            }),
        });
    }, [clientId, clientFeatures, config, i]);

    return data;
}
