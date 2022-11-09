export const createSnippet = () => {
    if ('ymab' in window) {
        return;
    }

    (function (e: Window, x: Document, pe: 'script', r: string, i: 'ymab', me?: HTMLScriptElement, nt?: HTMLScriptElement) {
        e[i] = e[i] || function () { (e[i].a = e[i].a || []).push(arguments) };
        me = x.createElement(pe); me.async = true; me.src = r; nt = x.getElementsByTagName(pe)[0]; nt?.parentNode?.insertBefore(me, nt);
    }(window, document, 'script', 'https://abt.s3.yandex.net/expjs/latest/exp.js', 'ymab'));
};
