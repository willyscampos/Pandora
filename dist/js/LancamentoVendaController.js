app.controller('LancamentoVendaController', function ($rootScope, $scope, $http, $filter, $location) {

    $rootScope.ondeestou = "Paginação";    
    $rootScope.statusMenu = false;   
    $scope.btnStatusProtudo = true;
    //$scope.statusParcela = true;    
    $scope.listFormaPagamento = [];
    $scope.listFormaPagamento = [{ Id: 0, Nome: '' }];

    console.log($rootScope.usuarioPerfil_id);
    

    $scope.objLancamentoVenda = {

        usp_id:'',
        cli_id: '',
        lac_data_pedido:'',
        lac_valor:'',
        lac_data_vencimento:'',
        lac_forma_pagamento:'',
        lac_qtd_parcela:''
    };  
  

    $scope.selecionaCliente = function () {
      
        enabledORdesabledInput($scope.clienteId);
    
    };

    function enabledORdesabledInput(valor) {
        
        if (valor != undefined) {
            $scope.btnStatusProtudo = false;
            
        } else  {
            $scope.btnStatusProtudo = true;
           
        }                
    };

    
    $scope.registraVendaCliente = function () {

        $scope.objLancamentoVenda = {};
       
        $scope.objLancamentoVenda.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objLancamentoVenda.cli_id = $scope.clienteId;

      
        console.log($scope.objLancamentoVenda);

        
        $http.post($rootScope.Servidor + '/novaVenda', $scope.objLancamentoVenda).success(registraVendaClienteCallback);
    }

    function registraVendaClienteCallback(data, status) {
       
        console.log(data);
        //console.log(data[0][0].CLI_NOME);

        if (data != null) {
            $rootScope.statusMenu = false;

            $rootScope.lancamentoVendaId = data[0][0].LAV_ID;
            $rootScope.nome_cliente = data[0][0].CLI_NOME;
                       
            $location.path('/lancamentoVendaProduto');
          

        } else {

            $('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');
        }       
        
    }


    $scope.listCliente = function () {

        $scope.objCliente = { usp_id: $rootScope.usuarioPerfil_id };

        $http.post($rootScope.Servidor + '/listCliente', $scope.objCliente).success(listClienteCallback);

    }

    function listClienteCallback(data, status) {
        $scope.listaCliente = data;
    }


    $scope.InitlistFormaPagamento = function () {

        $scope.listFormaPagamento = [
            { Id: 'A', Nome: 'AVISTA' },
            { Id: 'P', Nome: 'PARCELADO' }
        ];
    };

    $scope.InitlistFormaPagamento();

    $scope.fPagamento = function () {

        enabledORdesabledInputProduto($scope.forma_pagamento);

    };

    function enabledORdesabledInputProduto(valor) {

        if (valor == 'A') {
            $scope.statusVencimento = false;
            $scope.statusParcela = true;
        } else if (valor == 'P') {
            $scope.statusVencimento = false;
            $scope.statusParcela = false;
        }
    };
    
});

app.controller('LancamentoVendaProcudoController', function ($rootScope, $scope, $http, $filter, $location) {

    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    $scope.btnStatusProtudo = true;
    $scope.statusFormFormaPagamento = true;
    $scope.statusVencimento = true;
    $scope.statusParcela = true;    
    $scope.listFormaPagamento = [];
    $scope.listFormaPagamento = [{ Id: 0, Nome: '' }];
    $scope.listaProdutoTabela = [];

    $scope.cliente_nome = $rootScope.nome_cliente;

    console.log($rootScope.usuarioPerfil_id);


    $scope.objLancamentoProduto = {

        lav_id:'',
        pro_id:'',
        usp_id: '',
        qtd_produto:''
    };

    $scope.objLancamentoVendaProduto = {

        lav_id:'',
        usp_id: '',
        lav_data_pedido: '',       
        lav_data_vencimento: '',
        lav_forma_pagamento: '',
        lav_qtd_parcela: ''
    };

    $scope.registraProduto = function () {
        
        $scope.objLancamentoProduto = {};
        $scope.objLancamentoProduto.lav_id = $rootScope.lancamentoVendaId
        $scope.objLancamentoProduto.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objLancamentoProduto.pro_id = $scope.produtoId;
        $scope.objLancamentoProduto.qtd_produto = $scope.qtd_produto;


        console.log($scope.objLancamentoProduto);


        $http.post($rootScope.Servidor + '/novoProutoVenda', $scope.objLancamentoProduto).success(registraProdutoCallback);
    }

    function registraProdutoCallback(data, status) {
        
        listaProdutoVenda();

    }


    $scope.listProduto = function () {

        $scope.objProduto = { usp_id: $rootScope.usuarioPerfil_id };

        $http.post($rootScope.Servidor + '/listProduto', $scope.objProduto).success(listProdutoCallback);

    }

    function listProdutoCallback(data, status) {
        $scope.listaProduto = data;
       
    }


    $scope.InitlistFormaPagamento = function () {

        $scope.listFormaPagamento = [
            { Id: 'A', Nome: 'AVISTA' },
            { Id: 'P', Nome: 'PARCELADO' }
        ];
    };

    $scope.InitlistFormaPagamento();

    $scope.fPagamento = function () {

        enabledORdesabledInputProduto($scope.forma_pagamento);

    };

    function enabledORdesabledInputProduto(valor) {

        if (valor == 'A') {
            $scope.statusVencimento = false;
            $scope.statusParcela = true;
        } else if (valor == 'P') {
            $scope.statusVencimento = false;
            $scope.statusParcela = false;
        }
    };

    $scope.testeProduto = function () {

        listaProdutoVenda();
    };

    function listaProdutoVenda() {

        $scope.objLancamentoProduto.lav_id = $rootScope.lancamentoVendaId
        $scope.objLancamentoProduto.usp_id = $rootScope.usuarioPerfil_id;

        $http.post($rootScope.Servidor + '/listProdutoVenda', $scope.objLancamentoProduto).success(listProdutoVendaCallback);
    };

    function listProdutoVendaCallback(data, status) {

        $scope.listaProdutoTabela = data;
        calculoProduto();
    }

    $scope.definirFormaPagamento = function ($event) {
        
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');

        if (action === 'add') {
            $scope.statusFormFormaPagamento = false;           
        }

        if (action === 'remove') {
           
            $scope.statusFormFormaPagamento = true;            
        }

        
    };
    
    $scope.finalizarVenda = function () {
       
        var dataPedido = $filter('date')($scope.data_pedido, 'yyyy-MM-dd');
        var dataVencimento = $filter('date')($scope.data_vencimento, 'yyyy-MM-dd');
        console.log(dataPedido);
        console.log(dataVencimento);
        $scope.objLancamentoVendaProduto = {};

        $scope.objLancamentoVendaProduto.lav_id = $rootScope.lancamentoVendaId
        $scope.objLancamentoVendaProduto.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objLancamentoVendaProduto.lav_data_pedido = dataPedido;        
        $scope.objLancamentoVendaProduto.lav_data_vencimento = dataVencimento;
        $scope.objLancamentoVendaProduto.lav_forma_pagamento = $scope.forma_pagamento;
        $scope.objLancamentoVendaProduto.lav_qtd_parcela = $scope.qtd_parcela;

        console.log($scope.objLancamentoVendaProduto);


        $http.post($rootScope.Servidor + '/finalizarVenda', $scope.objLancamentoVendaProduto).success(finalizarVendaCallback);
    }

    function finalizarVendaCallback(data, status) {

        if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            alert('Venda finalizada com sucesso!');
            $location.path('/lancamentoVenda');
        }
    }

    $scope.listarProdutoVendido = function (produtoId) {

        $scope.objProdutoVenda = {
            lap_id: produtoId
        }

        $http.post($rootScope.Servidor + '/listarProdutoVendido', $scope.objProdutoVenda).success(listarProdutoVendidoCallback);
    }

    function listarProdutoVendidoCallback(data, status) {

        if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {

           

        }
    }

    $scope.excluirProdutoLista = function (produtoId) {

        $scope.objProdutoVenda = {
            lap_id: produtoId
        }
        //$(this).closest(produtoId).remove();
        //$(produtoId).parent().parent().remove();

        alert(produtoId);
        $http.post($rootScope.Servidor + '/excluirProdutoLista', $scope.objProdutoVenda).success(excluirProdutoListaCallback);
    }

    function excluirProdutoListaCallback(data, status) {

        //if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        //} else {
            
        listaProdutoVenda();
        
        //}
    }

    function calculoProduto() {

        var total = 0;
              
        $('#lisProduto tbody tr').each(function (i) {

            var valor = $(this).find('td:eq(3)').text();

            
            //   var valores = converteMoedaFloat(lCell);

            if (valor === '') {
                valor = 0;
            } else {
                valor = valor.replace(".", "");
                valor = valor.replace(",", ".");
                valor = parseFloat(valor);
            }


            total += valor;

            
        });

        num = total;
        total = Math.round(num * 100) / 100;

       // var sTotal = converteFloatMoeda(total)
        $scope.valorTotalVenda = total;
       console.log(total);
    }

   
    function converteMoedaFloat(valor) {

        if (valor === '') {
            valor = 0;
        } else {
            valor = valor.replace(".", "");
            valor = valor.replace(",", ".");
            valor = parseFloat(valor);
        }
        return valor;

    }
});
