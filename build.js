import { build } from 'esbuild';

const buildOptions = {
    entryPoints: ['./browser/index.js'],
    outfile: './dist/index.js',
    bundle: true,
    globalName: 'bullshitGenerator',
    minify: true,
    sourcemap: true,
}

build(buildOptions);