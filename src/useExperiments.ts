import { useState, useEffect } from 'react';
import { Config, NamedReturnType, AnswerNamed, ExpjsAnswer } from './types';
import { createSnippet } from './createSnippet';

export interface UseExperiments {
    clientId: string;
    param?: string;
    config?: Partial<Config>;
    clientFeatures?: Record<string, string>;
}

export const useExperiments = <T extends Record<string, string>>(params: UseExperiments) => {
    const { clientId, clientFeatures, config, param: i  } = params;
    const [data, setData] = useState<NamedReturnType<T>>({ ready: false, flags: {} });

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
            } as AnswerNamed<T>),
        });
    }, [clientId, clientFeatures, config, i]);

    return data;
}
