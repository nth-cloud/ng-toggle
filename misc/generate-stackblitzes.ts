// tslint:disable:max-line-length
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import * as path from 'path';

import { parseDemos } from './parse-demo';

const stackblitzUrl = 'https://stackblitz.com/run';
const packageJson = fs.readJsonSync('package.json');

const versions = {
	ngToggle: packageJson.version,
	angular: getVersion('@angular/core'),
	typescript: getVersion('typescript'),
	rxjs: getVersion('rxjs'),
	zoneJs: getVersion('zone.js'),
	bootstrap: getVersion('bootstrap'),
	prismjs: getVersion('prismjs'),
};

function capitalize(string) {
	if (string.indexOf('-') !== -1) {
		string = String(string)
			.split('-')
			.map((str) => capitalize(str))
			.join('');
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function fileContent(...paths: string[]) {
	return fs.readFileSync(path.join(...paths)).toString();
}

function getVersion(name) {
	const value =
		(packageJson.dependencies || {})[name] ||
		(packageJson.devDependencies || {})[name] ||
		(packageJson.peerDependencies || {})[name];
	if (!value) {
		throw new Error(`couldn't find version for ${name} in package.json`);
	}

	return value;
}

const indexFile = ejs.compile(fileContent('misc', 'stackblitz-templates', 'index.html.ejs'));
const mainFile = ejs.compile(fileContent('misc', 'stackblitz-templates', 'main.ts.ejs'));
const stackblitzFile = ejs.compile(fileContent('misc', 'stackblitz-templates', 'stackblitz.html.ejs'));

const base = path.join('demo', 'src', 'public', 'stackblitzes');
const root = path.join('demo', 'src', 'app', 'components');

const initialData = {
	stackblitzUrl,
	versions,
	dependencies: JSON.stringify({
		'@angular/animations': versions.angular,
		'@angular/core': versions.angular,
		'@angular/common': versions.angular,
		'@angular/compiler': versions.angular,
		'@angular/compiler-cli': versions.angular,
		'@angular/platform-browser': versions.angular,
		'@angular/platform-browser-dynamic': versions.angular,
		'@angular/router': versions.angular,
		'@angular/forms': versions.angular,
		'@angular/localize': versions.angular,
		'@nth-cloud/ng-toggle': versions.ngToggle,
		rxjs: versions.rxjs,
		typescript: versions.typescript,
		'zone.js': versions.zoneJs,
	}),
	tags: ['angular', 'mentions', 'ng-toggle', 'nth-cloud'],
	files: [
		{ name: 'src/polyfills.ts', source: fileContent('misc', 'stackblitz-templates', 'polyfills.ts') },
		{ name: 'tsconfig.json', source: fileContent('misc', 'stackblitz-templates', 'tsconfig.json') },
		{ name: 'angular.json', source: fileContent('misc', 'stackblitz-templates', 'angular.json') },
	],
};

// clear directories
fs.ensureDirSync(base);
fs.ensureDirSync(root);

// getting demo modules metadata
const demosMetadata = parseDemos(root);
for (const { componentName, demoName, fileName, files, className, selector } of demosMetadata) {
	const destinationFolder = path.join(base, componentName, demoName);

	const stackblitzData = {
		...initialData,
		fileName: `./app/${fileName}`,
		tsImportName: `./app/${fileName.substring(0, fileName.lastIndexOf('.'))}`,
		componentName,
		demoName,
		className,
		selector,
		title: `ng-toggle - ${capitalize(componentName)} - ${capitalize(demoName)}`,
		tags: [...initialData.tags],
		files: [...initialData.files],
		styles: '',
		openFile: `app/${fileName}`,
	};

	stackblitzData.tags.push(componentName);

	stackblitzData.files.push({ name: 'src/index.html', source: indexFile(stackblitzData) });
	stackblitzData.files.push({ name: 'src/main.ts', source: mainFile(stackblitzData) });
	for (const file of files) {
		const destFile = path.basename(file);
		stackblitzData.files.push({ name: `src/app/${destFile}`, source: fs.readFileSync(file).toString() });
	}

	fs.ensureDirSync(destinationFolder);
	fs.writeFileSync(path.join(destinationFolder, 'stackblitz.html'), stackblitzFile(stackblitzData));
}

console.log(`generated ${demosMetadata.length} stackblitz(es) from demo sources.`);
