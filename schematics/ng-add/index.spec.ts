import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

import { getFileContent } from '../utils/get-file-contents';
import { createTestApp } from '../utils/testing';
import * as messages from './messages';

describe(`ng add '@nth-cloud/ng-toggle'`, () => {
	let runner: SchematicTestRunner;
	let appTree: Tree;

	beforeEach(async () => {
		runner = new SchematicTestRunner('schematics', require.resolve('../collection.json'));
		appTree = await createTestApp(runner);
	});

	it(`should add missing dependencies to 'package.json'`, async () => {
		const tree = await runner.runSchematic('ng-add', {}, appTree);
		const { dependencies } = JSON.parse(getFileContent(tree, '/package.json'));

		expect(dependencies['bootstrap']).withContext('bootstrap should be installed').toBeDefined();
	});

	it(`should report when specified 'project' is not found`, async () => {
		let message = '';
		try {
			await runner.runSchematic('ng-add', { project: 'test' }, appTree);
		} catch (e) {
			message = (e as Error).message;
		} finally {
			expect(message).toBe(messages.noProject('test'));
		}
	});
});
