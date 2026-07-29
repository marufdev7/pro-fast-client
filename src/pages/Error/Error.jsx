import { Link, useRouteError } from 'react-router';
import { FiAlertTriangle, FiArrowLeft, FiHome, FiRefreshCw } from 'react-icons/fi';

const Error = () => {
    const error = useRouteError();
    const isNotFound = error?.status === 404;

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F8F8] px-4 py-12 sm:px-6">
            <div className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-[#CAEB66]/35 blur-3xl" />
            <div className="absolute -bottom-24 -right-12 h-80 w-80 rounded-full bg-[#00A88E]/20 blur-3xl" />

            <section className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white bg-white/90 p-6 text-center shadow-xl shadow-slate-900/5 backdrop-blur sm:p-10">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-[#CAEB66] via-[#00A88E] to-[#003B3F]" />
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-4xl text-amber-600 shadow-sm"><FiAlertTriangle /></div>
                <p className="mt-7 text-sm font-bold uppercase tracking-[0.24em] text-[#008D77]">{isNotFound ? 'Error 404' : 'Something went wrong'}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#003B3F] sm:text-4xl">{isNotFound ? 'This page is off the route' : 'We hit an unexpected bump'}</h1>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">{isNotFound ? 'The page you are looking for may have moved, been removed, or never existed.' : 'The page could not be loaded right now. Please try again, or return to the homepage.'}</p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link to="/" className="btn order-2 border-slate-300 bg-white text-slate-700 hover:border-[#008D77] hover:bg-[#F0FBF8] sm:order-1"><FiHome /> Go home</Link>
                    <button onClick={() => window.location.reload()} className="btn order-1 border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E] sm:order-2"><FiRefreshCw /> Try again</button>
                </div>

                <Link to="/" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#008D77]"><FiArrowLeft /> Return safely to ProFast</Link>
            </section>
        </main>
    );
};

export default Error;
