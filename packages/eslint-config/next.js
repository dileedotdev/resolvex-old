module.exports = {
    extends: ['./base', 'next/core-web-vitals'],
    parserOptions: {
        babelOptions: {
            presets: [require.resolve('next/babel')],
        },
    },
};
