import path from 'path';

const SASS_GLOBALS = [
    path.resolve(__dirname, '../node_modules/bootstrap/scss/_functions.scss'),
    path.resolve(__dirname, '../node_modules/bootstrap/scss/_variables.scss'),
    path.resolve(__dirname, '../node_modules/bootstrap/scss/mixins/_breakpoints.scss'),
    path.resolve(__dirname, '../src/styles/_variables.scss')
];

export default function getCssConfig(useModules = false, env = 'dev') {
    const withoutModules = {
        sourceMap: true,
        context: path.resolve(__dirname),
        minimize: env === 'prod'
    };
    const withModules = Object.assign({}, withoutModules, {
        importLoaders: env === 'dev' ? 1 : 0,
        localIdentName: env === 'dev' ? '[path]__[local]___[hash:base64:5]' : '[sha1:hash:hex:4]',
        modules: true
    });

    let options = [
        {
            loader: 'css-loader',
            options: useModules ? withModules : withoutModules
        }, {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer')
                ],
                sourceMap: true
            }
        }, {
            loader: 'sass-loader',
            options: {
                includePaths: [path.resolve(__dirname, 'src', 'scss')],
                sourceMap: true
            }
        }
    ];

    if (env === 'dev') {
        options.unshift('style-loader');
    }

    if (withModules) {
        options.push({
            loader: 'sass-resources-loader',
            options: {
                resources: SASS_GLOBALS
            }
        });
    }

    return options;
}
