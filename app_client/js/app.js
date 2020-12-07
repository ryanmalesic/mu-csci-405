const app = angular.module("myApp", ["ngRoute"]);

app.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when("/", {
      templateUrl: "templates/home.html",
      controller: "HomeController",
    })
    .when("/chat", {
      templateUrl: "templates/chat.html",
      controller: "ChatController",
    })
    .when("/blogs", {
      templateUrl: "templates/blogs.html",
      controller: "BlogsController",
    })
    .when("/blogs/add", {
      templateUrl: "templates/blogs-add.html",
      controller: "BlogsAddController",
    })
    .when("/blogs/:blogId", {
      templateUrl: "templates/blog.html",
      controller: "BlogController",
    })

    .when("/blogs/:blogId/delete", {
      templateUrl: "templates/blogs-delete.html",
      controller: "BlogsDeleteController",
    })
    .when("/blogs/:blogId/edit", {
      templateUrl: "templates/blogs-edit.html",
      controller: "BlogsEditController",
    })
    .when("/login", {
      templateUrl: "templates/login.html",
      controller: "LoginController",
    })
    .when("/register", {
      templateUrl: "templates/register.html",
      controller: "RegisterController",
    })
    .otherwise({ redirectTo: "/" });
});

function addNavbar($scope, $window) {
  $scope.navbarActive = false;
  ($scope.toggleNavbarActive = function () {
    $scope.navbarActive = !$scope.navbarActive;
  }),
    ($scope.logout = function () {
      $window.localStorage.removeItem("bloggerToken");
      $scope.email = !$scope.email;
    });
}

function getCurrentUser($http, $scope, $window) {
  $http
    .get("/api/me", {
      headers: {
        Authorization: `Bearer ${$window.localStorage.getItem("bloggerToken")}`,
      },
    })
    .then(
      function successCallback(response) {
        $scope.email = response.data.email;
      },
      function errorCallback(response) {}
    );
}

app.controller("ChatController", function ($scope, $http, $interval, $window) {
  getCurrentUser($http, $scope, $window);
  addNavbar($scope, $window);

  $http.get("/api/messages").then(function (response) {
    $scope.messages = response.data;
  });

  $scope.handleMessage = function (newMessage) {
    $http
      .post(
        `/api/messages`,
        { text: newMessage },
        {
          headers: {
            Authorization: `Bearer ${$window.localStorage.getItem(
              "bloggerToken"
            )}`,
          },
        }
      )
      .then(
        function successCallback(response) {
          $scope.messages = [...$scope.messages, response.data];
        },
        function errorCallback(response) {}
      );

    $scope.callAtInterval = function () {
      $http.get(`/api/messages`).then(
        function successCallback(response) {
          $scope.messages = response.data;
        },
        function errorCallback(response) {}
      );
    };

    var promise = $interval(
      function () {
        $scope.callAtInterval();
      },
      1000,
      0,
      true
    );

    $scope.$on("$destroy", function () {
      if (promise) $interval.cancel(promise);
    });
  };
});

app.controller("HomeController", function ($scope, $http, $rootScope, $window) {
  getCurrentUser($http, $scope, $window);
  addNavbar($scope, $window);
});

app.controller("BlogsController", function ($scope, $http, $interval, $window) {
  getCurrentUser($http, $scope, $window);
  addNavbar($scope, $window);

  $http.get("/api/blogs").then(function (response) {
    $scope.blogs = response.data;
  });

  $scope.handleCheer = function (blog) {
    $http
      .put(
        `/api/blogs/${blog._id}/cheer`,
        {},
        {
          headers: {
            Authorization: `Bearer ${$window.localStorage.getItem(
              "bloggerToken"
            )}`,
          },
        }
      )
      .then(
        function successCallback(response) {
          blog.cheers += 1;
        },
        function errorCallback(response) {}
      );
  };

  $scope.callAtInterval = function () {
    $http.get("/api/blogs").then(function (response) {
      $scope.blogs = response.data;
    });
  };
  var promise = $interval(
    function () {
      $scope.callAtInterval();
    },
    3000,
    0,
    true
  );

  $scope.$on("$destroy", function () {
    if (promise) $interval.cancel(promise);
  });
});

app.controller(
  "BlogController",
  function ($scope, $http, $interval, $route, $routeParams, $window) {
    getCurrentUser($http, $scope, $window);
    addNavbar($scope, $window);

    $scope.newComment = "";

    $http.get(`/api/blogs/${$routeParams.blogId}`).then(
      function successCallback(response) {
        $scope.blog = response.data;
      },
      function errorCallback(response) {}
    );

    $scope.handleCheer = function (blog) {
      $http
        .put(
          `/api/blogs/${$routeParams.blogId}/cheer`,
          {},
          {
            headers: {
              Authorization: `Bearer ${$window.localStorage.getItem(
                "bloggerToken"
              )}`,
            },
          }
        )
        .then(
          function successCallback(response) {
            $scope.blog.cheers += 1;
          },
          function errorCallback(response) {}
        );
    };

    $scope.handleComment = function (comment) {
      $http
        .post(
          `/api/blogs/${$routeParams.blogId}/comments`,
          { body: comment },
          {
            headers: {
              Authorization: `Bearer ${$window.localStorage.getItem(
                "bloggerToken"
              )}`,
            },
          }
        )
        .then(
          function successCallback(response) {
            $scope.blog = response.data;
          },
          function errorCallback(response) {}
        );
    };

    $scope.callAtInterval = function () {
      $http.get(`/api/blogs/${$routeParams.blogId}`).then(
        function successCallback(response) {
          $scope.blog = response.data;
        },
        function errorCallback(response) {}
      );
    };

    var promise = $interval(
      function () {
        $scope.callAtInterval();
      },
      3000,
      0,
      true
    );
    $scope.$on("$destroy", function () {
      if (promise) $interval.cancel(promise);
    });
  }
);

app.controller(
  "BlogsAddController",
  function ($scope, $rootScope, $http, $location, $route, $window) {
    getCurrentUser($http, $scope, $window);
    addNavbar($scope, $window);

    $scope.blog = {
      title: "",
      content: "",
    };

    $scope.editable = true;

    $scope.handleCancel = function () {
      $location.path("/blogs");
    };

    $scope.handleSubmit = function (blog) {
      $http
        .post("/api/blogs", blog, {
          headers: {
            Authorization: `Bearer ${$window.localStorage.getItem(
              "bloggerToken"
            )}`,
          },
        })
        .then(
          function successCallback(response) {
            $location.path("/blogs");
            $route.reload();
          },
          function errorCallback(response) {}
        );
    };
  }
);

app.controller(
  "BlogsDeleteController",
  function (
    $scope,
    $rootScope,
    $http,
    $location,
    $route,
    $routeParams,
    $window
  ) {
    getCurrentUser($http, $scope, $window);
    addNavbar($scope, $window);

    $http.get(`/api/blogs/${$routeParams.blogId}`).then(
      function successCallback(response) {
        $scope.blog = response.data;
      },
      function errorCallback(response) {}
    );

    $scope.editable = false;

    $scope.handleCancel = function () {
      $location.path("/blogs");
    };

    $scope.handleSubmit = function (blog) {
      $http
        .delete(`/api/blogs/${$routeParams.blogId}`, {
          headers: {
            Authorization: `Bearer ${$window.localStorage.getItem(
              "bloggerToken"
            )}`,
          },
        })
        .then(
          function successCallback(response) {
            $location.path("/blogs");
            $route.reload();
          },
          function errorCallback(response) {}
        );
    };
  }
);

app.controller(
  "BlogsEditController",
  function (
    $scope,
    $rootScope,
    $http,
    $location,
    $route,
    $routeParams,
    $window
  ) {
    getCurrentUser($http, $scope, $window);
    addNavbar($scope, $window);

    $http.get(`/api/blogs/${$routeParams.blogId}`).then(
      function successCallback(response) {
        $scope.blog = response.data;
      },
      function errorCallback(response) {}
    );

    $scope.editable = true;

    $scope.handleCancel = function () {
      $location.path("/blogs");
    };

    $scope.handleSubmit = function (blog) {
      $http
        .put(`/api/blogs/${$routeParams.blogId}`, blog, {
          headers: {
            Authorization: `Bearer ${$window.localStorage.getItem(
              "bloggerToken"
            )}`,
          },
        })
        .then(
          function successCallback(response) {
            $location.path("/blogs");
            $route.reload();
          },
          function errorCallback(response) {}
        );
    };
  }
);

app.controller(
  "LoginController",
  function ($scope, $rootScope, $http, $location, $route, $window) {
    getCurrentUser($http, $scope, $window);
    addNavbar($scope, $window);

    $scope.handleSubmit = function (user) {
      $http.post(`/api/login`, user).then(
        function successCallback(response) {
          $scope.error = false;
          $rootScope.email = user.email;
          $window.localStorage.setItem("bloggerToken", response.data.token);
          $location.path("/blogs");
          $route.reload();
        },
        function errorCallback(response) {
          $scope.error = true;
        }
      );
    };
  }
);

app.controller(
  "RegisterController",
  function ($scope, $rootScope, $http, $location, $route, $window) {
    getCurrentUser($http, $scope, $window);
    addNavbar($scope, $window);

    $scope.handleSubmit = function (user) {
      $http.post(`/api/register`, user).then(
        function successCallback(response) {
          $scope.error = false;
          $location.path("/login");
          $route.reload();
        },
        function errorCallback(response) {
          $scope.error = true;
        }
      );
    };
  }
);

app.directive("navbar", function () {
  return {
    restrict: "E",
    scope: {
      email: "=",
      logout: "&",
      navbarActive: "=",
      toggleNavbarActive: "&",
    },
    replace: true,
    templateUrl: "partials/navbar.html",
    link: function (scope, elm, attrs) {},
  };
});

app.directive("blogform", function () {
  return {
    restrict: "E",
    templateUrl: "partials/blog-form.html",
    replace: true,
    scope: {
      blog: "=",
      editable: "=",
      handleCancel: "&",
      handleSubmit: "&",
    },
  };
});

app.directive("bloglist", function () {
  return {
    restrict: "E",
    templateUrl: "partials/blog-list.html",
    replace: true,
    scope: {
      email: "=",
      blogs: "=",
      handleCheer: "&",
    },
    link: function (scope, elm, attrs) {},
  };
});

app.directive("blogview", function () {
  return {
    restrict: "E",
    templateUrl: "partials/blog-view.html",
    replace: true,
    scope: {
      email: "=",
      blog: "=",
      handleCheer: "&",
    },
    link: function (scope, elm, attrs) {},
  };
});

app.directive("loginform", function () {
  return {
    restrict: "E",
    templateUrl: "partials/login-form.html",
    replace: true,
    scope: {
      error: "=",
      handleSubmit: "&",
    },
    link: function (scope, elm, attrs) {},
  };
});

app.directive("registerform", function () {
  return {
    restrict: "E",
    templateUrl: "partials/register-form.html",
    replace: true,
    scope: {
      error: "=",
      handleSubmit: "&",
    },
    link: function (scope, elm, attrs) {},
  };
});
