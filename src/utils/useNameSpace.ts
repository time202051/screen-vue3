import { unref, computed } from 'vue';

const DEFAULT_NAMESPACE = 'sc';
const STATE_PREFIX = 'is-';

// 生成 BEM 类名
const generateBemClass = (
    namespace: string,
    block: string,
    blockSuffix = '',
    element = '',
    modifier = ''
) => {
    let cls = `${namespace}-${block}`;
    if (blockSuffix) cls += `-${blockSuffix}`;
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
};

// 生成 CSS 变量
const generateCssVars = (namespace: string, block: string, vars: Record<string, string>) => {
    return Object.entries(vars).reduce((styles, [key, value]) => {
        if (value) styles[`--${namespace}-${block}-${key}`] = value;
        return styles;
    }, {} as Record<string, string>);
};

export const useNameSpace = (block: string) => {
    const namespace = computed(() => DEFAULT_NAMESPACE);

    const b = (blockSuffix = '') => generateBemClass(unref(namespace), block, blockSuffix);
    const e = (element = '') => generateBemClass(unref(namespace), block, '', element);
    const m = (modifier = '') => generateBemClass(unref(namespace), block, '', '', modifier);
    const be = (blockSuffix = '', element = '') => generateBemClass(unref(namespace), block, blockSuffix, element);
    const em = (element = '', modifier = '') => generateBemClass(unref(namespace), block, '', element, modifier);
    const bm = (blockSuffix = '', modifier = '') => generateBemClass(unref(namespace), block, blockSuffix, '', modifier);
    const bem = (blockSuffix = '', element = '', modifier = '') =>
        generateBemClass(unref(namespace), block, blockSuffix, element, modifier);

    const is = (name: string, state = true) => (name && state ? `${STATE_PREFIX}${name}` : '');

    const cssVar = (vars: Record<string, string>) => generateCssVars(unref(namespace), block, vars);
    const cssVarName = (name: string) => `--${unref(namespace)}-${name}`;
    const cssVarBlockName = (name: string) => `--${unref(namespace)}-${block}-${name}`;

    return {
        namespace,
        b,
        e,
        m,
        be,
        em,
        bm,
        bem,
        is,
        cssVar,
        cssVarName,
        cssVarBlockName,
    };
};