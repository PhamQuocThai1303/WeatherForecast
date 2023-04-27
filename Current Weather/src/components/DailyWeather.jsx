import { useGet5DaysWeatherQuery } from "../redux/services/weatherAPI";
import { useDispatch } from "react-redux";
import { Loader, Error } from "../components";
import { useSelector } from 'react-redux'
import moment from 'moment';
import { updateState, openModal } from "../redux/features/modalSlice";


const DailyWeather = () => {
    const { data: mainData } = useSelector((state) => state.weather)
    const lat = mainData.coord.lat
    const lon = mainData.coord.lon
    const { data, isFetching, error } = useGet5DaysWeatherQuery({ lat, lon })

    const dispatch = useDispatch();

    const ForecastData = [
        //id: 
        //temperature:
        //time:
        //windspeed:
        //description:
        //icon:
    ]
    const FinForecastData = []

    //tao ForecastData theo ngay (co lap lai theo gio khac nhau)
    data?.list.map((item, index) => {

        ForecastData.push({
            id: index,
            temp: Math.round((item.main.temp - 273.15).toFixed(1)),
            time: moment.unix(item.dt).format('ll'),
            windspd: item.wind.speed,
            desc: item.weather[0].description,
            icon: item.weather[0].icon,
        })

    })

    //tao FinForecast theo ngay khac nhau
    for (let i = 0; i < ForecastData?.length; i++) {
        let j = i
        let tmpDesc = []
        let tmpIcon = []
        let tempavg = 0;
        let tempMax = 0;
        let tempMin = 1000;
        let windavg = 0;
        while (ForecastData[i]?.time === ForecastData[j]?.time) {
            tempavg += ForecastData[j].temp
            windavg += ForecastData[j].windspd
            j++;
            tmpDesc.push(ForecastData[j]?.desc)
            tmpIcon.push(ForecastData[j]?.icon)
            if (tempMax < ForecastData[j]?.temp) tempMax = ForecastData[j]?.temp
            if (tempMin > ForecastData[j]?.temp) tempMin = ForecastData[j]?.temp
        }

        let finDesc = mode(tmpDesc);
        let finIcon = mode(tmpIcon)

        FinForecastData.push({
            temp: (tempavg / (j - i)).toFixed(1),
            windspd: (windavg / (j - i)).toFixed(2),
            time: ForecastData[i]?.time,
            desc: finDesc,
            icon: finIcon,
            tempMax: tempMax,
            tempMin: tempMin
        })
        i = j;
    }

    //ham` tim gia tri lap lai nhieu nhat
    function mode(array) {
        if (array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for (var i = 0; i < array.length; i++) {
            var el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    // console.log(FinForecastData);

    return (
        <div className={`flex grid sm:grid-cols-5 w-full gap-2 grid-cols-4 justify-items-stretch mb-9`}>
            {Object.values(FinForecastData)?.map((item, index) => {
                if (FinForecastData.length === 6 ? index > 0 : index > -1) {
                    return (
                        <div
                            key={index}
                            className="col-span-1 h-[200px] w-full flex flex-col items-center border border-orange rounded-md cursor-pointer"
                            onClick={() => { dispatch(openModal()); dispatch(updateState(item)) }}>

                            <div className="font-bold text-lg bg-orange w-full rounded-t-md flex justify-center text-white">{item.time}</div>
                            <img className="w-[100px]" src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                            <div className="font-bold">{item.tempMax} / {item.tempMin} °C</div>
                            <p>{item.desc}</p>
                        </div>
                    )
                }
            })}
        </div>

    )
}
export default DailyWeather