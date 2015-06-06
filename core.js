/// <reference path="pages/home.html" />
// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
  "ngSanitize",

  'mobile-angular-ui.gestures'
]);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'login.html', reloadOnSearch: false });
    $routeProvider.when('/login', { templateUrl: 'login.html', reloadOnSearch: false });
    $routeProvider.when('/home', { templateUrl: 'pages/home2.html', reloadOnSearch: false });
    $routeProvider.when('/sair', { templateUrl: 'pages/sair.html', reloadOnSearch: false });
    //novo
    $routeProvider.when('/cadastroUsuario', { templateUrl: 'pages/usuario/usuario.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoCompra', { templateUrl: 'pages/lancamentoCompra/pedidos.html', reloadOnSearch: false });

    //outros
    $routeProvider.when('/listaUsuario', { templateUrl: 'pages/usuario/listusuario.html', reloadOnSearch: false });
    $routeProvider.when('/editUsuario/:itemId', { templateUrl: 'pages/usuario/editusuario.html', reloadOnSearch: false });
    
    $routeProvider.when('/listParcelaLancamentoCompra/:itemId', { templateUrl: 'pages/lancamentoCompra/listParcelaLancamentoCompra.html', reloadOnSearch: false });
    $routeProvider.when('/editParcelaLancamentoCompra/:itemId,:pStatusParcela,:pValorParcela,:pDataVencimento,:pLancamentoId', { templateUrl: 'pages/lancamentoCompra/editParcelaLancamentoCompra.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoVenda', { templateUrl: 'pages/lancamentoVenda/lancamentoVenda.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoVendaProduto', { templateUrl: 'pages/lancamentoVenda/lancamentoVendaProduto.html', reloadOnSearch: false });
    $routeProvider.when('/gerenciarVenda', { templateUrl: 'pages/lancamentoVenda/gerenciarVenda.html', reloadOnSearch: false });
    $routeProvider.when('/listParcelaVendaCliente/:itemId,:pcliId,:pcliNome,:pvalorTotal,:pformaPagamento,:pdataPedido', { templateUrl: 'pages/lancamentoVenda/listParcelaVendaCliente.html', reloadOnSearch: false });
    $routeProvider.when('/editParcelaVendaCliente/:itemId,:pStatusParcela,:pValorParcela,:pDataVencimento,:pLancamentoId', { templateUrl: 'pages/lancamentoVenda/editParcelaVendaCliente.html', reloadOnSearch: false });
    
});

app.controller('MainController', function ($rootScope, $scope) {

    // User agent displayed in home page
    $scope.userAgent = navigator.userAgent;

    $rootScope.menu1 = true;
    $rootScope.menu2 = false;

    $rootScope.idUsuario = 0;
    $rootScope.saudacao = "";
    $rootScope.AppTitle = "início";
    $rootScope.checked = false;
    $rootScope.AppVersion = "1.0"
    $rootScope.usr_id = 0;
    $rootScope.usr_name = '';
    //$rootScope.Servidor = "http://localhost:8080";
    $rootScope.Servidor = "http://201.90.97.6:8080";
    var data = new Date();
    lmes = data.getMonth() + 1;
    lano = data.getFullYear();
    $rootScope.mes = lmes;
    $rootScope.ano = lano;
    $rootScope.DataCorrente = data

    // Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
        //alert($rootScope.idUsuario);
    });

    $rootScope.$on('$routeChangeSuccess', function () {
    
        $rootScope.loading = false;
    });

});

app.controller('SairController', function ($rootScope, $scope, $location) {

    // User agent displayed in home page
    $scope.userAgent = navigator.userAgent;

    $rootScope.menu1 = true;
    $rootScope.menu2 = false;

    $rootScope.saudacao = "";
    $rootScope.idUsuario = 0;
    $rootScope.AppTitle = "Penélope"
    $rootScope.AppVersion = "1.0"
    $rootScope.usr_id = 0;
    $rootScope.usr_name = '';
    $location.path('/');
    

});
