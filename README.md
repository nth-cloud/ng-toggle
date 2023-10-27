# NG-TOGGLE

### Native Angular components & directives for Bootstrap-styled Toggle Switch

[![CodeQL](https://github.com/nth-cloud/ng-toggle/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/nth-cloud/ng-toggle/actions/workflows/codeql-analysis.yml)
[![npm version](https://badge.fury.io/js/%40nth-cloud%2Fng-toggle.svg)](https://badge.fury.io/js/%40nth-cloud%2Fng-toggle)
[![Test Coverage](https://github.com/nth-cloud/ng-toggle/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/nth-cloud/ng-toggle/actions/workflows/ci-tests.yml)
[![codecov](https://codecov.io/gh/nth-cloud/ng-toggle/branch/master/graph/badge.svg)](https://codecov.io/gh/nth-cloud/ng-toggle)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/ng-toggle.svg)](https://saucelabs.com/u/ng-toggle)

Angular Toggle component using [Bootstrap CSS](https://www.getbootstrap.com) that can be used as a standalone toggle or can convert checkboxes into UI toggles.

Please check our [demo site](https://nth-cloud.github.io/ng-toggle) and the list of
[issues](https://github.com/nth-cloud/ng-toggle/issues) to see all the things we are working on. Feel free to make comments there.

## Table of Contents

- [Demo](#demo)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Supported browsers](#supported-browsers)
- [Getting help](#getting-help)
- [Do you think you've found a bug?](#do-you-think-youve-found-a-bug)
- [Contributing to the project](#contributing-to-the-project)
- [Code of conduct](#code-of-conduct)
-

## Demo

View it in action at https://nth-cloud.github.io/ng-toggle

## Dependencies

- [Angular](https://angular.io) (tested with 15.2.10)
- [Bootstrap](https://www.getbootstrap.com) CSS (tested with 5.3.2)
  The supported versions are:

| ng-toggle | Angular | Bootstrap CSS |   Active Support   |
| --------- | ------- | ------------- | :----------------: |
| 6.x.x     | 10.0.0  | 4.0.0         |        :x:         |
| 7.x.x     | 11.0.0  | 4.0.0         |        :x:         |
| 8.x.x     | 12.0.0  | 4.0.0         |        :x:         |
| 9.x.x     | 13.0.0  | 4.0.0         |        :x:         |
| 10.x.x    | 14.0.0  | 4.0.0         | :white_check_mark: |
| 11.x.x    | 15.0.0  | 5.0.0         | :white_check_mark: |

## Installation

We strongly recommend using [Angular CLI](https://cli.angular.io) for setting up a new project. If you have an Angular CLI
project, you could simply use our schematics to add ng-toggle library to it.

Just run the following:

```shell
ng add @nth-cloud/ng-toggle
```

It will install ng-toggle for the default application specified in your `angular.json`.
If you have multiple projects and you want to target a specific application, you could specify the `--project` option:

```shell
ng add @nth-cloud/ng-toggle --project myProject
```

## Manual Installation

If you wish to install `ng-toggle` manually, be sure to install Bootstrap v4+, then run:

```shell
npm install --save @nth-cloud/ng-toggle
```

If you prefer not to use schematics and install everything manually, please refer to the
[manual installation instructions](https://nth-cloud.github.io/ng-toggle/#/getting-started#installation) on our website.

## Supported browsers

We support the same browsers and versions supported by both Bootstrap 4 and Angular, whichever is _more_ restrictive.
See [Angular Browser Support](https://github.com/angular/angular/blob/master/README.md) and [Bootstrap browser support](https://getbootstrap.com/docs/5.3/getting-started/browsers-devices/) for more details.

Our code is automatically tested on all supported browsers.

## Getting help

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/ng-toggle) where maintainers are looking at questions tagged with `ng-toggle`.

StackOverflow is a much better place to ask questions since:

- there are hundreds of people willing to help on StackOverflow
- questions and answers stay available for public viewing so your question/answer might help someone else
- Stack Overflow's voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.

## Do you think you've found a bug?

We want to fix it ASAP! But before fixing a bug we need to reproduce and confirm it.

We ask you to respect two things:

- fill the GitHub issue template by providing the bug description and appropriate versions of Angular, ng-toggle and TypeScript
- provide a use-case that fails with a **minimal reproduction scenario** using [StackBlitz](https://stackblitz.com) (you can start by forking one from our [demo page](https://nth-cloud.github.io/ng-toggle/#/docs/examples))

A minimal reproduction scenario allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

Please note that **we will be insisting on a minimal reproduction scenario** in order to save maintainers time and ultimately be able to fix more bugs. We'll mark the issue as non-actionable without it and close if not heard from the reporter.

Interestingly, from our experience users often find coding problems themselves while preparing a minimal StackBlitz. We understand that sometimes it might be hard to extract essential bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

## Contributing to the project

Please check [DEVELOPER.md](DEVELOPER.md) for documentation on running the project locally and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Code of conduct

Please take a moment and read our [Code of Conduct](CODE_OF_CONDUCT.md)

### Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)
