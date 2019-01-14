// tslint:disable:max-line-length
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as he from 'he';

const plnkrUrl = 'http://plnkr.co/edit/?p=preview';

const packageJson = JSON.parse(fs.readFileSync('package.json').toString());
const ngToggle = JSON.parse(fs.readFileSync('src/package.json').toString()).version;
const versions = getVersions();

function capitalize(string) {
  if (string.indexOf('-') !== -1) {
    string = String(string).split('-').map(str => capitalize(str)).join('');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ENTRY_CMPTS = {
  'toggle-basic': ['NthdToggleBasic'],
  'toggle-custom-label': ['NthdToggleCustomLabel'],
  'toggle-input': ['NthdToggleInput'],
  'toggle-kitchen-sink': ['NthdToggleKitchenSink']
};

function generatePlunkrContent(componentName, demoName) {
  const fileName = `${componentName}-${demoName}`;
  const basePath = `demo/src/app/components/${componentName}/demos/${demoName}/${fileName}`;

  const codeContent = fs.readFileSync(`${basePath}.ts`).toString();
  const markupContent = fs.readFileSync(`${basePath}.html`).toString();

  return `<!DOCTYPE html>
<html lang="en">
<body>
  <form id="mainForm" method="post" action="${plnkrUrl}">
    <input type="hidden" name="description" value="Example usage of the ${
      componentName} widget from https://nth-cloud.github.io/ng-toggle">
${generateTags([
    'Angular', 'Bootstrap', 'ng-toggle', capitalize(componentName)
  ])}
  
    <input type="hidden" name="files[.angular-cli.json]" value="${he.encode(getPlunkrTemplate('.angular-cli.json'))}">
    <input type="hidden" name="files[index.html]" value="${he.encode(generateIndexHtml())}">
    <input type="hidden" name="files[src/main.ts]" value="${he.encode(getPlunkrTemplate('main.ts'))}">
    <input type="hidden" name="files[src/polyfills.ts]" value="${he.encode(getPlunkrTemplate('polyfills.ts'))}">
    <input type="hidden" name="files[src/app.module.ts]" value="${
      he.encode(generateAppModuleTsContent(componentName, demoName, basePath + '.ts'))}">
    <input type="hidden" name="files[src/app.component.ts]" value="${
      he.encode(getPlunkrTemplate('app/app.component.ts'))}">
    <input type="hidden" name="files[src/app.component.html]" value="${
      he.encode(generateAppComponentHtmlContent(componentName, demoName))}">
    <input type="hidden" name="files[app/${fileName}.ts]" value="${he.encode(codeContent)}">
    <input type="hidden" name="files[app/${fileName}.html]" value="${he.encode(markupContent)}">
    
    <input type="hidden" name="dependencies" value="${he.encode(JSON.stringify(generateDependencies()))}">
  </form>
  <script>document.getElementById("mainForm").submit();</script>
</body>
</html>`;
}

function getPlunkrTemplate(path) {
  return fs.readFileSync(`misc/builder-templates/${path}`).toString();
}

function generateIndexHtml() {
  return `<!DOCTYPE html>
<html>

  <head>
    <title>ng-toggle demo</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/${
      versions.bootstrap}/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.css" />
  </head>

  <body>
    <my-app>loading...</my-app>
  </body>

</html>`;
}

function generateAppComponentHtmlContent(componentName, demoName) {
  const demoSelector = `nthd-${componentName}-${demoName}`;

  return `
<div class="container-fluid">

  <hr>

  <p>
    This is a demo example forked from the <strong>ng-bootstrap</strong> project: Angular powered Bootstrap.
    Visit <a href="https://nth-cloud.github.io/ng-toggle/" target="_blank">https://nth-cloud.github.io/ng-toggle</a> for more widgets and demos.
  </p>

  <hr>

  <${demoSelector}></${demoSelector}>
</div>
`;
}

function generateAppModuleTsContent(componentName, demoName, filePath) {
  const demoClassName = `Nthd${capitalize(componentName)}${capitalize(demoName)}`;
  const demoImport = `./${componentName}-${demoName}`;
  const entryCmptClasses = (ENTRY_CMPTS[`${componentName}-${demoName}`] || []).join(', ');
  const demoImports = entryCmptClasses ? `${demoClassName}, ${entryCmptClasses}` : demoClassName;
  const file = fs.readFileSync(filePath).toString();
  if (!file.includes(demoClassName)) {
    throw new Error(`Expecting demo class name in ${filePath} to be '${demoClassName}' (note the case)`);
  }

  return `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToggleModule } from '@nth-cloud/ng-toggle';
import { AppComponent } from './app.component';
import { ${demoImports} } from '${demoImport}';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, ToggleModule],
  declarations: [AppComponent, ${demoImports}]${entryCmptClasses ? `,\n  entryComponents: [${entryCmptClasses}],` : ','}
  bootstrap: [AppComponent]
})
export class AppModule {}
`;
}

function generateDependencies() {
  return {
    '@angular/core': versions.angular,
    '@angular/common': versions.angular,
    '@angular/compiler': versions.angular,
    '@angular/platform-browser': versions.angular,
    '@angular/platform-browser-dynamic': versions.angular,
    '@angular/router': versions.angular,
    '@angular/forms': versions.angular,
    '@nth-cloud/ng-toggle': versions.ngToggle,
    'core-js': versions.coreJs,
    'rxjs': versions.rxjs,
    'zone.js': versions.zoneJs,
  };
}

function generateTags(tags) {
  return tags.map((tag, idx) => `    <input type="hidden" name="tags[${idx}]" value="${tag}">`).join('\n');
}

function getVersions() {
  return {
    angular: getVersion('@angular/core'),
    typescript: getVersion('typescript'),
    rxjs: getVersion('rxjs'),
    ngToggle,
    zoneJs: getVersion('zone.js'),
    coreJs: getVersion('core-js'),
    reflectMetadata: getVersion(
        'reflect-metadata', JSON.parse(fs.readFileSync('node_modules/@angular/compiler-cli/package.json').toString())),
    bootstrap: getVersion('bootstrap')
  };
}

function getVersion(name, givenPackageJson?: {dependencies, devDependencies}) {
  if (!givenPackageJson) {
    givenPackageJson = packageJson;
  }

  const value = givenPackageJson.dependencies[name] || givenPackageJson.devDependencies[name];

  if (!value) {
    throw `couldn't find version for ${name} in package.json`;
  }

  return value;
}

function getDemoComponentNames(): string[] {
  const path = 'demo/src/app/components/*/';

  return glob.sync(path, {})
      .map(dir => dir.substr(0, dir.length - 1))
      .map(dirNoEndingSlash => dirNoEndingSlash.substr(dirNoEndingSlash.lastIndexOf('/') + 1))
      .sort();
}

function getDemoNames(componentName: string): string[] {
  const path = `demo/src/app/components/${componentName}/demos/*/`;

  return glob.sync(path, {})
      .map(dir => dir.substr(0, dir.length - 1))
      .map(dirNoEndingSlash => dirNoEndingSlash.substr(dirNoEndingSlash.lastIndexOf('/') + 1))
      .sort();
}

/**
 * Generates StackBlitzes for all demos of all components and puts
 * resulting html files to the public folder of the demo application
 */

const base = `demo/src/public/app/components`;

// removing folder
fs.ensureDirSync(base);
// fs.emptyDirSync(base);

// re-creating all stackblitzes
getDemoComponentNames().forEach(componentName => {
  getDemoNames(componentName).forEach(demoName => {
    const file = `${base}/${componentName}/demos/${demoName}/plnkr.html`;
    fs.ensureFileSync(file);
    fs.writeFileSync(file, generatePlunkrContent(componentName, demoName));
  });
});
