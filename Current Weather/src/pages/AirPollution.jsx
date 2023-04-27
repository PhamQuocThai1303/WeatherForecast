import { useSelector } from "react-redux";
import { Loader, Error } from "../components";
import { useGetAirPollutionQuery, useGetCurrentWeatherQuery } from "../redux/services/weatherAPI";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateState } from "../redux/features/weatherSlice";
import moment from "moment";


const AirPollution = () => {
    const storedPosition = JSON.parse(localStorage.getItem("position"));

    const lat = storedPosition?.latitude
    const lon = storedPosition?.longitude
    const { data, isFetching, error } = useGetAirPollutionQuery({ lat, lon })
    const { data: mainData, isFetching: fetching, error: isError } = useGetCurrentWeatherQuery({
        lat: storedPosition?.latitude,
        lon: storedPosition?.longitude,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateState(mainData))
    }, [mainData])

    const pollutionProp = {
        'co': 'Carbon monoxide',
        'no': 'Nitrogen monoxide',
        'no2': 'Nitrogen dioxide',
        'o3': 'Ozone',
        'so2': 'Sulfur dioxide',
        'pm2_5': 'Fine particles matter',
        'pm10': 'Coarse particulate matter',
        'nh3': 'Ammonia',
    }

    const airQuallity = {
        1: 'Good',
        2: 'Fair',
        3: 'Moderate',
        4: 'Poor',
        5: 'Very Poor'
    }

    // console.log(data);

    if (isFetching) {
        return <Loader title="Loading..." />
    }
    if (error) {
        return <Error title="Someting wrong" />
    }
    if (fetching) {
        return <Loader title="Loading..." />
    }
    if (isError) {
        return <Error title="Someting wrong" />
    }

    console.log(Object.entries(data?.list[0]?.components));

    return (
        <div className="w-[40vw] mb-9">
            {/* Header */}
            <div className="flex justify-center flex-col items-center py-3">
                <h1 className="text-3xl font-bold text-orange underline underline-offset-8 mb-3 decoration-double
">{airQuallity[data?.list[0]?.main?.aqi]}</h1>
                <div>{moment.unix(data?.list[0]?.dt).format('llll')}</div>
                <h1 className="text-2xl font-bold">{mainData?.name}, {mainData?.sys?.country}</h1>
                <p>Lat: {mainData?.coord?.lat}, Lon: {mainData?.coord?.lon}</p>
            </div>
            {/* Body */}
            <div className="flex justify-center flex-col items-center">
                <p className="uppercase text-xl pb-3 flex justify-center items-center">Today's Pollution Measurements</p>
                <div className="grid lg:grid-cols-2 w-full gap-3 grid-cols-1">
                    {Object.entries(data?.list[0]?.components)?.map((item, index) => {
                        return (
                            <div key={index} className="col-span-1 w-full flex grid grid-cols-3 h-[80px] border border-orange rounded-md pl-3 pr-7 drop-shadow-md">
                                <div className="col-span-2 flex flex-col justify-center items-start ">
                                    <h1 className="text-xl font-bold text-orange uppercase">{item[0]}</h1>
                                    <p>{Object.values(pollutionProp)[index]}</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <span className="col-span-1 justify-center items-center flex text-2xl pr-1">{item[1]} </span>
                                    <span>μg/m3</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default AirPollution;