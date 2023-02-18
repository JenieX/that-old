const {
  name,
  version,
  description,
  author,
  license,
} = require('./package.json');

const metadata = {
  name,
  version,
  namespace: `https://github.com/${author}`,
  description,
  author,
  match: ['*://*/*'],
  grant: [
    // Next 5 functions are needed for the options library
    // 'GM.deleteValue',
    // 'GM.getValue',
    // 'GM.registerMenuCommand',
    // 'GM.setValue',
    // 'GM_addValueChangeListener',
    //
    // 'GM.addElement',
    // 'GM.addStyle',
    // 'GM.getResourceUrl',
    // 'GM.info',
    // 'GM.listValues',
    // 'GM.notification',
    // 'GM.openInTab',
    // 'GM.setClipboard',
  ],
  require: [
    `https://github.com/${author}/${name}/raw/main/lib/gm-fetch.js`,
    // `https://github.com/${author}/${name}/raw/main/lib/gm-webext-pref.js`,
  ],
  'run-at': 'document-start',
  noframes: '',
  compatible: ['edge Violentmonkey', 'chrome Violentmonkey'],
  // supportURL: `https://github.com/${author}/${name}/issues`,
  homepageURL: `https://github.com/${author}/${name}`,
  // updateURL: `https://github.com/${author}/${name}/raw/main/dist/${name}.meta.js`,
  // downloadURL: `https://github.com/${author}/${name}/raw/main/dist/${name}.user.js`,
  icon: 'https://www.google.com/s2/favicons?sz=64&domain=violentmonkey.github.io',
  license,
};

/**
 * GM.xmlHttpRequest function will always be added.
 * When removed, you may run into problems being that GM is undefined.
 */
metadata.grant.push('GM.xmlHttpRequest');

const metadataDev = { ...metadata };
metadataDev.name += ' [DEV]';
metadataDev.version = '0.0.0';

exports.metadata = metadata;
exports.metadataDev = metadataDev;
