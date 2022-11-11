module.exports = {
  devServer: {
    port: 3000,
  },
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
};
