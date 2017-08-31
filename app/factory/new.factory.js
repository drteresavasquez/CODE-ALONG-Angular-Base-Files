(function() {
  'use strict';

  var newFactory = function() {
    return {
      newFunction: function() {
        // return something
      }
    };
  };

  newFactory.$inject = [];

  angular.module('myApp').factory('newFactory', newFactory);
})();
