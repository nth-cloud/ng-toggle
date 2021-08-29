const gulp = require('gulp');
const clangFormat = require('clang-format');
const gulpFormat = require('gulp-clang-format');
const ghPages = require('gh-pages');

gulp.task('changelog', () => {
  const conventionalChangelog = require('gulp-conventional-changelog');
  return gulp.src('CHANGELOG.md', {})
      .pipe(conventionalChangelog({preset: 'angular', releaseCount: 1}, {
        // Override release version to avoid `v` prefix for git comparison
        // See https://github.com/conventional-changelog/conventional-changelog-core/issues/10
        currentTag: require('./package.json').version
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('demo-push', (done) => {
  ghPages.publish('demo/dist', {message: 'Update ' + new Date().toISOString()}, done);
});
