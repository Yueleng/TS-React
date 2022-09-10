import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // this filter is to filter out the file name to be processed.
      // `/.*/` represents for all kinds of files.
      // also namespace is used for filter as well
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        // return { path: args.path, namespace: "a" };

        // Naive Approach
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        // else if (args.path === "tiny-test-pkg") {
        //   return {
        //     path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js",2
        //     namespace: "a",
        //   };
        // }

        /**
         * Solve Relative Paths
         * path: "./utils", importer: "https://unpkg.com/medium-test-pkg"
         */

        if (
          args.path.includes("./") ||
          args.path.includes("../") /** means now it's a relative path */
        ) {
          return {
            namespace: "a",
            // path: new URL(args.path, args.importer + "/").href,
            // more general path:
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

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

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              // import message from 'tiny-test-pkg';
              // const message = require('medium-test-pkg');
              // const message = require('nested-test-pkg');
              const message = require('react-dom');
              console.log(message);
            `,
          };
        }

        // else {
        //   return {
        //     loader: "jsx",
        //     contents: 'export default "你好世界!"',
        //   };
        // }

        /**
         * request gives info whether the request is redirected to somewhere
         */
        const { data, request } = await axios.get(args.path);

        console.log(request);

        return {
          loader: "jsx",
          contents: data,
          // resovleDir: "nested-test-pkg@1.0.0/src"
          resolveDir: new URL("./", request.responseURL).pathname, // ship to onResolve as containing folder
        };
      });
    },
  };
};
