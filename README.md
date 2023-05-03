# yandex-metrica-ab-react

React библиотека для работы с AB экспериментами Метрики

### Лэндинг сервиса
https://varioqub.ru/

### Документация
https://yandex.com/support/varioqub/index.html

## Инструкция:
### [Hook](src/example/index.tsx)

### [Provider](src/example/provider.tsx)
#### Antiflicker
Для провайдера можно настроить режим работы без мигания.
`enableAntiflicker` - включает режим. По умолчанию = false
`antiflickerTimeout` - задает задержку. По умолчанию 4000 (подсмотрено в optimize). Обычно задержка на получения флагов 50-200мс, но при медленном интернете доходит до секунд.
В этом режиме дети MetricaExperimentsProvider не будут отрисованы до тех пор, пока приложение не поличит флаги экспериментов, поэтому в компонентах не нужно проверять ready === true.

### [ClassComponent](src/example/index.tsx)

### SSR
С помощью yandex-metrica-ab-node получаем флаги и передаём их в MetricaExperimentsContext приложения.
```app.tsx
export const App: React.FC = () => (
    <MetricaExperimentsContext.Provider value={{ ...YANDEX_METRICA_AB_NODE_DATA, ready: true }}>
        ...
    </MetricaExperimentsContext.Provider>
```

### Клиентские фичи
Словарь Key-Value с данными о посетителе.
Необходим для таргетирования экспериментов.

Пример
```
    <MetricaExperimentsProvider clientId={clientId} clientFeatures={{ lang: 'ru', sex: 'male' }}>
```

### Указание доступных имён флагов для TS
Для удобства использования флагов можно задать список доступных имён.
```flags.ts
// Описание флага может быть произвольной строкой. Оно нужно только для вас.
export enum AvailableFlags {
    Flag0 = 'My first flag',
    HeaderRedButtons = 'Красные кнопки в хедере',
}
```
```header.tsx
...
    const { flags } = useExperiments<typeof AvailableFlags>({ clientId });

    const headerRebButtons = flags.HeaderRedButtons?.[0];
...
```
или
```header.tsx
...
    const { flags } = useExperimentsContext<typeof AvailableFlags>();

    const headerRebButtons = flags.HeaderRedButtons?.[0];
...
```

### Возвращаемый тип
Функции useExperiments и useExperimentsContext возвращают объект
```
interface Answer {
    // Набор флагов экспериментов, в которые попал пользователь
    // Значение - массив, так как пользователь может попасть в несколько экспериментов с одним флагом
    // Что делать в компоненте в таком случае - решать разработчику конечного сервиса
    flags: Record<string, string[] | undefined>;

    // Значение пользовательской куки, по которой система идентифицирует пользователя в varioqub (с ней ничего делать не нужно)
    i?: string;

    // Строка, идентифицирующая набор экспериментов, в которые попал пользователь (с ней ничего делать не нужно)
    experiments?: string;

    // Флаг готовности:
    // false - ещё не известно в какие эксперименты попал пользователь
    // true - набор экспериментов и его флаги получены
    ready: boolean;
}
```
