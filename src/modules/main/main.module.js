'use strict';

const mainModule = angular.module('main', ['ui.router', 'ngMaterialToast']).config(function($locationProvider, $materialToastProvider){
    $locationProvider.hashPrefix("!");
    $locationProvider.html5Mode(true);

    $materialToastProvider.setDefaults({
        hideTimeout: 3000
    });
});