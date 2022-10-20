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
            selectedCrop: 'selected crop is.....',
            recordsMessage: '',
            open: false,
            crops: false,
            Beans: 0,
            Chilli:0,
            Potato: 0,
            
                 init() {
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${this.api_key}`)
                    .then(weatherApiResponse => {
                        console.log(weatherApiResponse.data);
                        this.currentWeather = {
                            status: weatherApiResponse.data.weather[0].description,
                            temperature: `${weatherApiResponse.data.main.temp} °F`,
                        }
                    })

                axios.get('/api/time')
                    .then(timeApiResponse => {
                        this.currentWeather.currentTime = timeApiResponse.data.currentDate
                        console.log(this.currentWeather.currentTime);
                    })

                
                


            },

            CropType() {
                this.crops = !this.crops
            },

            RecordsHistory() {
                this.open = !this.open
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


            irrigatingstatus() {
                console.log(this.Beans);
                let bodyFormData = new FormData();
                bodyFormData.append('Type',3);
                bodyFormData.append('Moisture', 47);

                axios({
                    method: "post",
                    url: " https://final-irrigate-model-01.herokuapp.com/api/predict",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                    .then(function (response) {
                        //handle success
                        console.log(response);
                        // this.sendIrrigationStatus(response.data.predictions)
                        axios.post('/api/predicted_results', { irrigationStatus:response.data.predictions }).then(res => {

                        });
                    })
                    .catch(function (response) {
                        //handle error
                        console.log(response);
                    });
            },





        }

    });
})