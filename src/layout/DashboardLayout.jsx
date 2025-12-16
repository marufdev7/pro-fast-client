import React from 'react';
import { GoSidebarCollapse } from 'react-icons/go';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { Link, NavLink, Outlet } from 'react-router';
import ProFastLogo from '../components/ProFastLogo/ProFastLogo';
import { RiBox3Line } from 'react-icons/ri';

const dashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <GoSidebarCollapse size={20} />
                    </label>
                    <div className="px-4 text-2xl font-semibold">Dashboard</div>
                </nav>
                {/* Page content here */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-24 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <span className='is-drawer-close:hidden'><ProFastLogo /></span>
                        <li className="mt-2">
                            <Link to="/" className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                {/* Home icon */}
                                <IoHomeOutline size={20} />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                        <li className='mt-2'>
                            <NavLink to='/dashboard/my-parcels'
                                className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Parcels"
                            >
                                <RiBox3Line size={20} />
                                <span className="is-drawer-close:hidden">My Parcels</span>
                            </NavLink>
                        </li>
                        <li className="mt-2">
                            <button className="flex item-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                {/* Settings icon */}
                                <IoSettingsOutline size={20} />
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default dashboardLayout;