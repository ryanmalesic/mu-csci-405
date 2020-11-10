const app = angular.module("myApp", ["ngRoute"]);

app.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when("/", {
      templateUrl: "templates/home.html",
      controller: "HomeController",
    })
    .when("/blogs", {
      templateUrl: "templates/blogs.html",
      controller: "BlogsController",
    })
    .when("/blogs/add", {
      templateUrl: "templates/blogs-add.html",
      controller: "BlogsAddController",
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

app.controller("HomeController", function ($scope, $http, $rootScope, $window) {
  getCurrentUser($http, $scope, $window);
  addNavbar($scope, $window);
});

app.controller("BlogsController", function (
  $scope,
  $rootScope,
  $http,
  $window
) {
  getCurrentUser($http, $scope, $window);
  addNavbar($scope, $window);

  $http.get("/api/blogs").then(function (response) {
    $scope.blogs = response.data;
  });
});

app.controller("BlogsAddController", function (
  $scope,
  $rootScope,
  $http,
  $location,
  $route,
  $window
) {
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
});

app.controller("BlogsDeleteController", function (
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
});

app.controller("BlogsEditController", function (
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
});

app.controller("LoginController", function (
  $scope,
  $rootScope,
  $http,
  $location,
  $route,
  $window
) {
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
});

app.controller("RegisterController", function (
  $scope,
  $rootScope,
  $http,
  $location,
  $route,
  $window
) {
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
});

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
