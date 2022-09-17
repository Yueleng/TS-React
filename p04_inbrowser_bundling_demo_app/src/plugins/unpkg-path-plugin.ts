import { OnResolveArgs, PluginBuild } from "esbuild-wasm";

/**
 * How to solve nested-test-pkg
 *
 * .
 * |__ nested-test-pkg/
 *     |__ src/
 *         |__ index.js
 *         |__ helpers/
 *             |__ utils.js
 */

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: PluginBuild) {
      // this filter is to filter out the file name to be processed.
      // `/.*/` represents for all kinds of files.
      // also namespace is used for filter as well
      build.onResolve({ filter: /^index\.js$/ }, (args: OnResolveArgs) => {
        console.log("onResolve", args);
        return { path: "index.js", namespace: "a" };
      });

      /**
       * Solve Relative Paths
       * path: "./utils", importer: "https://unpkg.com/medium-test-pkg"
       */
      build.onResolve({ filter: /^\.+\// }, (args: OnResolveArgs) => {
        console.log("onResolve", args);
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => {
        console.log("onResolve", args);
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
