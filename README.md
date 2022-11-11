# yandex-metrica-ab-react

React библиотека для работы с AB экспериментами Метрики

### Hook
```
import { useExperiments } from 'yandex-metrica-ab-react';

const ButtonRenderAfterFlags: React.FC = (props) => {
    const { flags, ready } = useExperiments({
        clientId,
    });

    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);

    if (!ready) {
        return null;
    }

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
};

export const App: React.FC = () => (
    <ButtonRenderAfterFlags />
)
```

### Provider
```
import { MetricaExperimentsProvider, MetricaExperimentsContext } from 'yandex-metrica-ab-react';

interface ConsumerButtonProps {
    color?: string;
}

const ConsumerButton: React.FC<ConsumerButtonProps> = props => {
    return <button style={{ backgroundColor: props.color }}>ConsumerButton</button>;
}

export const App: React.FC = () => (
    <MetricaExperimentsProvider clientId={clientId}>
        <MetricaExperimentsContext.Consumer>
            {answer => <ConsumerButton color={answer.flags?.MY_BUTTON_COLOR?.[0]} />}
        </MetricaExperimentsContext.Consumer>
    </MetricaExperimentsProvider>
);
```


### Provider + hook
```
import { MetricaExperimentsProvider, MetricaExperimentsContext } from 'yandex-metrica-ab-react';

const OtherButton: React.FC = props => {
    const { flags, ready } = useExperimentsContext();
    const flagVal = useMemo(() => flags.flag_exp?.[0], [flags]);

    if (!ready) return null;

    return <button style={{ backgroundColor: flagVal || '#ccc' }} { ...props }>{ String(flagVal || 'default').toUpperCase() }</button>;
}

export const App: React.FC = () => (
    <MetricaExperimentsProvider clientId={clientId}>
        <OtherButton />
    </MetricaExperimentsProvider>
);
```

### ClassComponent
```
import { MetricaExperimentsProvider, MetricaExperimentsContext } from 'yandex-metrica-ab-react';

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

export const App: React.FC = () => (
    <MetricaExperimentsProvider clientId={clientId}>
        <ClassButton />
    </MetricaExperimentsProvider>
);
```

### SSR
```
С помощью yandex-metrica-ab-node получаем флаги и передаём их в MetricaExperimentsContext приложения.


// app.tsx
export const App: React.FC = () => (
    <MetricaExperimentsContext value={abMetricaAnswer.flags}>
        ...
    </MetricaExperimentsContext>
```

### Клиентские фичи
Словарь Key-Value с данными о посетителе.
Необходим для таргетирования экспериментов.

Пример
```
    <MetricaExperimentsProvider clientId={clientId} clientFeatures={{ lang: 'ru', sex: 'male' }}>
```
