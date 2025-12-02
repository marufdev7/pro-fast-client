import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from '../../../components/ProFastLogo/ProFastLogo';
import { MdArrowOutward } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .catch(err => console.log(err));
    };


    const navItems = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
        <li><NavLink to={'/about'}>About Us</NavLink></li>
    </>
    return (
        <div className="navbar bg-white shadow-sm pt-4 pb-4 pl-5 pr-5 rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <ProFastLogo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            {/* <div className="navbar-end space-x-4">
                <Link to={'/login'} className="btn bg-white hover:bg-gray-100 border hover:border-gray-300 rounded-lg w-24 text-[#606060] hover:text-[#404040]">Login</Link>
                <div className='flex items-center'>
                    <Link to={'/register'} className="btn bg-[#CAEB66] text-slate-800 hover:text-black hover:bg-[#B8D94E] rounded-lg w-24">Sign Up</Link>
                    <MdArrowOutward size={36} className='bg-black text-[#caeb66] rounded-full w p-1' />
                </div>
            </div> */}

            <div className="navbar-end space-x-4">

                {user ? (
                    <>
                        <span className="text-sm text-gray-700">
                            {user?.displayName || user?.email}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="btn bg-red-500 border-red-500 hover:bg-red-600 text-white rounded-lg w-24"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="btn bg-white hover:bg-gray-100 border hover:border-gray-300 rounded-lg w-24 text-[#606060] hover:text-[#404040]"
                        >
                            Login
                        </Link>

                        <div className="flex items-center">
                            <Link
                                to="/register"
                                className="btn bg-[#CAEB66] text-slate-800 hover:text-black hover:bg-[#B8D94E] rounded-lg w-24"
                            >
                                Sign Up
                            </Link>
                            <MdArrowOutward size={36} className="bg-black text-[#caeb66] rounded-full p-1" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;