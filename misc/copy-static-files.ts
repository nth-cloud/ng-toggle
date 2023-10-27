import { copyFileSync, copySync, readJsonSync, writeJSONSync } from 'fs-extra';

/**
 * Copies missing required static assets after the ng-mentions build
 */

const DEST = 'dist';
const SCHEMATICS = `${DEST}/schematics`;

// 1. Copy static assets
['LICENSE', 'README.md'].forEach((file) => copyFileSync(file, `${DEST}/${file}`));

// 2. Copy built schematics to 'dist/ng-bootstrap'
copySync('schematics/dist', SCHEMATICS);
copyFileSync('schematics/collection.json', `${SCHEMATICS}/collection.json`);
copyFileSync('schematics/ng-add/schema.json', `${SCHEMATICS}/ng-add/schema.json`);

// 3. Patch version in the 'dist/package.json' with the one from 'package.json'
const {
	name,
	version,
	description,
	keywords,
	author,
	repository,
	license,
	bugs,
	homepage,
	peerDependencies: dependencies,
} = readJsonSync(`package.json`, { encoding: 'utf-8' });
const packageJson = readJsonSync(`${DEST}/package.json`, { encoding: 'utf-8' });
packageJson.name = name;
packageJson.version = version;
packageJson.description = description;
packageJson.keywords = keywords;
packageJson.author = author;
packageJson.repository = repository;
packageJson.license = license;
packageJson.bugs = bugs;
packageJson.homepage = homepage;
packageJson.peerDependencies = dependencies;
writeJSONSync(`${DEST}/package.json`, packageJson, { spaces: 2, encoding: 'utf-8' });
