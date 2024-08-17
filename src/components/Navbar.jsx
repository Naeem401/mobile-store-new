import { useContext } from "react"
import {  NavLink } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext)
  return (
   <div className="bg-gradient-to-r from-purple-600 to-blue-300 shadow-sm">
     <div className='navbar container px-4 mx-auto flex justify-between'>
      <div className='flex-1'>
        <div className='flex gap-2 items-center font-bold text-white text-lg'>
          <h2 >Mobile Store</h2>
        </div>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 flex gap-8'>
          <li>
            <NavLink
              to='/'
              exact
              className='text-white hover:text-gray-200'
              activeClassName='text-blue-800 font-semibold'
            >
              All Mobile
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                to='/login'
                className='text-white hover:text-gray-200'
                activeClassName='text-blue-800 font-semibold'
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
              <div title={user.displayName} className='w-10 h-10 rounded-full overflow-hidden'>
                <img referrerPolicy='no-referrer' alt='User Profile' src={user.photoURL} className='w-full h-full object-cover' />
              </div>
            </div>
            <ul className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52'>
              <li className='mt-2'>
                <button onClick={logOut} className='bg-gray-200 text-gray-800 block w-full text-center rounded py-2 hover:bg-gray-300'>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
   </div>
  )
}


export default Navbar