import globals from "globals";

export default [
    { languageOptions: { globals: globals.browser } },
    {
        rules: {
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            indent: ["error", 4],
            quotes: ["error", "double"],
            semi: ["error", "always"],
            "no-extra-semi": "off",
            "@typescript-eslint/no-extra-semi": "off",
            "eol-last": ["error", "always"],
            "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }]
        }
    }
];
