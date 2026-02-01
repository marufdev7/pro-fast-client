import React, { useState } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import { Link, NavLink, Outlet } from 'react-router';
import ProFastLogo from '../components/ProFastLogo/ProFastLogo';
import { FiBox, FiCreditCard, FiTruck, FiUser, FiUserCheck, FiUserPlus } from "react-icons/fi";
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { LiaUserClockSolid, LiaUserShieldSolid } from "react-icons/lia";
import trackingIcon from '../assets/tracking.png';
import useUserRole from '../hooks/useUserRole';

const dashboardLayout = () => {

    const { role, roleLoading } = useUserRole();
    const [collapsed, setCollapsed] = useState(false);

    // console.log(role, roleLoading);

    return (
        <div className="drawer drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" defaultChecked />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <GoSidebarExpand size={20} /> : <GoSidebarCollapse size={20} />}
                    </label>
                    <div className="px-4 text-2xl font-semibold">Dashboard</div>
                </nav>
                {/* Page content here */}
                <div className="bg-gray-50 min-h-screen">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-open:w-64 is-drawer-close:w-20">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow">
                        {/* List item */}
                        <span className="is-drawer-close:hidden"><ProFastLogo /></span>
                        <div className='is-drawer-close:mt-14'>
                            <li className="mt-2">
                                <Link to="/dashboard" className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    <IoHomeOutline size={20} />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </Link>
                            </li>
                            <li className='mt-2'>
                                <NavLink to='/dashboard/my-parcels'
                                    className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Parcels"
                                >
                                    <FiBox size={20} />
                                    <span className="is-drawer-close:hidden">My Parcels</span>
                                </NavLink>
                            </li>
                            <li className='mt-2'>
                                <NavLink to='/dashboard/payment-history'
                                    className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History"
                                >
                                    <FiCreditCard size={20} />
                                    <span className="is-drawer-close:hidden">Payment History</span>
                                </NavLink>
                            </li>
                            <li className='mt-2'>
                                <NavLink to='/dashboard/track-parcel'
                                    className="flex items-center -left-1 is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Track a Parcel"
                                >
                                    <img className='w-6' src={trackingIcon} alt="Tracking Icon" />
                                    <span className="is-drawer-close:hidden">Track a Parcel</span>
                                </NavLink>
                            </li>

                            {/* Rider Links */}
                            {!roleLoading && role === 'rider' &&
                                <>
                                    <li className="mt-2">
                                        <NavLink
                                            to="/dashboard/rider-tasks"
                                            className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Pending Deliveries"
                                        >
                                            <FiTruck size={20} />
                                            <span className="is-drawer-close:hidden">My Deliveries</span>
                                        </NavLink>
                                    </li>
                                </>
                            }


                            {/* Admin Links */}
                            {!roleLoading && role === 'admin' &&
                                <>
                                    <li className="mt-2">
                                        <NavLink
                                            to="/dashboard/active-riders"
                                            className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Active Riders"
                                        >
                                            <FiUserCheck size={20} />
                                            <span className="is-drawer-close:hidden">Active Riders</span>
                                        </NavLink>
                                    </li>

                                    <li className="mt-2">
                                        <NavLink
                                            to="/dashboard/assign-rider"
                                            className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Assign Rider"
                                        >
                                            <FiUserPlus size={20} />
                                            <span className="is-drawer-close:hidden">Assign Rider</span>
                                        </NavLink>
                                    </li>

                                    <li className="mt-2">
                                        <NavLink
                                            to="/dashboard/pending-riders"
                                            className="flex items-center -left-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Pending Riders"
                                        >
                                            <LiaUserClockSolid size={22} />
                                            <span className="is-drawer-close:hidden">Pending Riders</span>
                                        </NavLink>
                                    </li>
                                    <li className="mt-2">
                                        <NavLink
                                            to="/dashboard/make-admin"
                                            className="flex items-center -left-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Make Admin"
                                        >
                                            <LiaUserShieldSolid size={22} />
                                            <span className="is-drawer-close:hidden">Make Admin</span>
                                        </NavLink>
                                    </li>
                                </>
                            }

                            <li className='mt-2'>
                                <NavLink
                                    // to='/dashboard/update-profile'
                                    className="flex items-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Update Profile"
                                >
                                    <FiUser size={20} />
                                    <span className="is-drawer-close:hidden">Update Profile</span>
                                </NavLink>
                            </li>
                            <li className="mt-2">
                                <button className="flex item-center is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    <IoSettingsOutline size={20} />
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default dashboardLayout;