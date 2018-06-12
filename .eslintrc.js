module.exports = {
  "parser": "babel-eslint",
  "env": {
    "node" : true,
    "browser": true
  },
  "plugins": [
    "react"
  ],
  "extends": [
    "google",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "no-console": 1,
    "no-unexpected-multiline": 2,
    "semi": [2, "always"],
    "no-var": "error",
    "max-len": ["error", {
      "code": 120,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreComments": true,
      "ignoreTrailingComments": true,
      "ignoreTemplateLiterals": true,
      "ignoreRegExpLiterals": true
    }
    ],
    "prefer-const": "error",
    "no-duplicate-imports": [
      "error", {
        "includeExports": true
      }
    ],
    "object-curly-spacing": ["error",
      "always", {
        "objectsInObjects": false
      }
    ],
    "no-unused-vars": "error",
    "camelcase": [ "error", {
      "properties": "always"
    }
    ],
    "no-multi-spaces": 2,
  },
  "globals": {
    "Promise": false
  }
};
