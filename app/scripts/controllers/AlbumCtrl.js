(function() {
    'use strict'

    angular.module('blocJams')
            .controller('AlbumCtrl', function($scope) {
                $scope.albumData = angular.copy(albumPicasso);
            });
})();
