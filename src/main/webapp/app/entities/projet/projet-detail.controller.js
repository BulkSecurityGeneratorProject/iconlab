(function() {
    'use strict';

    angular
    .module('iconlabApp')
    .controller('ProjetDetailController', ProjetDetailController);
    'use strict';
    angular
    .module('iconlabApp')
    .controller('ProjetCompteController', ProjetCompteController);

    ProjetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Projet', 'Compte', 'MessageHierachique', 'Commentaire', 'Tache', 'User'];
    ProjetCompteController.$inject = ['$rootScope','$scope','$state','entity', 'ProjetSpecial','MessageHierachiqueSpecial','DocumentSpecial','Principal'];

    function ProjetDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Projet, Compte, MessageHierachique, Commentaire, Tache, User) {
        var vm = this;
        vm.projet = entity;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('iconlabApp:projetUpdate', function(event, result) {
            vm.projet = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }

    function ProjetCompteController($rootScope,$scope,$state,entity,ProjetSpecial,MessageHierachiqueSpecial,DocumentSpecial,Principal) {
        var vm = this;

        vm.compte = entity;

        var unsubscribe = $rootScope.$on('iconlabApp:compteUpdate', function(event, result) {
            vm.compte = result;
        });
        $scope.$on('$destroy', unsubscribe);

        function accessCurrentAccount() {
            Principal.identity().then(function (account) {
                vm.account = account;
            });
        }

        if($state.params.id){
            ProjetSpecial.getProjetByCompte($state.params.id).then(function(data){
                accessCurrentAccount();
                vm.listePr = data;
            },function(){
                console.log("Erreur");
            });

            MessageHierachiqueSpecial.getMessageByCompte($state.params.id).then(function(data){
                vm.listeMessage = data;
            },function(){
                console.log("Erreur");
            });
            MessageHierachiqueSpecial.getMessageByCompteUser().then(function(data){
                vm.listeMeUser = data;
            },function(){
                console.log("Erreur");
            });
            DocumentSpecial.getDocumentByCUser().then(function(data){
                vm.listeDocumentUser = data;
            },function(){
                console.log("Erreur");
            });
        }

        //$scope.idSelectedVote = null;
        $scope.setSelected = function (idSelectedVote) {
            $scope.idSelectedVote = idSelectedVote;
        };
    }
})();
