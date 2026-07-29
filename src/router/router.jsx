import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import AcceptedParcels from "../pages/Dashboard/AcceptedParcels/AcceptedParcels";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import UpdateProfile from "../pages/Dashboard/UpdateProfile/UpdateProfile";
import Settings from "../pages/Dashboard/Settings/Settings";
import Error from "../pages/Error/Error";
import AboutUs from "../pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <Error />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('/warehouses.json')
            },
            {
                path: 'forbidden',
                Component: Forbidden
            },
            {
                path: 'about-us',
                Component: AboutUs,
            },
            {
                path: 'send-parcel',
                element: <PrivateRoute> <SendParcel /> </PrivateRoute>,
                loader: () => fetch('/warehouses.json')
            },
            {
                path: 'be-a-rider',
                element: <PrivateRoute> <BeARider /> </PrivateRoute>,
                loader: () => fetch('/warehouses.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'track-parcel/:tracking_id',
                Component: TrackParcel
            },
            {
                path: 'update-profile',
                Component: UpdateProfile
            },
            {
                path: 'settings',
                Component: Settings,
            },

            //rider routes
            {
                path: 'accepted-parcels',
                element: <RiderRoute> <AcceptedParcels /></RiderRoute>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoute> <CompletedDeliveries /></RiderRoute>
            },

            // admin routes
            {
                path: 'assign-rider',
                element: <AdminRoute> <AssignRider /></AdminRoute>
            },
            {
                path: 'pending-riders',
                element: <AdminRoute> <PendingRiders /></AdminRoute>,
            },
            {
                path: 'active-riders',
                element: <AdminRoute> <ActiveRiders /></AdminRoute>,
            },
            {
                path: 'make-admin',
                element: <AdminRoute> <MakeAdmin /></AdminRoute>
            }
        ]
    }
]);
