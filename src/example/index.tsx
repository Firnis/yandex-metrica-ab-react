import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useExperiments } from '../useExperiments';
import { ProviderApp } from './provider';
import { clientId } from '../clientId';

const Button: React.FC = (props) => {
    const { flags } = useExperiments({
        clientId,
    });

    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

const ButtonRenderAfterFlags: React.FC = (props) => {
    const { flags, ready } = useExperiments({
        clientId,
    });

    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);

    if (!ready) {
        return null;
    }

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

const ButtonClassName: React.FC = (props) => {
    const { flags } = useExperiments({
        clientId,
    });

    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);
    const className = useMemo(() => flagVal ? 'button__experiment' : 'button', [flagVal]);

    return <button className={ className } { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

ReactDOM.render(
    <div>
        <Button />
        <ButtonRenderAfterFlags />
        <ButtonClassName />
        <ProviderApp />
    </div>,
    document.getElementById('root'),
)
