import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FiAlertCircle, FiCheckCircle, FiSearch, FiShield, FiUserCheck, FiUserMinus, FiUsers } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const formatDate = (isoDate) => {
    if (!isoDate) return 'Not available';
    const date = new Date(isoDate);
    return Number.isNaN(date.getTime())
        ? isoDate
        : date.toLocaleString('en-BD', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
};

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [email, setEmail] = useState('');
    const searchTerm = email.trim();

    const {
        data: users = [],
        refetch,
        isFetching,
        isError,
    } = useQuery({
        queryKey: ['search-user', searchTerm],
        enabled: Boolean(searchTerm),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${encodeURIComponent(searchTerm)}`);
            return res.data;
        },
    });

    const updateRole = async (user, role) => {
        const isPromoting = role === 'admin';
        const confirm = await Swal.fire({
            title: isPromoting ? 'Grant admin access?' : 'Remove admin access?',
            text: `${user.email} will ${isPromoting ? 'be able to manage' : 'no longer be able to manage'} the platform.`,
            icon: isPromoting ? 'question' : 'warning',
            showCancelButton: true,
            confirmButtonText: isPromoting ? 'Make admin' : 'Remove access',
            confirmButtonColor: isPromoting ? '#008D77' : '#dc2626',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/users/${user._id}/role`, { role });
            await Swal.fire('Role updated', `${user.email} is now a ${role}.`, 'success');
            refetch();
        } catch {
            Swal.fire('Update failed', 'The user role could not be updated. Please try again.', 'error');
        }
    };

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 right-28 h-44 w-44 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Access management</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Manage administrators</h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Find an account and securely grant or remove administrative access.</p>
                    </div>
                    <span className="flex w-fit items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur-sm"><FiShield className="text-[#CAEB66]" /> Restricted area</span>
                </div>
            </section>

            <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F8F4] text-xl text-[#008D77]"><FiUsers /></span>
                    <div><h2 className="text-xl font-bold text-slate-800">Find a user</h2><p className="mt-1 text-sm leading-6 text-slate-500">Start typing any part of an email address to find matching accounts.</p></div>
                </div>

                <label className="relative mt-6 block"><span className="sr-only">Search users by email</span><FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Type part of an email address..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#00A88E] focus:ring-4 focus:ring-[#00A88E]/10" /></label>
            </section>

            {searchTerm && (
                <section className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" aria-live="polite">
                    <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                        <div><h2 className="text-xl font-bold text-slate-800">Search results</h2><p className="mt-1 text-sm text-slate-500">Showing accounts matching <span className="font-medium text-slate-700">{searchTerm}</span>.</p></div>
                        {!isFetching && !isError && users.length > 0 && <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#E8F8F4] px-3 py-1.5 text-xs font-semibold text-[#008D77]"><FiCheckCircle /> {users.length} found</span>}
                    </div>

                    {isFetching ? (
                        <div className="space-y-4 p-7 animate-pulse"><div className="h-5 w-1/3 rounded bg-slate-100" /><div className="h-16 rounded-xl bg-slate-100" /></div>
                    ) : isError ? (
                        <div className="m-5 flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-rose-700 sm:m-7"><FiAlertCircle className="mt-0.5 shrink-0 text-lg" /><p className="text-sm">We couldn’t complete this search. Please try again.</p></div>
                    ) : users.length === 0 ? (
                        <div className="py-14 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400"><FiSearch /></span><h3 className="mt-4 font-bold text-slate-700">No user found</h3><p className="mt-2 text-sm text-slate-500">Check the email address and search again.</p></div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table min-w-[680px]">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th>User</th><th>Joined</th><th>Current role</th><th className="text-right">Access</th></tr></thead>
                                <tbody>
                                    {users.map((user) => {
                                        const isAdmin = user.role === 'admin';
                                        return <tr key={user._id} className="hover:bg-slate-50/70"><td><p className="font-semibold text-slate-800">{user.email}</p><p className="mt-1 text-xs text-slate-400">User account</p></td><td className="text-sm text-slate-600">{formatDate(user.created_at)}</td><td><span className={`badge border-0 px-3 py-3 text-xs font-semibold ${isAdmin ? 'bg-[#E8F8F4] text-[#008D77]' : 'bg-slate-100 text-slate-600'}`}>{isAdmin ? 'Administrator' : 'User'}</span></td><td className="text-right"><button onClick={() => updateRole(user, isAdmin ? 'user' : 'admin')} className={`btn btn-sm ${isAdmin ? 'border-rose-200 bg-white text-rose-600 hover:border-rose-300 hover:bg-rose-50' : 'border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E]'}`}>{isAdmin ? <FiUserMinus /> : <FiUserCheck />}{isAdmin ? 'Remove admin' : 'Make admin'}</button></td></tr>;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
};

export default MakeAdmin;
