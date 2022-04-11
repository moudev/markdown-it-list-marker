export default {
  input: "index.js",
  output: [
    {
      file: "./dist/index.esm.js",
      format: "esm",
    },
    {
      file: "./dist/index.cjs.js",
      format: "cjs",
    },
  ],
}
