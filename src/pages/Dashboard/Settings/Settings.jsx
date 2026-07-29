import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiBell, FiCheckCircle, FiChevronRight, FiMail, FiSave, FiShield, FiTruck, FiUser } from 'react-icons/fi';

const preferenceKey = 'profast-dashboard-preferences';

const Settings = () => {
    const [preferences, setPreferences] = useState({ deliveryUpdates: true, emailUpdates: true, productUpdates: false });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const storedPreferences = localStorage.getItem(preferenceKey);
        if (storedPreferences) {
            setPreferences((current) => ({ ...current, ...JSON.parse(storedPreferences) }));
        }
    }, []);

    const togglePreference = (key) => {
        setSaved(false);
        setPreferences((current) => ({ ...current, [key]: !current[key] }));
    };

    const savePreferences = () => {
        localStorage.setItem(preferenceKey, JSON.stringify(preferences));
        setSaved(true);
    };

    const settings = [
        { key: 'deliveryUpdates', icon: FiTruck, title: 'Delivery updates', description: 'Get updates when your parcel status changes.' },
        { key: 'emailUpdates', icon: FiMail, title: 'Email notifications', description: 'Receive important account and delivery information by email.' },
        { key: 'productUpdates', icon: FiBell, title: 'Product news', description: 'Receive occasional updates about new ProFast features.' },
    ];

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <section className="relative overflow-hidden rounded-3xl bg-[#003B3F] px-6 py-8 text-white shadow-lg sm:px-8 sm:py-10">
                <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#00A88E]/30 blur-3xl" />
                <div className="absolute -bottom-24 right-28 h-44 w-44 rounded-full bg-[#CAEB66]/15 blur-3xl" />
                <div className="relative">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7EE7D6]">Account settings</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Personalize your experience</h1>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">Choose how ProFast communicates with you and manage your account preferences.</p>
                </div>
            </section>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="notifications-heading">
                    <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F8F4] text-xl text-[#008D77]"><FiBell /></span>
                        <div><h2 id="notifications-heading" className="text-xl font-bold text-slate-800">Notifications</h2><p className="mt-1 text-sm leading-6 text-slate-500">Select the updates you would like to receive.</p></div>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {settings.map(({ key, icon: Icon, title, description }) => (
                            <div key={key} className="flex items-center gap-4 py-5">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Icon /></span>
                                <div className="min-w-0 flex-1"><h3 className="font-semibold text-slate-800">{title}</h3><p className="mt-1 text-sm leading-5 text-slate-500">{description}</p></div>
                                <input aria-label={title} type="checkbox" checked={preferences[key]} onChange={() => togglePreference(key)} className="toggle shrink-0 border-[#00A88E] bg-slate-200 text-[#00A88E] checked:border-[#00A88E] checked:bg-[#00A88E]" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-slate-400">Preferences are saved on this browser.</p>
                        <button onClick={savePreferences} className="btn border-[#CAEB66] bg-[#CAEB66] text-slate-900 hover:border-[#B8D94E] hover:bg-[#B8D94E]"><FiSave /> Save preferences</button>
                    </div>
                    {saved && <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700"><FiCheckCircle /> Your preferences have been saved.</p>}
                </section>

                <aside className="space-y-6">
                    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F8F4] text-xl text-[#008D77]"><FiUser /></span>
                        <h2 className="mt-4 text-lg font-bold text-slate-800">Profile details</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">Change the name and photo shown across your ProFast account.</p>
                        <Link to="/dashboard/update-profile" className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#00A88E] hover:bg-[#F0FBF8] hover:text-[#008D77]">Update profile <FiChevronRight /></Link>
                    </section>

                    <section className="rounded-2xl border border-[#C8EDE4] bg-[#F0FBF8] p-5 sm:p-6">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl text-[#008D77] shadow-sm"><FiShield /></span>
                        <h2 className="mt-4 text-lg font-bold text-[#003B3F]">Your account is protected</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">ProFast uses your sign-in provider to help keep your account secure.</p>
                    </section>
                </aside>
            </div>
        </main>
    );
};

export default Settings;
