/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // TypeScript strict rules - prohibir 'any'
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Vue 3 specific rules
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-tags-order': ['error', {
      'order': ['script', 'template', 'style']
    }],
    'vue/define-macros-order': ['error', {
      'order': ['defineProps', 'defineEmits', 'defineExpose']
    }],
    'vue/no-unused-components': 'error',
    'vue/no-unused-vars': 'error',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'error',
    'vue/prefer-import-from-vue': 'error',

    // General rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all']
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // Reglas específicas para archivos .vue
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        // Reglas que requieren información de tipos (solo para archivos TS en src)
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error'
      }
    },
    {
      files: ['*.config.ts', '*.config.js', '*.config.cjs', 'vite.config.ts'],
      rules: {
        // Reglas más relajadas para archivos de configuración
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
}
