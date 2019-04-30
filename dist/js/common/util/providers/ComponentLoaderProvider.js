/**
 * configure lazy load
 */
app.provider('$componentLoader', ['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        modules: []
    });

    return {

        $get: function () {
            return 'componentLoaderProvider'
        },

        web3: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                files: [
                    'https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js'
                ]
            });
        }],
        wowJs: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                files: [
                    '/node_modules/wowjs/dist/wow.min.js'
                ]
            });
        }],
        maskedInput: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                files: [
                    '/node_modules/jquery.maskedinput/src/jquery.maskedinput.js'
                ]
            });
        }]
    };

}]);
