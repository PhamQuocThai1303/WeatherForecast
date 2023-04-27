import { BiWind } from 'react-icons/bi'
import { WiHumidity, WiCloudy } from 'react-icons/wi'
import moment from "moment/moment";
import { useSelector } from 'react-redux';

const CurrentWeather = () => {
    const { data } = useSelector((state) => state.weather)

    return (
        <div className="flex flex-col sm:justify-center sm:items-start items-center mb-3">
            <div className="flex flex-col">
                <p className="text-orange">{moment.unix(data.dt).format('lll')}</p>
                <h1 className="text-2xl font-bold">{data.name}, {data.sys.country}</h1>
            </div>
            <div className="flex ">
                <img className="w-[50px]" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
                <h1 className="text-3xl flex items-center font-bold">{(`${data.main.temp}` - 273.15).toFixed(1)} °C</h1>
            </div>
            <p className="font-bold capitalize">{data.weather[0].description}</p>
            <div className="info border-l-2 border-l-orange grid grid-cols-2 pl-4">
                <p className="flex items-center text-sm"><BiWind /> {data.wind.speed}m/s</p>
                <p className="flex items-center text-sm"><WiHumidity className="text-2xl" /> Humidity: {data.main.humidity}%</p>
                <p className="flex items-center text-sm"><WiCloudy className="text-xl" /> Clouds: {data.clouds.all}m/s</p>
                <p>Visibility: {(data.visibility / 1000).toFixed(1)}km</p>
            </div>
        </div>
    )
}
export default CurrentWeather