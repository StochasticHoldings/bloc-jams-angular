 (function() {
     function CollectionCtrl(Fixtures) {
         this.albums = Fixtures.getCollection(12);
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
 // 01/04/16
