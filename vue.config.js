const webpack = require('webpack'); // Webpackをインポート

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // feature flag 設定
      }),
    ],
  },
};
