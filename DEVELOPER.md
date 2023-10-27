# Building and Testing ng-toggle

This document describes how to set up your development environment to build and test ng-toggle.
It also explains the basic mechanics of using `git`, `node` and `npm`.

- [Prerequisite Software](#prerequisite-software)
- [Getting the Sources](#getting-the-sources)
- [Installing Dependencies](#installing-dependencies)
- [Project Structure](#project-structure)
- [Useful Commands](#useful-commands)
- [Code Formatting](#code-formatting)

See the [contribution guidelines](https://github.com/nth-cloud/ng-toggle/blob/master/CONTRIBUTING.md)
if you'd like to contribute to ng-toggle.

## Prerequisite Software

Before you can build and test ng-toggle, you must install and configure the
following products on your development machine:

- [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.

- [Node.js](https://nodejs.org), (version `>=8.9.0`) which is used to run tests, and generate distributable files. Depending on your system, you can install Node either from
  source or as a pre-packaged bundle.

- We use [Npm](https://npmjs.com) (version `>=6.0.0`) to manage dependencies. Please, see installation instructions on their site.

- We use [Chrome](https://www.google.com/chrome/) to run our tests.

## Getting the Sources

Fork and clone the ng-toggle repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main ng-toggle
   repository](https://github.com/nth-cloud/ng-toggle).
3. Clone your fork of the ng-toggle's ng-toggle repository and define an `upstream` remote pointing back to
   the ng-toggle's ng-toggle repository that you forked in the first place.

```bash
# Clone your GitHub repository:
git clone git@github.com:<github username>/ng-toggle.git ng-toggle

# Go to the ng-toggle directory:
cd ng-toggle

# Add the main ng-toggle repository as an upstream remote to your repository:
git remote add upstream https://github.com/nth-cloud/ng-toggle.git
```

## Installing Dependencies

Next, install the JavaScript modules needed to build and test ng-toggle:

```bash
# Install ng-toggle project dependencies (package.json)
npm install
```

## Project Structure

We use [`@angular/cli`](https://cli.angular.io) to build both ng-toggle library and demo site. There are two main projects:

- `ng-toggle` - the ng-toggle library itself; sources are located in `src` folder
- `demo` - the demo site deployed at [https://nth-cloud.github.io/ng-toggle](https://nth-cloud.github.io/ng-toggle); sources are located in `demo/src` folder

## Useful Commands

The most useful commands are:

#### `npm run demo`

Serves the demo site locally in dev mode at [http://localhost:4200/](http://localhost:4200/). You can optionally add `--prod` argument to serve demo in production mode or `--aot` to serve demo in dev mode, but with AOT

#### `npm run build`

Builds both library and demo site in production mode. The library will be built in Angular Package format in `dist` folder. The demo site will be built in `demo/dist` folder.

#### `npm run tdd`

Runs unit tests for the library in watch mode without any additional checks

**Note**: If you want to only run a single test you can alter the test you wish to run by changing
`it` to `fit` or `describe` to `fdescribe`. This will only run that individual test and make it
much easier to debug. `xit` and `xdescribe` can also be useful to exclude a test and a group of
tests respectively.

#### `npm run test`

Checks formatting, linting and runs all tests for the library with coverage

#### `npm run ci`

Runs exactly the same suite of actions as the CI server, so you might want to do it before opening a PR

## Code Formatting

We use [Prettier](https://prettier.io) to automatically enforce code formatting for most of the files we have.
This allows us to focus on code reviews and features, and not on style nit-picking.

Prettier integrates easily in many modern IDEs, but on top of this your code should be formatted automatically with
[Husky](https://github.com/typicode/husky) and a pre-commit hook.

```bash

# we enforce formatting during CI with
npm run check-format

# you can also force format the code with
npm run format
```

## Commit messages

We use [CommitLint](https://commitlint.js.org/) to enforce commit messages and have a clean git history.
Commit format will be enforced with [Husky](https://github.com/typicode/husky) and a `commit-msg` hook.

Here is an example of the commit message that provides a title, an explanation and references a GitHub issue:

```
fix(tooltip): allow 'null' and 'undefined' as values for tooltip

The documentation says that falsy values are accepted,
but in strict mode, only the empty string could actually be passed.

Fixes #3845
```

We maintain dynamic custom scopes for the project. Valid scopes correspond to the name of our widgets: `alert`, `accordion`, etc.

More examples:

- `feat(datepicker): ...` &rarr; a new feature for the datepicker
- `fix(datepicker): ...` &rarr; a bug fix for the datepicker
- `test(datepicker): ... ` &rarr; an update to one of the datepicker unit or e2e tests
- `docs(datepicker): ...` &rarr; a datepicker documentation update
- `refactor(datepicker): ... ` &rarr; an internal datepicker refactoring without public functionality changes
- `demo(datepicker): ... ` &rarr; an update to one of the datepicker demos
- `demo: ...` &rarr; any change for the demo site
- `build: ...` &rarr; any change for the utility scripts, configurations, dependencies, etc.
- `ci: ...` &rarr; any change for CI related configuration
- `revert: ...` &rarr; revert an older commit

Anything else won't pass validation.
