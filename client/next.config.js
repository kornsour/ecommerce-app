module.exports = {
    webpackDevMiddleware: config => {
        // Pulls changes every 300ms for client service
        // Helps with file change detection in Docker
        config.watchOptions.poll = 300;
        return config;
    }
};