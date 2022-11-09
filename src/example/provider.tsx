import React, { useMemo } from 'react';
import { useExperimentsContext, MetricaExperimentsProvider, MetricaExperimentsContext } from '../context';
import { clientId } from './clientId';

const Button: React.FC = props => {
    const { flags } = useExperimentsContext();
    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

const OtherButton: React.FC = props => {
    const { flags, ready } = useExperimentsContext();
    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);

    if (!ready) return null;

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

class ClassButton extends React.Component {
    static contextType = MetricaExperimentsContext;
    declare context: React.ContextType<typeof MetricaExperimentsContext>

    render() {
        const { flags, ready } = this.context;

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

export const ProviderApp: React.FC = () => (
    <MetricaExperimentsProvider clientId={clientId}>
        <Button />
        <OtherButton />
        <ClassButton />
        <MetricaExperimentsContext.Consumer>
            {answer => <ConsumerButton color={answer.flags?.MY_BUTTON_COLOR?.[0]} />}
        </MetricaExperimentsContext.Consumer>
    </MetricaExperimentsProvider>
);
