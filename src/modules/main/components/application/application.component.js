mainModule.component('application', {
    controller: applicationController,
    templateUrl: 'modules/main/components/application/application.component.html'
});

function applicationController($materialToast){
    this.moveToTrash = () => {
        $materialToast.show('Email moved to trash.', { showAction: true }).then(function(){
            $materialToast.show('Email recovered.').then(() => { }, () => {});
        }).catch(function(){
            console.log('rejected.');
        });
    };
};