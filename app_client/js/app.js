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
    .otherwise({ redirectTo: "/" });
});

app.controller("HomeController", function ($scope) {
  $scope.navbarActive = false;
  $scope.toggleNavbarActive = function () {
    $scope.navbarActive = !$scope.navbarActive;
  };
});

app.controller("BlogsController", function ($scope, $http) {
  $scope.navbarActive = false;
  $scope.toggleNavbarActive = function () {
    $scope.navbarActive = !$scope.navbarActive;
  };

  $http.get("/api/blogs").then(function (response) {
    $scope.blogs = response.data;
  });
});

app.controller("BlogsAddController", function (
  $scope,
  $http,
  $location,
  $route
) {
  $scope.navbarActive = false;
  $scope.toggleNavbarActive = function () {
    $scope.navbarActive = !$scope.navbarActive;
  };

  $scope.blog = {
    author: {
      avatar: "",
      handle: "",
      name: "",
    },
    title: "",
    content: "",
    tags: "",
  };

  $scope.editable = true;

  $scope.handleCancel = function () {
    $location.path("/blogs");
  };

  $scope.handleSubmit = function (blog) {
    if (!blog.author.handle.includes("@")) {
      blog.author.handle = "@" + blog.author.handle;
    }

    blog.tags = blog.tags.split(",");

    $http.post("/api/blogs", blog).then(
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
  $http,
  $location,
  $route,
  $routeParams
) {
  $scope.navbarActive = false;
  $scope.toggleNavbarActive = function () {
    $scope.navbarActive = !$scope.navbarActive;
  };

  $scope.editable = false;

  $scope.handleCancel = function () {
    $location.path("/blogs");
  };

  $scope.handleSubmit = function (blog) {
    $http.delete(`/api/blogs/${$routeParams.blogId}`, blog).then(
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
  $http,
  $location,
  $route,
  $routeParams
) {
  $scope.navbarActive = false;
  $scope.toggleNavbarActive = function () {
    $scope.navbarActive = !$scope.navbarActive;
  };

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
    if (!blog.author.handle.includes("@")) {
      blog.author.handle = "@" + blog.author.handle;
    }

    blog.tags = blog.tags.split(",");

    $http.put(`/api/blogs/${$routeParams.blogId}`, blog).then(
      function successCallback(response) {
        $location.path("/blogs");
        $route.reload();
      },
      function errorCallback(response) {}
    );
  };
});

app.directive("navbar", function () {
  return {
    restrict: "E",
    scope: {
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
      blogs: "=",
    },
    link: function (scope, elm, attrs) {},
  };
});
