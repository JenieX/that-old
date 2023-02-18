require('paint-console');
const { src, dest, watch, series } = require('gulp');
const { rollup } = require('rollup');
const prettier = require('prettier');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const htmlmin = require('gulp-html-minifier-terser');

const newFile = require('gulp-file');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const noop = require('gulp-noop');

const modifyContent = require('gulp-modifier');
const { prependText, prependFile } = require('gulp-append-prepend-no-trim');
const { stringify: stringifyMeta } = require('userscript-meta-f4w');

const fs = require('fs');
const del = require('del');
const path = require('path');

const buildConfig = require('./build.config.js');
const prettierConfig = require('./prettier.config.js');
const { metadata, metadataDev } = require('./meta.config.js');

const paths = {
  scss: 'src/scss/*.scss',
  css: ['dist/*.css' /* '!dist/*.min.css' */],
  html: 'src/html/*.html',
  js: ['src/index.js', 'src/**/*.js'],
};

const regex = {
  import: /^import(?: [{ ,\w\n/\-}]+ from)? '([^']+\.js)';/gm,
  include: /include: ([^'\n]+)/g,
};

const devScriptCode = `
GM.fetch('http://192.168.1.39:3905/js?repo=${metadata.name}&_=.js')
  .then((response) => response.text())
  // eslint-disable-next-line no-eval
  .then((responseText) => eval(responseText));
`;

const sourceComment = `/**
 * Source files are available at:
 * ${metadata.homepageURL}/tree/main/src
 */
`;

const cleanTasks = {
  css: function cssCleanTask() {
    return del(`dist/*.css`);
  },
  html: function htmlCleanTask() {
    return del(`dist/*.html`);
  },
  js: function jsCleanTask() {
    return del(`dist/${metadata.name}.user.js`);
  },
  all: function distCleanTask() {
    return del('dist');
  },
};

const metadataTasks = {
  user: function metadataTask() {
    return newFile(`${metadata.name}.meta.js`, '', { src: true })
      .pipe(modifyContent(() => stringifyMeta(metadata)))
      .pipe(dest('dist'));
  },
  dev: function metadataDevTask() {
    return newFile(`${metadata.name}.dev.js`, '', { src: true })
      .pipe(modifyContent(() => stringifyMeta(metadataDev)))
      .pipe(
        modifyContent((content) => {
          return content + devScriptCode;
        })
      )
      .pipe(dest('dist'));
  },
};

function cssTask() {
  const scssStream = src(paths.scss).pipe(sass()).pipe(dest('dist'));
  if (buildConfig.cssMinify) {
    return scssStream
      .pipe(postcss([cssnano()]))
      .pipe(
        rename((pathObject) => {
          return { ...pathObject, basename: `${pathObject.basename}.min` };
        })
      )
      .pipe(dest('dist'));
  }
  return scssStream;
}

function htmlTask() {
  return src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: !0, removeComments: !0 }))
    .pipe(dest('dist'));
}

async function jsTask() {
  const bundle = await rollup({ input: './src/index.js' });
  const {
    output: [{ code: script }],
  } = await bundle.generate({ format: 'es' });
  await bundle.close();

  return (
    newFile(`${metadata.name}.user.js`, script)
      /** `Include` replacements */
      .pipe(
        buildConfig.cssSupport || buildConfig.htmlMinify
          ? replace(regex.include, (match, fileName) => {
              return fs.readFileSync(path.resolve('./dist', fileName), 'utf8');
            })
          : noop()
      )

      /* Appending the source URL */
      .pipe(prependText(sourceComment))

      /** Inserting the user script metadata block */
      .pipe(prependFile(`dist/${metadata.name}.meta.js`))

      /** Applying `prettier.format` on the final code */
      .pipe(
        modifyContent((content) => {
          return prettier.format(content, {
            parser: 'babel',
            ...prettierConfig,
          });
        })
      )

      .pipe(dest('dist'))
  );
}

// eslint-disable-next-line no-unused-vars
function watchTask() {
  if (buildConfig.cssSupport) {
    watch(paths.scss, series(cleanTasks.css, cleanTasks.js, cssTask, jsTask));
  }

  if (buildConfig.htmlMinify) {
    watch(paths.html, series(cleanTasks.html, cleanTasks.js, htmlTask, jsTask));
  }

  watch(paths.js, series(cleanTasks.js, jsTask));
}

// eslint-disable-next-line no-unused-vars
function waitTask() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

const tasks = [
  cleanTasks.all,
  metadataTasks.user,
  metadataTasks.dev,
  buildConfig.cssSupport && cssTask,
  buildConfig.htmlMinify && htmlTask,
  jsTask,
].filter(Boolean);

exports.watch = series(...tasks, watchTask);

exports.build = series(...tasks);
exports.default = series(...tasks);
