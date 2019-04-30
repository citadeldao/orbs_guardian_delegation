/**
 * configure request processing with $http component
 */
app.factory('$requestProvider', ['$q', '$injector', '$appVersion',
    function ($q, $injector, $appVersion) {
        var requestCount = 0;
        return {
            
            /**
             * function before request
             *
             * @param config
             * @returns {*}
             */
            request: function(config) {
                requestCount++;
                if (config.url.indexOf(".tpl.html") !== -1) {
                    config.params = config.params || {};
                    config.params.version = $appVersion;
                }
                return config;
            },
            
            /**
             * function after request
             *
             * @param response
             * @returns {*}
             */
            response: function (response) {
                requestCount--;
                var $rootScope = $injector.get('$rootScope');
                if (requestCount === 0) {
                    $rootScope.isLoading = false;
                }
                return response;
            },
            
            /**
             * if request faill
             *
             * @param rejection
             * @returns {void | Promise<any> | Promise<never>}
             */
            responseError: function (rejection) {
                var
                    $rootScope = $injector.get('$rootScope'),
                    $state = $injector.get('$state');
                
                requestCount--;
                
                if (requestCount === 0) {
                    $rootScope.isLoading = false;
                }
                
                return $q.reject(rejection);
            }
        };
    }
]);
