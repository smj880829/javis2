var app = angular.module('gameApp',  ['ngRoute','ngAnimate','ngScrollable','ngCookies'])

app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
//Module의 config API를 사용하면 서비스 제공자provider에 접근할 수 있다. 여기선 $route 서비스 제공자를 인자로 받아온다.
 $routeProvider
//$routeProvider의 when 메소드를 이용하면 특정 URL에 해당하는 라우트를 설정한다. 이때 라우트 설정객체를 전달하는데 <ng-view>태그에 삽입할 탬플릿에 해당하는 url을 설정객체의 templateUrl 속성으로 정의한다.
   .when('/main', {templateUrl: '/main'})
   .when('/test', {templateUrl: '/test'})
//라우트 설정객체에 controller 속성을 통하여 해당 화면에 연결되는 컨트롤러 이름을 설정할 수 있다.
   .otherwise({redirectTo: '/'});
//otherwise 메소드를 통하여 브라우저의 URL이 $routeProivder에서 정의되지 않은 URL일 경우에 해당하는 설정을 할 수 있다. 여기선 ‘/home’으로 이동시키고 있다.
 }])

app.controller('test',
['$scope', '$window','$http','socket','$log','$anchorScroll','$location','$rootScope','$cookies','$interval',
 function($scope, $window,$http,socket,$log,$anchorScroll,$location,$rootScope,$cookies,$interval) {

   $scope.others = 'progress-bar-success'
  var tt2 = 0;
   var flg;
   $scope.start = function() {
      if ( angular.isDefined(flg) ) return;

        flg = $interval(function() {
          if (tt2 < 100) {
            var no = new Date();
            var tt =( $rootScope.unitStatus[0].end.getTime() - no.getTime())/1000
            tt2 = (1-(tt / $rootScope.unitStatus[0].val)) * 100;
            $rootScope.val += 10 ;
             $scope.myW = tt2 +'%';
          } else {
            $scope.stop();
          }
        }, 1000,0,true);
   }

   $scope.stop = function() {
      if (angular.isDefined(flg)) {
        $interval.cancel(flg);
        flg = undefined;
      }
    };

    $scope.reset = function() {
      $rootScope.val = 0
    };

    $scope.start();

}]
)


  app.run(['$rootScope', '$window','$http','$location','$scope',
  function($rootScope, $window,$http,$location,$scope) {
    $rootScope.val = 0;

    $rootScope.unitStatus  = new Array();

    var ti = new Date();
    var se = ti.getSeconds() + 20;
    ti.setSeconds(ti.getSeconds()-10);
    var ti2 = new Date();
    ti2.setSeconds(se);
    var va = (ti2.getTime() - ti.getTime())/1000

    $rootScope.unitStatus[0] = {start: ti ,end: ti2,val:va}

    var no = new Date();
    var tt =( $rootScope.unitStatus[0].end.getTime() - no.getTime())/1000
    var tt2 = (1-(tt / $rootScope.unitStatus[0].val)) * 100;
    $rootScope.val += 10 ;
     $scope.myW = tt2 +'%';





  }]);

  app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://52.78.102.96/');
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  })
    app.directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

    app.directive('progressBar', function () {
        return {
          restrict: 'E',
          templateUrl: '/game/module/progressbar'
        };
    })
