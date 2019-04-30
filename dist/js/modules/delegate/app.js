app = angular.module('app', [
  'ui.router',
  'oc.lazyLoad'
]).config([
    '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$locationProvider', '$httpProvider', '$componentLoaderProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider, $httpProvider, $componentLoaderProvider) {

      /**
       * configure system
       */
      $urlRouterProvider.otherwise("/404");
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');
      $httpProvider.interceptors.push('$requestProvider');

      /**
       * configure routing
       */
      $stateProvider.state('delegate', {
        url: "/",
        templateUrl: "/js/modules/delegate/tpl/delegate.tpl.html",
        controller: "DelegateController",
        resolve: {
          web3: $componentLoaderProvider.web3,
          wowJs: $componentLoaderProvider.wowJs,
          maskedInput: $componentLoaderProvider.maskedInput
        }
      });

      $stateProvider.state('about', {
        url: "/about",
        templateUrl: "/js/modules/delegate/tpl/about.tpl.html",
      });
    }
  ]
);

