app.controller('HeaderController', ['$scope', '$rootScope', '$web3Service',
    function ($scope, $rootScope, $web3Service) {

        $scope.languages = [
            {
                name: 'En',
                img: '/img/flag/united-kingdom.png'
            },
            {
                name: 'Ch',
                img: '/img/flag/china.png'
            },
            {
                name: 'Ru',
                img: '/img/flag/russia.png'
            },
            {
                name: 'Sk',
                img: '/img/flag/south-korea.png'
            }
        ];
        $scope.selectedLanguages = $scope.languages[0];
        $scope.changeLanguage = function (language) {
            $scope.selectedLanguages = language;
        }

        $rootScope.$on('$viewContentLoaded', function (event, view) {

            if (!$web3Service.checkEnableWallet()) {
                $('#alarm').toggleClass('is-active');
            }
            if ($web3Service.checkEnableWallet()) {
                $web3Service.getAccounts().then(function (accounts) {
                    if (!accounts) {
                        $('#alarm').toggleClass('is-active');
                        $web3Service.enableAuth();
                    }
                });
            }
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 200) {
                    $('.header').addClass('header--fixed');
                } else {
                    $('.header').removeClass('header--fixed');
                }
            });
            if ($(window).scrollTop() > 200) {
                $('.header').addClass('header--fixed');
            } else {
                $('.header').removeClass('header--fixed');
            }
            $('.js-mob-menu-btn').on('click', function (e) {
                e.preventDefault();

                var menu = $('.header__menu');
                var siteContent = $('.site__content');

                menu.toggleClass('is-active');
                siteContent.toggleClass('blur');

            })
            $('.js-mob-menu-close-btn').on('click', function () {
                var menu = $('.header__menu');
                var siteContent = $('.site__content');

                menu.removeClass('is-active');
                siteContent.removeClass('blur');
            })
        });
    }
]);
