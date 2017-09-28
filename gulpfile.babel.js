'use strict';

import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import serve from 'gulp-serve';
import gulp_util from 'gulp-util';
import watchify from 'watchify';
import tsify from 'tsify';

import gutil from 'gulp-util';
import path from 'path';
import minimist from 'minimist';

const tsCompileOptions = {
    target: 'es5',
    moduleResolution: 'node',
    emitDecoratorMetadata: true,
    experimentalDecorators: true,

    module: 'commonjs',
    lib: ['es6', 'dom'],
    // types: ['reflect-metadata', 'node']
};

let params = minimist(process.argv.slice(2)),
    minify = params.min,
    build = params.build || "default",
    entryPath = `./src/entrypoints/${build}/entry.ts`,
    bundleName = 'bundle.' + build + (minify ? '.min' : '') + '.js';

let getBrowserify = entryFilePath => {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [entryFilePath],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify, tsCompileOptions)
    .require(entryFilePath, {expose: 'Landy'})
};

let bundle = doBrowserify => {
    doBrowserify.bundle()
        .pipe(source(bundleName))
        .pipe(buffer())
        .pipe(minify ? uglify() : gutil.noop())
        .pipe(gulp.dest('dist'));
};

gulp.task('build', () => {
    bundle(getBrowserify(entryPath));
});

gulp.task('build_all', () => {
    gulp.src('src/entrypoints/*/entry.ts', {read: false})
        .pipe(gutil.buffer()).on('data', files => {
        files.forEach(file => {
            let dir = path.parse(file.path).dir.split(path.sep);
            build = dir[dir.length - 1];
            entryPath = file.path;
            bundleName = 'bundle.' + build + (minify ? '.min' : '') + '.js';
            gutil.log(`Build for client "${build}". Entry: ${file.path}`);
            let doBrowserify = getBrowserify(entryPath);
            bundle(doBrowserify);
        });
    });
});

gulp.task('serve', serve({
    root: ['dist', 'test'],
    port: 80
}));

gulp.task('watch', ['serve'], () => {
    let doBrowserify = getBrowserify(entryPath);
    let watchedBrowserify = watchify(doBrowserify);
    bundle(doBrowserify);
    watchedBrowserify.on("update", () => bundle(doBrowserify));
    watchedBrowserify.on("log", gulp_util.log);
});