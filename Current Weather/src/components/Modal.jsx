import { useDispatch, useSelector } from "react-redux"
import { GrClose } from "react-icons/gr";
import { closeModal } from "../../../../Redux basic/src/features/modal/modalSlice";
import { useGet5DaysWeatherQuery } from "../redux/services/weatherAPI";
import moment from "moment";
import { BiWind } from 'react-icons/bi'
import { WiHumidity, WiCloudy } from 'react-icons/wi'

const Modal = () => {
    const dispatch = useDispatch()
    const { data: mainData } = useSelector((state) => state.weather)
    const lat = mainData?.coord?.lat
    const lon = mainData?.coord?.lon
    const { data, isFetching, error } = useGet5DaysWeatherQuery({ lat, lon })
    const { Modaldata, isOpen } = useSelector((state) => state.modal)


    const HourlyData = []

    data?.list?.map((item) => {
        const tmpTime = moment.unix(item.dt).format('ll')

        if (tmpTime === Modaldata.time) {
            HourlyData.push({
                time: moment.unix(item.dt).format('LT'),
                temp: Math.round((item.main.temp - 273.15).toFixed(1)),
                tempMax: Math.round((item.main.temp_max - 273.15).toFixed(1)),
                tempMin: Math.round((item.main.temp_min - 273.15).toFixed(1)),
                humidity: item.main.humidity,
                windspd: item.wind.speed,
                visibility: item.visibility,
                cloud: item.clouds.all,
                description: item.weather[0].description,
                icon: item.weather[0].icon
            })
        }
    })

    // console.log(data);



    return (
        <div className={`transition-opacity duration-500 ease-in-out smooth-transition ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="fixed w-[100%] h-[100%] bg-slate-300 opacity-75 z-10 flex items-center justify-center">
            </div>
            <div className="bg-white opacity-100 w-[60vw] absolute z-20 top-[18%] left-[20%] flex items-center justify-center rounded-lg">

                <GrClose onClick={() => dispatch(closeModal())} className="absolute top-0 right-0 pt-2 pr-2 w-[40px] h-[40px] cursor-pointer" />
                <div className="absolute top-0 left-0 p-4 bg-orange font-bold text-xl text-white rounded-tl-lg rounded-br-lg">{Modaldata.time}</div>
                <div className="grid md:grid-cols-2 mt-16 mb-5 w-full grid-cols-1">
                    {HourlyData?.map((item, index) => {
                        return (
                            <div key={index}
                                className="md:col-span-1 border-1 border-indigo-500/100 w-full flex flex-row p-3 justify-center 
                            items-center hover:bg-[rgba(72,72,74,.05)] rounded-md gap-1">
                                <div className="font-bold text-orange">{item.time}</div>

                                <div className="px-4">
                                    <img className="w-[50px]" src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                                    <div className="font-bold pl-0">{item.temp} °C</div>

                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                    <p className="flex items-center text-sm"><BiWind /> {item.windspd}m/s</p>
                                    <p className="flex items-center text-sm"><WiHumidity className="text-2xl" /> Humidity: {item.humidity}%</p>
                                    <p className="flex items-center text-sm"><WiCloudy className="text-xl" /> Clouds: {item.cloud}m/s</p>
                                    <p>Visibility: {(item.visibility / 1000).toFixed(1)}km</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}

export default Modal