import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  //确保自定义规则配置在插件规则集之后，否则会被插件默认值覆盖。
  {
    rules: {
      // 关闭props解构警告（Vue3 setup语法）
      'vue/no-setup-props-destructure': 'off',
      // 允许未使用的带下划线的变量
      'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
      // 关闭组件名必须多单词的警告
      'vue/multi-word-component-names': 'off',
      // 其他常用规则（示例）
      'vue/require-default-prop': 'off', // 关闭props必须默认值
      'vue/attribute-hyphenation': 'off', // 关闭属性名短横线强制规则
    },
  },
  skipFormatting,
]
