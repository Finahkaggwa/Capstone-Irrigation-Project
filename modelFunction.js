export default function modelFunction(cropList, irrigationStatus) {

    let crops = [{
        "Crop_type": "Beans",
        "Soil_Moisture": 35,
        "Rainfall": 300,
        "Temperature": 18
    }, {
        "Crop_type": "Potatoes",
        "Soil_Moisture": 50,
        "Rainfall": 500,
        "Temperature": 16
    }, {
        "Crop_type": "Chili",
        "Soil_Moisture": 40,
        "Rainfall": 400,
        "Temperature": 22
    },]

    let irrigationStat = irrigationStatus;

    let beanList = cropList.filter(cropList => cropList.Crop_type === 'Beans');
    for(let i=0; i<cropList.length; i++){
        console.log(cropList[i]);

        if(irrigationStat.soilMoistureData < beanList["Soil_Moisture"] && `${weatherApiResponse.data.main.temp} °`< beanList["Temperature"] && weatherApiResponse.data.weather[0].description <beanList["Rainfall"])
        {
            irrigationStat = 'irrigate';
        }
        else {
            irrigationStat = 'Not irrigate';
        }
        return irrigationStat
    };

    let potatoList = cropList.filter(cropList => cropList.Crop_type === 'Potatoes');
    for(let i=0; i<cropList.length; i++){
        console.log(cropList[i]);

        if(irrigationStat.soilMoistureData < potatoList["Soil_Moisture"] &&`${weatherApiResponse.data.main.temp} °`< potatoList["Temperature"] && weatherApiResponse.data.weather[0].description < potatoList["Rainfall"])
        {
            irrigationStat = 'irrigate';
        }
        else {
            irrigationStat = 'Not irrigate';
        }
        return irrigationStat
    };

    let chiliList = cropList.filter(cropList => cropList.Crop_type === 'Potatoes');
    for(let i=0; i<cropList.length; i++){
        console.log(cropList[i]);

        if(irrigationStat.soilMoistureData < chiliList["Soil_Moisture"] && `${weatherApiResponse.data.main.temp} °`< chiliList["Temperature"] && weatherApiResponse.data.weather[0].description < chiliList["Rainfall"])
        {
            irrigationStat = 'irrigate';
        }
        else {
            irrigationStat = 'Not irrigate';
        }
        return irrigationStat
    };

}
