import React from 'react';
import { useFlag } from '../useFlag';
import { ProviderApp } from './provider';
import { clientId } from './clientId';
import { Flags } from './flags';

// Кнопка будет перерисована после получения флагов. То есть мигнёт
const Button: React.FC = (props) => {
    const { value: flag_exp } = useFlag<typeof Flags>('flag_exp', {
        clientId,
    });

    const flagVal = flag_exp?.[0];

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

// Кнопка будет нарисована только после получения флагов.
const ButtonRenderAfterFlags: React.FC = (props) => {
    const { value: [flagVal], ready } = useFlag<typeof Flags>('flag_exp', {
        clientId,
    });

    if (!ready) {
        return null;
    }

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

const ButtonClassName: React.FC = (props) => {
    const { value: flagVal } = useFlag<typeof Flags>('flag_exp', {
        clientId,
    }, true);

    const className = flagVal ? 'button__experiment' : 'button';

    return <button className={ className } { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

export const UseFlagComponent = () => (
    <div>
        <Button />
        <ButtonRenderAfterFlags />
        <ButtonClassName />
        <ProviderApp />
    </div>
);
