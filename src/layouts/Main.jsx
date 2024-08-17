import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const Main = () => {
  return (
    <div>
  <Navbar/>
      <div className='min-h-[calc(100vh-306px)]'>
       <Outlet/>
      </div>
    </div>
  )
}

export default Main