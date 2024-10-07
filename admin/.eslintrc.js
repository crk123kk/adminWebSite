module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        // 'plugin:react/recommended',
        'plugin:vue/recommended',
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // 假设这个规则的名称是'component-name-multi-word'
        'vue/multi-word-component-names': 'off',
        'vue/html-self-closing': 'off',
        "vue/first-attribute-linebreak": 'off',
        "vue/attribute-hyphenation": 'off',
        "vue/no-v-html": 'off',
        'no-unused-vars': 'warn',
    },
};