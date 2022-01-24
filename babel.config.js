const removeConsole = []
if (process.env.NODE_ENV === 'production') {
  removeConsole.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  },
  plugins: [...removeConsole]
}
