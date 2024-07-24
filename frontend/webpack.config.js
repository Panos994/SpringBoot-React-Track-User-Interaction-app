const path = require('path');

module.exports = {
    entry: './src/TrackPage.js', // Path to your React component
    output: {
        filename: 'tracking-component.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'TrackingComponent',
        libraryTarget: 'window',
        clean: true // Cleans the output directory before each build
    },
    mode: 'development', // Use 'production' for optimized builds
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'] // Add @babel/preset-env
                    }
                }
            },
            // Add CSS handling if needed
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // }
        ]
    },
    resolve: {
        extensions: ['.js'] // Resolve .js files
    },
    devtool: 'source-map' // Helps with debugging by generating source maps
};
