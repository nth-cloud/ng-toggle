import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { readWorkspace } from '@schematics/angular/utility';
import { workspaces } from '@angular-devkit/core';

import { Schema } from './schema';
import * as messages from './messages';
import { createTestApp } from '../utils/testing';

['app', 'second-app'].forEach((projectName) => {
	describe(`ng-add-project-setup, 'project=${projectName}'`, () => {
		let runner: SchematicTestRunner;
		let log: string[] = [];

		async function createAppWithOptions(
			appOptions = {},
		): Promise<{ tree: UnitTestTree; project: workspaces.ProjectDefinition }> {
			// 'app' is the default application, so we're not passing '--project' option
			const options: Schema = { project: projectName };
			let tree = await createTestApp(runner, appOptions);
			tree = await runner.runSchematic('ng-add-setup-project', options, tree);
			const workspace = await readWorkspace(tree);
			const project = workspace.projects.get(projectName)!;
			return { tree, project };
		}

		beforeEach(() => {
			log = [];
			runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
			runner.logger.subscribe(({ message }) => log.push(message));
		});

		it(`should add 'bootstrap.min.css' to 'angular.json' by default`, async () => {
			const { project } = await createAppWithOptions();
			const targetOptions = project.targets.get('build')!.options!;

			expect(targetOptions.styles).toContain('node_modules/bootstrap/dist/css/bootstrap.min.css');
		});

		it(`should patch 'style.sass' when using SASS styles`, async () => {
			const { tree } = await createAppWithOptions({ style: 'sass' });

			const expectedStylesPath = `projects/${projectName}/src/styles.sass`;
			const stylesFile = tree.read(expectedStylesPath)!.toString();

			expect(stylesFile).toContain(`@import 'bootstrap/scss/bootstrap'`);
			expect(stylesFile).not.toContain(`@import 'bootstrap/scss/bootstrap;'`);
		});

		it(`should patch 'style.scss' when using SCSS styles`, async () => {
			const { tree } = await createAppWithOptions({ style: 'scss' });

			const expectedStylesPath = `projects/${projectName}/src/styles.scss`;
			const stylesFile = tree.read(expectedStylesPath)!.toString();

			expect(stylesFile).toContain(`@import 'bootstrap/scss/bootstrap';`);
		});

		it(`should add 'bootstrap.min.css' to 'angular.json' if style system is unsupported`, async () => {
			const { project } = await createAppWithOptions({ style: 'less' });
			const targetOptions = project.targets.get('build')!.options!;

			expect(targetOptions.styles).toContain('node_modules/bootstrap/dist/css/bootstrap.min.css');
			expect(log).toEqual([messages.unsupportedStyles(`projects/${projectName}/src/styles.less`)]);
		});
	});
});
