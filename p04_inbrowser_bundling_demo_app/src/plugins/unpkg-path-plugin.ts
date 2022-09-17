import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "fileCache",
});

// (async () => {
//   await fileCache.setItem("color", "red");

//   const color = await fileCache.getItem("color");

//   console.log(color);
// })();

export const unpkgPathPlugin = (input: string) => {
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
            // contents: `
            //   // import message from 'tiny-test-pkg';
            //   // const message = require('medium-test-pkg');
            //   // const message = require('nested-test-pkg');
            //   const message = require('react-dom');
            //   console.log(message);
            // `,
            contents: input,
          };
        }

        // else {
        //   return {
        //     loader: "jsx",
        //     contents: 'export default "你好世界!"',
        //   };
        // }

        // Check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is, return it immediately.
        if (cachedResult) {
          return cachedResult;
        }

        /**
         * request gives info whether the request is redirected to somewhere
         */
        const { data, request } = await axios.get(args.path);

        console.log(request);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          // resovleDir: "nested-test-pkg@1.0.0/src"
          resolveDir: new URL("./", request.responseURL).pathname, // ship to onResolve as containing folder
        };

        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
