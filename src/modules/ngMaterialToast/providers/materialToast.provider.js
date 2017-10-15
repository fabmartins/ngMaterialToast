ngMaterialToastModule.provider('$materialToast', function(){
    this.defaults = {
        alignment: 'left bottom',
        showAction: false,
        actionText: 'Undo',
        hideTimeout: 3000,
        targetParent: angular.element('body')
    };

    this.setDefaults = (defaultsObject) => {
        this.defaults = angular.extend(this.defaults, defaultsObject);
    };

    this.$get = function($q){
        return new MaterialToastFactory(this.defaults, $q);
    };

    function MaterialToastFactory(defaults, $q){
        this.toastQueue = [];
        this.defaults = defaults;
        this.hasActiveToast = false;

        this.defaults.targetParent.scope().$watch(() => {
            return (this.toastQueue.length > 0 && !this.hasActiveToast);
        }, (condition) => {
            if(!condition) return false;
            else this.hasActiveToast = true;

            let toast = this.toastQueue.shift();
            let deferred = $q.defer();
            let compiledToast
            
            toast.config.targetParent.injector().invoke(($timeout, $compile) => {
                compiledToast = $compile("<toast message='{{message}}' alignment='{{config.alignment}}' show-action='config.showAction' action-text='{{config.actionText}}' hide-timeout='config.hideTimeout' deferred='deferred'></toast>")(angular.extend(toast.config.targetParent.scope(), { message: toast.message, config: toast.config, deferred: deferred }));

                toast.config.targetParent.append(compiledToast);
            });
            
            return deferred.promise.then(() => { this.hasActiveToast = false; toast.deferred.resolve(compiledToast); }, () => { this.hasActiveToast = false; toast.deferred.reject(compiledToast); });
        });

        this.show = (message, config) => {
            let deferred = $q.defer();

            config = angular.isDefined(config) ? angular.extend(angular.copy(defaults), { targetParent: this.defaults.targetParent }, config) : defaults;
            this.toastQueue.push({ message: message, config: config, deferred: deferred });

            return deferred.promise.then((toast) => { toast.remove(); return $q.resolve(); }, (toast) => { toast.remove(); return $q.reject(); });
        };
    };
});