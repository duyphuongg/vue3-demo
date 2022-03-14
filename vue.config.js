module.exports = {
  // options...
  chainWebpack: (config) => {
    // A, remove the plugin
    config.plugins.delete('prefetch');
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },
  // runtimeCompiler: false,
};
