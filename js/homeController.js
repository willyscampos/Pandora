app.controller('homeController', function ($rootScope, $scope, $http, $location) {

    //$rootScope.ondeestou = "Área Principal";
    //$rootScope.statusMenu = false;
    //$rootScope.perfilLogin = $rootScope.usuarioPerfil_nome;
    //$rootScope.$apply();
    
    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }
});
