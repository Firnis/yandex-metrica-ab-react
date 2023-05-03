export const createSnippet = () => {
    if ('ymab' in window) {
        return;
    }

    (function (v: Window, a: Document, r: 'script', i: string, o: 'ymab', q?: HTMLScriptElement, u?: HTMLScriptElement, b?: Function) {
        v[o] = v[o] || function () { (v[o].a = v[o].a || []).push(arguments) };
        q = a.createElement(r); q.async = true; q.src = i; u = a.getElementsByTagName(r)[0]; u?.parentNode?.insertBefore(q, u),
        q.addEventListener('error', function () {
            v[o] = function () {
                b = arguments[arguments.length - 1];
                if (typeof b === 'function') {
                    b({ flags: {} });
                }
            };
        });
    }(window, document, 'script', 'https://abt.s3.yandex.net/expjs/latest/exp.js', 'ymab'));
};
