app=angular.module("app",["ui.router","oc.lazyLoad"]).config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","$locationProvider","$httpProvider","$componentLoaderProvider",function(e,t,n,a,o,i){t.otherwise("/404"),a.html5Mode(!0),a.hashPrefix("!"),o.interceptors.push("$requestProvider"),e.state("delegate",{url:"/",templateUrl:"/js/modules/delegate/tpl/delegate.tpl.html",controller:"DelegateController",resolve:{web3:i.web3,wowJs:i.wowJs,maskedInput:i.maskedInput}}),e.state("about",{url:"/about",templateUrl:"/js/modules/delegate/tpl/about.tpl.html"})}]),app.constant("$delegateContract",{address:"0x30f855afb78758Aa4C2dc706fb0fA3A98c865d2d",abi:[{constant:!0,inputs:[{name:"delegator",type:"address"}],name:"getCurrentDelegation",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"to",type:"address"}],name:"delegate",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[],name:"undelegate",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"guardian",type:"address"}],name:"getCurrentVote",outputs:[{name:"validators",type:"address[]"},{name:"blockNumber",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"maxVoteOutCount",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"guardian",type:"address"}],name:"getCurrentVoteBytes20",outputs:[{name:"validatorsBytes20",type:"bytes20[]"},{name:"blockNumber",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"validators",type:"address[]"}],name:"voteOut",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"VERSION",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{inputs:[{name:"maxVoteOutCount_",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"voter",type:"address"},{indexed:!1,name:"validators",type:"address[]"},{indexed:!1,name:"voteCounter",type:"uint256"}],name:"VoteOut",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"delegator",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"delegationCounter",type:"uint256"}],name:"Delegate",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"delegator",type:"address"},{indexed:!1,name:"delegationCounter",type:"uint256"}],name:"Undelegate",type:"event"}]}),app.controller("DelegateController",["$scope","$web3Service","$delegateService","$delegateOptions",function(t,n,a,e){t.candidate=e.candidate,t.methods=[{id:0,name:"ORBS",pdf:"/pdf/Delegation-Instructions-with-transfer-of-0.07-ORBS.pdf"},{id:1,name:"Metamask",pdf:null},{id:2,name:"Mycrypt",pdf:"/pdf/Delegation-Instructions-with-MyCrypto-2.pdf"}],t.selectedMethods=t.methods[1],t.changeMethod=function(e){t.selectedMethods=e,t.methodsHideList=!t.methodsHideList},t.delegate=function(e){if(1==t.selectedMethods.id)return $("#alarm").addClass("is-active"),void(n.checkEnableWallet()&&n.enableAuth().then(function(){$("#alarm").removeClass("is-active"),a.delegate(e)}));$.magnificPopup.open({type:"inline",items:{src:$("#popup-delegate")},preloader:!0,removalDelay:100,closeMarkup:'<button title="%title%" type="button" class="popup__close mfp-close"><svg class="icon popup__close-icon"><use xlink:href="img/sprite/symbol/sprite.svg#close"></use></svg></button>'})},angular.element(document).ready(function(){new WOW({offset:50,mobile:!1}).init(),$("body").on("click",".input-copy__btn",function(){var e,t,n=$(this).parent().find("input");e=n,t=$("<input>"),$("body").append(t),t.val($(e).val()).select(),document.execCommand("copy"),t.remove()}),$("body").on("click",".mfp-close",function(){$.magnificPopup.close()})})}]),app.controller("HeaderController",["$scope","$rootScope",function(t,e){t.languages=[{name:"En",img:"/img/flag/united-kingdom.svg"},{name:"Ch",img:"/img/flag/china.svg"},{name:"Ru",img:"/img/flag/russia.svg"},{name:"Sk",img:"/img/flag/south-korea.svg"}],t.selectedLanguages=t.languages[0],t.changeLanguage=function(e){t.selectedLanguages=e},e.$on("$viewContentLoaded",function(e,t){$(window).on("scroll",function(){20<$(window).scrollTop()?$(".header").addClass("header--fixed"):$(".header").removeClass("header--fixed")}),20<$(window).scrollTop()?$(".header").addClass("header--fixed"):$(".header").removeClass("header--fixed"),$(".js-mob-menu-btn").on("click",function(e){e.preventDefault();var t=$(".header__menu"),n=$(".site__content");t.toggleClass("is-active"),n.toggleClass("blur")}),$(".js-mob-menu-close-btn").on("click",function(){var e=$(".header__menu"),t=$(".site__content");e.removeClass("is-active"),t.removeClass("blur")})})}]),app.directive("convertToNumber",function(){return{require:"ngModel",link:function(e,t,n,a){a.$parsers.push(function(e){return null!=e?parseInt(e,10):null}),a.$formatters.push(function(e){return null!=e?""+e:null})}}}),app.factory("$delegateService",["$web3Service","$delegateContract","$q",function(a,o,e){return{delegate:function(n){return e(function(t,e){a.getAccounts().then(function(e){web3.eth.contract(o.abi).at(o.address).delegate(n).send({from:e}),t()})})}}}]),app.factory("$web3Service",["$q",function(e){return{checkEnableWallet:function(){return!!window.ethereum},enableAuth:function(){return window.ethereum.enable()},getAccounts:function(){return e(function(n,e){web3.eth.getAccounts(function(e,t){n(t.pop())})})}}}]),app.constant("$delegateOptions",{candidate:"0xb8CA9EA80F51307A26f354B462FC226349505dAE"});