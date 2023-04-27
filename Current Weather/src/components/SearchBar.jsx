import { useState, useEffect } from "react";
import { useGetSearchLocationQuery, useGetCurrentWeatherQuery } from "../redux/services/weatherAPI";
import { useDispatch } from "react-redux";
import { updateState } from "../redux/features/weatherSlice";
import { TbLocation } from "react-icons/tb";

import axios from "axios";


const SearchBar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();


    var latitude = 0
    var longitude = 0

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=c398b06e8da4a38625ed23998f31cbcc`)
            .then((res) => {
                //Khi lấy được vị trí cần search thì update lại localStorage 
                latitude = res.data[0].lat
                longitude = res.data[0].lon
                localStorage.setItem("position", JSON.stringify({ latitude, longitude }));
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=current&appid=c398b06e8da4a38625ed23998f31cbcc`)
                    .then((res) => {
                        {
                            dispatch(updateState(res.data));
                        }
                    })
            })
        setQuery('')
    };


    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            localStorage.setItem("position", JSON.stringify({ latitude, longitude }));
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=current&appid=c398b06e8da4a38625ed23998f31cbcc`)
                .then((res) => {
                    {
                        dispatch(updateState(res.data));
                    }
                })
        });
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="flex items-center">
                <label>

                    <input
                        className="border border-orange rounded-l-lg outline-none py-1 px-2 w-[30vw] h-[40px]"
                        placeholder="Search City"
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </label>
                <button type="submit" className="bg-orange rounded-r-lg py-1 h-[40px] px-3 hover:opacity-75">Search</button>

            </form>
            <button className="h-[40px] px-3 ml-2 bg-orange text-white rounded-lg hover:opacity-75" onClick={() => getCurrentLocation()}> <TbLocation /> </button>
        </>
    )
}
export default SearchBar