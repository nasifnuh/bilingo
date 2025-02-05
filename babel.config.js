module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@": "./src",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@context": "./src/context",
            "@layout": "./src/layout",
            "@navigation": "./src/navigation",
            "@redux": "./src/redux",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@translations": "./src/translations",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
