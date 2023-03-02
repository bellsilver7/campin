const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set(
      "@my-monorepo/api",
      require("path").resolve(__dirname, "../api")
    );
  },
};
