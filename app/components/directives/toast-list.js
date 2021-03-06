/*
usage:

step 1. add element to body:
  <toast-list></toast-list>

step 2: use Toast factory
  Toast.info('test');
*/

angular
  .module("web")
  .directive("toastList", function () {
    return {
      restrict: "EA",
      templateUrl: "components/directives/toast-list.html",
      controller: [
        "$scope",
        "$timeout",
        "$location",
        function ($scope, $timeout, $location) {
          $scope.alerts = [];

          $scope.$on("message", function (evt, data) {
            showMessage(data.message, data.type || "danger", data.ttl || 3000);
          });

          function showMessage(msg, type, ttl) {
            var obj = {
              type: type || "danger",
              msg: msg || "",
              id: Math.random()
            };

            //next tick
            $timeout(function () {
              $scope.alerts.push(obj);
              $timeout(function () {
                for (var i = 0; i < $scope.alerts.length; i++) {
                  if ($scope.alerts[i] == obj) {
                    $scope.alerts.splice(i, 1);
                    break;
                  }
                }
              }, ttl || 3000);
            }, 0);
          }
        }
      ]
    };

    function linkFn(scope, ele, attr) {}
  })
  .factory("Toast", [
    "$rootScope",
    function ($rootScope) {
      return {
        success: function (msg, ttl) {
          sendMessage(msg, "success", ttl);
        },
        info: function (msg, ttl) {
          sendMessage(msg, "info", ttl);
        },
        warn: function (msg, ttl) {
          sendMessage(msg, "warning", ttl);
        },
        warning: function (msg, ttl) {
          sendMessage(msg, "warning", ttl);
        },
        error: function (msg, ttl) {
          sendMessage(msg, "danger", ttl);
        }
      };

      function sendMessage(msg, type, ttl) {
        $rootScope.$broadcast("message", {
          message: msg,
          type: type,
          ttl: ttl
        });
      }
    }
  ]);