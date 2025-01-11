import React from 'react';
import ReactDOM from 'react-dom';
import { useExperiments } from '../useExperiments';
import { ProviderApp, ProviderNoFlickerApp } from './provider';
import { clientId } from './clientId';
import { Flags } from './flags';
import { UseFlagComponent } from './useFlag';

// Кнопка будет перерисована после получения флагов. То есть мигнёт
const Button: React.FC = (props) => {
    const { flags } = useExperiments<typeof Flags>({
        clientId,
    });

    const flagVal = flags.flag_exp?.[0];

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

// Кнопка будет нарисована только после получения флагов.
const ButtonRenderAfterFlags: React.FC = (props) => {
    const { flags, ready } = useExperiments<typeof Flags>({
        clientId,
    });

    const flagVal = flags.flag_exp?.[0];

    if (!ready) {
        return null;
    }

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

const ButtonClassName: React.FC = (props) => {
    const { flags } = useExperiments<typeof Flags>({
        clientId,
    });

    const flagVal = flags.flag_exp?.[0];
    const className = flagVal ? 'button__experiment' : 'button';

    return <button className={ className } { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

ReactDOM.render(
    <div>
        <Button />
        <ButtonRenderAfterFlags />
        <ButtonClassName />
        <ProviderApp />
        <ProviderNoFlickerApp />
        <UseFlagComponent />
    </div>,
    document.getElementById('root'),
)
