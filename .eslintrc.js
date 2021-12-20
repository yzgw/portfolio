module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "eqeqeq": ["error", "always"],
        "linebreak-style": [2, "unix"],
        "semi": [2, "always"],
        "no-undef": "off",
        "no-unused-vars": "off",
        "prefer-const": [
            "error",
            {
                "destructuring": "any",
                "ignoreReadBeforeAssign": false
            }
        ],
        "no-restricted-syntax": [
            "error",
            {
                "selector":"CallExpression[callee.name='useEffect'][arguments] > ArrayExpression[elements.length=0]",
                "message": "useComponentDidMountを使ってください"
            }
        ],
        "no-redeclare": "off", // TypeScriptでは不要
        "no-dupe-class-members": "off", // TypeScriptでは不要
        "react/prop-types": "off", // TypeScriptでは不要
        "no-restricted-imports": ["error",
            {
                "patterns": [
                    // 初期化処理が２度走ってしまうのを防ぐため
                    // main/parts/*からインポートしてください
                    // @see https://github.com/moicorp/mobcas/issues/17946
                    "**/main/main-entries"
                ]
            }
        ]
    },
};
