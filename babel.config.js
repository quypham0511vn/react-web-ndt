module.exports =  (api) =>{
    api.cache(true);

    return{
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.ios.js', '.android.js', '.ts', '.tsx', '.json'],
                    alias: {
                        // '@': './src'
                    }
                }
            ],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    };
};
