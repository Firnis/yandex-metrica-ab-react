import React from 'react';
import { useExperimentsContext, MetricaExperimentsProvider, MetricaExperimentsContext, useFlagContext } from '../context';
import { clientId } from './clientId';
import { Flags } from './flags';
import { NamedReturnType } from '../types';

// Кнопка будет перерисована после получения флагов. То есть мигнёт
const Button: React.FC = props => {
    const { flags } = useExperimentsContext<typeof Flags>();
    const flagVal = flags.flag_exp?.[0];

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

// Кнопка будет нарисована только после получения флагов.
const OtherButton: React.FC = props => {
    const { flags, ready } = useExperimentsContext<typeof Flags>();
    const flagVal = flags.flag_exp?.[0];

    if (!ready) return null;

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

// Кнопка будет перерисована после получения флагов. То есть мигнёт
const ButtonUseFlag: React.FC = props => {
    const { value: [flagVal] } = useFlagContext<typeof Flags>('flag_exp');

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

// Кнопка будет нарисована только после получения флагов.
const ButtonUseFlagNoFlicker: React.FC = props => {
    const { ready, value: flagVal } = useFlagContext<typeof Flags>('flag_exp', true);

    if (!ready) {
        return null;
    }

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

class ClassButton extends React.Component {
    static contextType = MetricaExperimentsContext;
    declare context: React.ContextType<typeof MetricaExperimentsContext>

    render() {
        const { flags, ready } = this.context as NamedReturnType<typeof Flags>;

        if (!ready) return null;

        const flagVal = flags.flag_exp?.[0];
        return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...this.props }>{ String(flagVal || 'default').toUpperCase() }</button>;
    }
}

interface ConsumerButtonProps {
    color?: string;
}

const ConsumerButton: React.FC<ConsumerButtonProps> = props => {
    return <button style={{ backgroundColor: props.color }}>ConsumerButton</button>;
}

// Приложение перерисуется, когда получит флаги.
// Проблема мигания компонентов решается в самих компонентах проверкой ready === true
export const ProviderApp: React.FC = () => (
    <MetricaExperimentsProvider clientId={clientId}>
        <Button />
        <OtherButton />
        <ClassButton />
        <ButtonUseFlag />
        <ButtonUseFlagNoFlicker />
        <MetricaExperimentsContext.Consumer>
            {(answer: NamedReturnType<typeof Flags>) => <ConsumerButton color={answer.flags.MY_BUTTON_COLOR?.[0]} />}
        </MetricaExperimentsContext.Consumer>
    </MetricaExperimentsProvider>
);

// Приложение отрисуется только когда получит флаги.
// Проверять ready в компонентах не нужно
export const ProviderNoFlickerApp: React.FC = () => (
    <MetricaExperimentsProvider clientId={clientId} enableAntiflicker antiflickerTimeout={1000}>
        <Button />
        <OtherButton />
        <ClassButton />
        <ButtonUseFlag />
        <ButtonUseFlagNoFlicker />
        <MetricaExperimentsContext.Consumer>
            {(answer: NamedReturnType<typeof Flags>) => <ConsumerButton color={answer.flags.MY_BUTTON_COLOR?.[0]} />}
        </MetricaExperimentsContext.Consumer>
    </MetricaExperimentsProvider>
);
