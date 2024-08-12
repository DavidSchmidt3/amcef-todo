module.exports = {
  extends: ["@extropysk/eslint-config-react"],
  ignorePatterns: ["*.config.*", ".eslintrc.cjs"],
  parserOptions: {
    project: "./tsconfig.app.json"
  }
};
