export const createSnippet = () => {
    if ('ymab' in window) {
        return;
    }

    (function (e: Window, x: Document, pe: 'script', r: string, i: 'ymab', me?: HTMLScriptElement, n?: HTMLScriptElement, t?: Function) {
        e[i] = e[i] || function () { (e[i].a = e[i].a || []).push(arguments) };
        me = x.createElement(pe); me.async = true; me.src = r; n = x.getElementsByTagName(pe)[0]; n?.parentNode?.insertBefore(me, n),
        me.addEventListener('error', function () {
            e[i] = function () {
                t = arguments[arguments.length - 1];
                if (typeof t === 'function') {
                    t({ flags: {} });
                }
            };
        });
    }(window, document, 'script', 'https://abt.s3.yandex.net/expjs/latest/exp.js', 'ymab'));
};
