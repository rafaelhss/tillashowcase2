(function() {
    'use strict';

    angular
        .module('tillashowcase2App')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('produto', {
            parent: 'entity',
            url: '/produto',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Produtos'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/produto/produtos.html',
                    controller: 'ProdutoController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('produto-detail', {
            parent: 'produto',
            url: '/produto/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Produto'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/produto/produto-detail.html',
                    controller: 'ProdutoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Produto', function($stateParams, Produto) {
                    return Produto.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'produto',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('produto-detail.edit', {
            parent: 'produto-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produto/produto-dialog.html',
                    controller: 'ProdutoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Produto', function(Produto) {
                            return Produto.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('produto.new', {
            parent: 'produto',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produto/produto-dialog.html',
                    controller: 'ProdutoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nome: null,
                                foto: null,
                                fotoContentType: null,
                                preco: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('produto', null, { reload: 'produto' });
                }, function() {
                    $state.go('produto');
                });
            }]
        })
        .state('produto.edit', {
            parent: 'produto',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produto/produto-dialog.html',
                    controller: 'ProdutoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Produto', function(Produto) {
                            return Produto.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('produto', null, { reload: 'produto' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('produto.delete', {
            parent: 'produto',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/produto/produto-delete-dialog.html',
                    controller: 'ProdutoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Produto', function(Produto) {
                            return Produto.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('produto', null, { reload: 'produto' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
