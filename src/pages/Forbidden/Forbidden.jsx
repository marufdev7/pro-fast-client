import { Link } from 'react-router';
import { FiArrowLeft, FiHome, FiLock, FiLogOut, FiShield } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

const Forbidden = () => {
    const { logOut } = useAuth();

    const handleLogout = () => {
        logOut().catch((err) => console.log(err));
    };

    return (
        <main className="relative flex min-h-[calc(100vh-11rem)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
            <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#CAEB66]/35 blur-3xl" />
            <div className="absolute -bottom-24 -right-12 h-80 w-80 rounded-full bg-[#00A88E]/15 blur-3xl" />

            <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-6 text-center shadow-xl shadow-slate-900/5 backdrop-blur sm:p-10">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#5a740c] via-[#00A88E] to-[#003B3F]" />

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8F8F4] text-[#008D77] shadow-sm">
                    <FiShield className="text-4xl" aria-hidden="true" />
                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.24em] text-red-700">Error 403</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#003B3F] sm:text-4xl">You don’t have access to this page</h1>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                    This area is restricted to authorized users. If you believe this is a mistake, sign in with an account that has the required permissions.
                </p>

                <div className="mx-auto mt-7 flex max-w-md items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-left">
                    <FiLock className="mt-0.5 shrink-0 text-lg text-amber-600" aria-hidden="true" />
                    <p className="text-sm leading-5 text-amber-800">Your current account does not have the role needed to open this route or login again.</p>
                </div>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link to="/" className="btn order-2 border-slate-300 bg-white text-slate-700 hover:border-[#008D77] hover:bg-[#F0FBF8] sm:order-1">
                        <FiHome /> Back to home
                    </Link>
                    <Link to="/login" onClick={handleLogout} className="btn order-1 border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E] sm:order-2">
                        <FiLogOut /> Sign in with another account
                    </Link>
                </div>

                <Link to="/" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#004d41]">
                    <FiArrowLeft /> Return safely to ProFast
                </Link>
            </section>
        </main>
    );
};

export default Forbidden;
