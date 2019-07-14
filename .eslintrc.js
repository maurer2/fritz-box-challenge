module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
    "plugin:react/recommended",
  ],
  "plugins": [
    "react",
  ],
  "env": {
    "jest": true,
    "browser": true,
    "node": true,
  },
  "rules": {
    "react/jsx-uses-react": "error",
    "object-curly-newline": ["error", {
      "ObjectPattern": "never"
    }],
    "class-methods-use-this": ["error", {
      "exceptMethods": [
        "render"
      ]
    }]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
