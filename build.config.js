module.exports = {
  /**
   * If enabled, `scss` files located at `./src/scss` folder, will be
   * compiled to `css` files. These compiled `css` files will be saved
   * at `./dist` folder, and can be included in any of the `js` files later,
   * by their original names, but with `css` extensions.
   */
  cssSupport: false,

  /**
   * If enabled, the already compiled `css` files located at `./dist`, will
   * have minified versions next to them, and can be included in any of
   * the `js` files later, by their original names, plus `.min`, and
   * with `css` extensions. This option is ignored when `cssSupport`
   * is disabled.
   */
  cssMinify: true,

  /**
   * If enabled, `html` files located at `./src/html` folder, will be minified.
   * These minified `html` files will be saved at `./dist` folder, and can be
   * included in any of the `js` files later, by their original names.
   */
  htmlMinify: false,
};
