module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@next/next/recommended", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "jsx-a11y", "import", "react-hooks"],
    rules: {
        "react/react-in-jsx-scope": "off",
    },
};