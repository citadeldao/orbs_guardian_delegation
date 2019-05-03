app.controller('HeaderController', ['$scope', '$rootScope',
    function ($scope, $rootScope) {

        $scope.languages = [
            {
                name: 'En',
                img: '/img/flag/united-kingdom.svg'
            },
            {
                name: 'Ch',
                img: '/img/flag/china.svg'
            },
            {
                name: 'Ru',
                img: '/img/flag/russia.svg'
            },
            {
                name: 'Sk',
                img: '/img/flag/south-korea.svg'
            }
        ];
        $scope.selectedLanguages = $scope.languages[0];
        $scope.changeLanguage = function (language) {
            $scope.selectedLanguages = language;
        }

        $rootScope.$on('$viewContentLoaded', function (event, view) {
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 20) {
                    $('.header').addClass('header--fixed');
                } else {
                    $('.header').removeClass('header--fixed');
                }
            });
            if ($(window).scrollTop() > 20) {
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
