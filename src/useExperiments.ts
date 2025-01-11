import { useState, useEffect } from 'react';
import { Config, NamedReturnType, AnswerNamed, ExpjsAnswer } from './types';
import { createSnippet } from './createSnippet';

export interface UseExperiments {
    /**
     * Id of Varioqub client (metrika.XXXX)
     * Read documentation (https://yandex.com/support/varioqub/en/objects/ymab)
     */
    clientId: string;
    /**
     * Site user's ID.
     * "icookie" in the documentation (https://yandex.com/support/varioqub/en/objects/ymab)
     * Will be set and read by experimets code if not provided
     */
    param?: string;
    /**
     * expjs configuration
     * https://yandex.com/support/varioqub/en/objects/set-config
     */
    config?: Partial<Config>;
    /**
     * User parameters.
     * In the parameters, you can pass the properties of your site's users.
     * For example, you can pass the site authorization flag.
     * And configure experiment only for some group of users.
     * Read documentation (https://yandex.com/support/varioqub/en/objects/ymab)
     */
    clientFeatures?: Record<string, string>;
}

const useJsonStringify = (data: object = {}) => {
    try {
        return JSON.stringify(data);
    } catch (e) {
        console.error(e);
        return '{}';
    }
};

export const useExperiments = <T extends Record<string, string>>(params: UseExperiments) => {
    const { clientId, clientFeatures, config = {}, param: i  } = params;
    const [data, setData] = useState<NamedReturnType<T>>({ ready: false, flags: {} });
    const configKey = useJsonStringify(config);
    const featuresKey = useJsonStringify(clientFeatures);
    const href = window.location.href;

    useEffect(() => createSnippet(), []);

    useEffect(() => {
        const enableVisual = typeof config.enableVisual === 'undefined' || config.enableVisual;

        window.ymab({
            clientId,
            clientFeatures,
            config: {
                ...config,
                enableWatch: typeof config.enableWatch === 'undefined' ? enableVisual : config.enableWatch,
            },
            i,
            callback: (data: ExpjsAnswer) => setData({
                ...data,
                ready: true,
            } as AnswerNamed<T>),
        });
    }, [clientId, featuresKey, configKey, i, href]);

    return data;
}
