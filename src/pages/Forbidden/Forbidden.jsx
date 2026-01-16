import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Forbidden = () => {

    const { logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .catch(err => console.log(err));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#eaeced]">
            <div className="bg-white p-10 rounded-xl shadow-md max-w-md text-center">
                <h1 className="text-5xl font-extrabold text-red-600 mb-4">403</h1>

                <h2 className="text-xl font-semibold mb-2">
                    Access Denied
                </h2>

                <p className="text-gray-600 mb-6">
                    You do not have permission to access this page.
                    Admin privileges are required.
                </p>

                <div className="flex justify-center gap-3">
                    <Link to="/" className="btn btn-outline">
                        Go Home
                    </Link>

                    <Link
                        to="/login"
                        className="btn bg-[#CAEB66] text-black"
                        onClick={handleLogout}
                    >
                        Login Again
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;