document.addEventListener('alpine:init', () => {

    Alpine.data('cropTypeWidget', function () {
        return {
            crop:'',
            message: '',
            cropSelected(){
                this.message = cropType(this.crop);
                setTimeout(() => {
                    this.message = '';
                    this.shift = '';
                }, 3000);
            }
        }
    });

})
