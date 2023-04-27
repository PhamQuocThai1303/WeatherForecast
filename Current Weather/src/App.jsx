import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AirPollution, NearestWeather } from './pages'
import { CurrentWeather, DailyBar, SearchBar, SideBar, HeaderBar } from './components'
import { Modal } from './components'
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from './redux/features/weatherSlice';


function App() {
  const { isOpen } = useSelector((state) => state.modal)
  const { data } = useSelector((state) => state.weather)
  const dispatch = useDispatch()

  // if (data) {
  //   useEffect(() => {
  //     dispatch(updateState(data))
  //   }, [data])
  // }

  return (
    <>
      {isOpen && <Modal />}

      <div className='relative flex'>
        <SideBar />

        <div className='w-full flex flex-col'>

          <HeaderBar />

          <div className='flex flex-row justify-center w-full'>
            <Routes>
              <Route path="/" element={<NearestWeather />} />
              <Route path="/airpl" element={<AirPollution />} />
              {/* <Route path="/search/:searchTerm" element={<Search />} /> */}
            </Routes>
          </div>
        </div>
      </div>

    </>

  )
}

export default App
