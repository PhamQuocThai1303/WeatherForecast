import { useGetCurrentWeatherQuery } from "../redux/services/weatherAPI";
import { useDispatch, useSelector } from "react-redux";
import { Loader, Error } from "../components";
import { useState, useEffect } from "react";
import { updateState } from "../redux/features/weatherSlice";
import { DailyWeather, CurrentWeather, Map } from '../components'


const NearestWeather = () => {
    const { data: weatherdata } = useSelector((state) => state.weather) //Khi có data từ redux, ta sẽ setState của weatherSlice bằng 
    //reducer (phải đợi khi update xog state mới render main jsx)
    const storedPosition = JSON.parse(localStorage.getItem("position"));

    //Lấy currentWeather từ dữ liệu của local để tránh bị mất khi reload
    const { data, isFetching, error } = useGetCurrentWeatherQuery({
        lat: storedPosition?.latitude,
        lon: storedPosition?.longitude,
    });


    const dispatch = useDispatch();

    // Check localStorage xem có position k, nếu có thì lấy dữ liệu từ local khi reload và ngược lại khi lần đầu vào web sẽ lấy position từ vị trí hiện tại
    useEffect(() => {
        const storedPosition = JSON.parse(localStorage.getItem("position"));
        if (storedPosition) {
            const latitude = storedPosition?.latitude
            const longitude = storedPosition?.longitude
            localStorage.setItem("position", JSON.stringify({ latitude, longitude }));
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                localStorage.setItem("position", JSON.stringify({ latitude, longitude }));
            });
        }
    }, []);

    // Khi có data sẽ dispatch lên state để update
    useEffect(() => {
        dispatch(updateState(data))
    }, [data])

    // console.log(weatherdata);

    if (isFetching) {
        return <Loader title="Loading..." />
    }
    if (error) {
        return <Error title="Someting wrong" />
    }

    // Khi có weatherdata mới render main jsx
    if (!weatherdata) {
        return <Loader title="Loading..." />
    }

    else return (
        <div className="grid-cols-2 sm:w-[800px] mt-10 mx-5">
            <div className="flex grid sm:grid-cols-7 justify-center mb-10 grid-cols-2 flex-wrap">

                {/* Current weather */}
                <div className="sm:col-span-3 col-span-2 grid ">
                    <CurrentWeather />
                </div>
                {/* Map weather */}
                <div className="sm:col-span-4 flex justify-center col-span-2 h-[200px]">
                    <Map />
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="w-full flex justify-center ">
                    <DailyWeather />
                </div>
            </div>
        </div>
    )


}
export default NearestWeather;