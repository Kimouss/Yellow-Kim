'use strict';

angular.module('blackJackApp')
    .factory('storage', function ($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            get: function(key, defaultValue) {
                if($window.localStorage[key] != undefined){
                    return JSON.parse($window.localStorage[key]);
                } else {
                    return defaultValue || false;
                }
            },
            remove: function(key){
                $window.localStorage.removeItem(key);
            },
            clear: function(){
                $window.localStorage.clear();
            }
        }
    });
