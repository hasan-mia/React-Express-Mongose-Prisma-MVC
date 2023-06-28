module.exports = {
    "parser": '@typescript-eslint/parser',
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@javascript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "react",
        '@typescript-eslint'
    ],
    "rules": {
    }
}
