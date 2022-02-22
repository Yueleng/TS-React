import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onSubmit = () => {
    if (!ref.current) {
      return;
    }

    // const result = ref.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });

    const result = ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": '"production"',
        gloabl: "window",
      },
    });

    result.then((res: any) => {
      console.log(res);
      setCode(res.outputFiles[0].text);
    });
  };

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    ref.current = esbuild;
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea onChange={(e) => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

// result of transpiling `
//  const asyncFun = async (x) => {
//    await callApi(x);
//  }
// `
// var __async = (__this, __arguments, generator) => {
//   return new Promise((resolve, reject) => {
//     var fulfilled = (value) => {
//       try {
//         step(generator.next(value));
//       } catch (e) {
//         reject(e);
//       }
//     };
//     var rejected = (value) => {
//       try {
//         step(generator.throw(value));
//       } catch (e) {
//         reject(e);
//       }
//     };
//     var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
//     step((generator = generator.apply(__this, __arguments)).next());
//   });
// };
// const asyncFun = (x) => __async(this, null, function* () {
//   yield callApi();
// });
