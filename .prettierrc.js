module.exports = {
    printWidth: 100,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    arrowParens: 'always',
    overrides: [
        {
            files: '*.md',
            options: {
                parser: 'markdown',
                printWidth: 120
            }
        }
    ]
};
