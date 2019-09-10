module.exports = function() {
    return {
        plugins: [
            require('./babel-sugar-inject-h'),
            require('./babel-sugar-setup-functional')
        ]
    };
};
