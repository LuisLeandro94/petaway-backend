module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["prettier", "airbnb-base"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "arrow-body-style": "off",
  },
};
