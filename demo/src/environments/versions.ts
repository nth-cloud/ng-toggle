/* eslint-disable @typescript-eslint/no-var-requires */
let bootstrap: string = require('../../../package.json').devDependencies['bootstrap'];
// extracts only the minor version from package.json
// ex. "bootstrap": "4.0.1" -> "4.0"
bootstrap = bootstrap.split('.').slice(0, 2).join('.');

const ngToggle = require('../../../package.json').version;

export const versions: { [key: string]: string } = { bootstrap, ngToggle };
