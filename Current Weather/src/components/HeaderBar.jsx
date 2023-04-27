import { SearchBar } from '../components'
import { NavLink } from 'react-router-dom'
const HeaderBar = () => {
    return (
        <div>
            <div className='w-full flex justify-center py-3'>
                <SearchBar />
            </div>
            <div className='hidden sm:flex w-full justify-center gap-5'>
                <NavLink to={'/'}>NearestWeather</NavLink>
                <NavLink to={'/airpl'}>AirPollution</NavLink>
            </div>
        </div>
    )
}
export default HeaderBar