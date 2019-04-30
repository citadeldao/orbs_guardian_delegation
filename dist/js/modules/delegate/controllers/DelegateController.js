app.controller('DelegateController', ['$scope', '$web3Service', '$delegateService', '$delegateOptions',
    function ($scope, $web3Service, $delegateService, $delegateOptions) {

        $scope.candidate = $delegateOptions.candidate;
        $scope.methods = [
            {
                id: 0,
                name: 'ORBS',
                pdf: '/pdf/Delegation-Instructions-with-transfer-of-0.07-ORBS.pdf'
            },
            {
                id: 1,
                name: 'Metamask',
                pdf: null
            },
            {
                id: 2,
                name: 'Mycrypt',
                pdf: '/pdf/Delegation-Instructions-with-MyCrypto-2.pdf'
            }
        ];
        $scope.selectedMethods = $scope.methods[1];
        $scope.changeMethod = function (method) {
            $scope.selectedMethods = method;
            $scope.methodsHideList = !$scope.methodsHideList;
        }
        $scope.delegate = function (candidate) {
            if ($scope.selectedMethods.id == 1) {
                if ($web3Service.checkEnableWallet()) {
                    $delegateService.delegate(candidate);
                }
                return;
            }
            $.magnificPopup.open({
                type: 'inline',
                items: {
                    src: $('#popup-delegate')
                },
                preloader: true,
                removalDelay: 100,
                closeMarkup: '<button title="%title%" type="button" class="popup__close mfp-close">' +
                    '<svg class="icon popup__close-icon">' +
                    '<use xlink:href="img/sprite/symbol/sprite.svg#close"></use>' +
                    '</svg></button>',
            });
        }

        angular.element(document).ready(function () {
            var wow = new WOW(
                {
                    offset: 50,
                    mobile: false,
                }
            );
            wow.init();

            function copyToClipboard(element) {
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($(element).val()).select();
                document.execCommand("copy");
                $temp.remove();
            }

            $('body').on('click', '.input-copy__btn', function () {
                var el = $(this).parent().find('input');
                copyToClipboard(el);
            });

            $("body").on("click", ".mfp-close", function() {
                $.magnificPopup.close()
            });
        });
    }
]);
