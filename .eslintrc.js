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
    "jest": true
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
};
