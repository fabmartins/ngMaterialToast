ngMaterialToastModule.component('toast', {
    controller: toastController,
    templateUrl: 'modules/ngMaterialToast/components/toast/toast.component.html',
    bindings: {
        message: '@',
        alignment: '@',
        showAction: '<',
        actionText: '@',
        hideTimeout: '<',
        deferred: '<'
    }
});

function toastController($timeout, $scope){
    this.show = false;
    this.animationDelay = 400;
    this.timeoutPromise = null;

    this.$onInit = () => {
        this.show = true;
        
        this.timeoutPromise = $timeout(() => {
            this.show = false;
            $timeout(() => this.deferred.reject(), this.animationDelay);
        }, this.hideTimeout);
    };

    this.onToastClick = () => {
        this.show = false;
        $timeout.cancel(this.timeoutPromise);

        $timeout(() => this.deferred.reject(), this.animationDelay);
    };

    this.onActionClick = (event) => {
        event.stopPropagation();

        this.show = false;
        $timeout.cancel(this.timeoutPromise);

        $timeout(() => this.deferred.resolve(), this.animationDelay);
    };
}