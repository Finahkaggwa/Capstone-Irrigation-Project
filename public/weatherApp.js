document.addEventListener('alpine:init', () => {
    Alpine.data('weatherAPIWidget', function () {
        return {
            currentWeather: {
                currentTime: ''
            },
            api_key: 'bc047c16abf00b0e604196cf163bd8d7',
            lat: 44.34,
            lon: 10.99,
            irrigation_history: [],
            selectedCrop: '',
            recordsMessage: '',
            open: false,
            crops: false,
                  
                 init() {
                    this.RecordsHistory()
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${this.api_key}`)
                    .then(weatherApiResponse => {
                        console.log(weatherApiResponse.data);
                        this.currentWeather = {
                            status: weatherApiResponse.data.weather[0].description,
                            temperature: `${weatherApiResponse.data.main.temp} °F`,
                            
                        }
                        axios.get('/api/time')
                        .then(timeApiResponse => {
                            this.currentWeather.currentTime = timeApiResponse.data.currentDate
                            console.log(this.currentWeather);
                        })  
                    })

           

            },

            CropType() {
                this.crops = !this.crops
            },

            

            RecordsHistory() {
                // console.log(alert('Irrigation history'));
                // this.open = !this.open
                axios.get('/api/records_table')
                .then((results) => {
                    this.irrigation_history = results.data.Records_table;
                    // console.log(this.irrigation_history.Records_table)
                })
            },
            
            // sendIrrigationStatus(status) {
            //     axios.post('/api/predicted_results', { irrigationStatus: }).then(res => {

            //     });
            // },

            // irrigatingstatus() {
            //     let bodyFormData = new FormData();
            //     bodyFormData.append('soil_moisture', 37);

            //     axios({
            //         method: "post",
            //         url: " https://eflask-api-app.herokuapp.com/api/predict",
            //         data: bodyFormData,
            //         headers: { "Content-Type": "multipart/form-data" },
            //     })
            //         .then(function (response) {
            //             //handle success
            //             console.log(response);
            //             // this.sendIrrigationStatus(response.data.predictions)
            //             axios.post('/api/predicted_results', { irrigationStatus:response.data.predictions }).then(res => {

            //             });
            //         })
            //         .catch(function (response) {
            //             //handle error
            //             console.log(response);
            //         });
            // },
            moisture:'',
            typecrops: '',
            irrigatePredict: "",
            predictions: "", 
            
            Beans(){
                this.typecrops = 1
                this.selectedCrop = 'Beans'
            },
            
            Chilli(){
                this.typecrops = 2
                this.selectedCrop = 'Chilli'
            },

            Potato(){
                this.typecrops = 3
                this.selectedCrop = 'Potato'
            },
           
            
            irrigatingstatus() {
                // console.log(this.Beans);
                let bodyFormData = new FormData();
                bodyFormData.append('Type',this.typecrops);
                bodyFormData.append('Moisture', this.moisture);

                axios({
                    method: "post",
                    url: " https://final-irrigate-model-01.herokuapp.com/api/predict",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then((response) => {
                        // console.log(response.data.predictions);
                        // this.sendIrrigationStatus(response.data.predictions)
                        axios.post('/api/predicted_results', { irrigationStatus:response.data.predictions }).then(res => {
                            console.log(response.data.predictions);
                            this.predictions = response.data.predictions;
                        });
                    })
                    .catch(function (response) {
                        //handle error
                        // console.log(response);
                    });
            },
            
        }

    });
})