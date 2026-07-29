import { useEffect, useState } from 'react';
import { FiCamera, FiCheckCircle, FiMail, FiSave, FiUser } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';

const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setDisplayName(user?.displayName || '');
        setPhotoURL(user?.photoURL || '');
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setError('');

        if (!displayName.trim()) {
            setError('Please enter your name.');
            return;
        }

        setIsSaving(true);
        try {
            await updateUserProfile({
                displayName: displayName.trim(),
                photoURL: photoURL.trim(),
            });
            setMessage('Your profile has been updated successfully.');
        } catch (updateError) {
            setError(updateError.message || 'We could not update your profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 right-28 h-44 w-44 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Account settings</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Update your profile</h1>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Keep your name and profile photo up to date so your ProFast account feels like yours.</p>
                </div>
            </section>

            <section className="mt-8 grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
                <aside className="bg-[#F0FBF8] p-6 sm:p-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#008D77]">Profile preview</p>
                    <div className="mt-6 flex flex-col items-center text-center">
                        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-[#D7F3EC] shadow-md">
                            {photoURL ? (
                                <img src={photoURL} alt="Profile preview" className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center text-4xl text-[#008D77]"><FiUser /></span>
                            )}
                            <span className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#00A88E] text-white"><FiCamera /></span>
                        </div>
                        <h2 className="mt-4 text-xl font-bold text-[#003B3F]">{displayName || 'Your name'}</h2>
                        <p className="mt-1 break-all text-sm text-slate-500">{user?.email}</p>
                    </div>
                    <div className="mt-8 rounded-xl border border-[#C8EDE4] bg-white/70 p-4">
                        <p className="text-sm font-semibold text-[#003B3F]">Tip</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">Use a clear photo URL so riders and support can recognize your account easily.</p>
                    </div>
                </aside>

                <div className="p-6 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Personal information</h2>
                        <p className="mt-1 text-sm text-slate-500">Only your name and profile photo can be changed here.</p>
                    </div>

                    {message && <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><FiCheckCircle className="mt-0.5 shrink-0 text-lg" />{message}</div>}
                    {error && <div className="mb-5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                            <span className="relative block"><FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} type="text" placeholder="Enter your full name" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#00A88E] focus:ring-4 focus:ring-[#00A88E]/10" /></span>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                            <span className="relative block"><FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={user?.email || ''} type="email" readOnly className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-500 outline-none" /></span>
                            <span className="mt-2 block text-xs text-slate-400">Email changes are managed by your sign-in provider.</span>
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">Profile photo URL</span>
                            <span className="relative block"><FiCamera className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={photoURL} onChange={(event) => setPhotoURL(event.target.value)} type="url" placeholder="https://example.com/photo.jpg" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#00A88E] focus:ring-4 focus:ring-[#00A88E]/10" /></span>
                        </label>

                        <button type="submit" disabled={isSaving} className="btn mt-2 w-full border-[#CAEB66] bg-[#CAEB66] font-semibold text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E] disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-500">
                            <FiSave /> {isSaving ? 'Saving changes...' : 'Save changes'}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default UpdateProfile;
