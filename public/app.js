document.addEventListener('alpine:init', () => {
    //Alpine.store()
   Alpine.data('app', function () {
    return {
        NAVIGATION: '',
        IsLoggedIn: false,

        init() {
           this.NAVIGATION = 'login'; 
           this.NAVIGATION = 'signup';
           this.NAVIGATION = 'cropContent';
        },
    }
   })
})