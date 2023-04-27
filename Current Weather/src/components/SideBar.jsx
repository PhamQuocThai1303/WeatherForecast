import { useState } from "react";
import { RiAlignJustify, RiCloseCircleLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <>
            {showSidebar ?
                (
                    <div className={`top-0 left-0 w-[300px] bg-orange items-center 
                    flex text-white fixed h-screen transition-transform ease-in-out 
                    duration-1000 z-50`}>
                        <RiCloseCircleLine
                            className=" flex top-0 right-0 absolute w-[50px] h-[50px] cursor-pointer"
                            onClick={() => setShowSidebar(!showSidebar)} />
                        <div className="flex flex-col justify-center items-center w-full gap-6">
                            <NavLink onClick={() => setShowSidebar(!showSidebar)} to={'/'}>NearestWeather</NavLink>
                            <NavLink onClick={() => setShowSidebar(!showSidebar)} to={'/airpl'}>AirPollution</NavLink>
                        </div>
                    </div>
                )
                :
                (
                    <div className="transition-transform ease-in-out duration-1000 visible sm:hidden">
                        <RiAlignJustify className="w-[50px] h-[50px] cursor-pointer" onClick={() => setShowSidebar(!showSidebar)} />
                    </div>
                )

            }
        </>
    )
}
export default SideBar