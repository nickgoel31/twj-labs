"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { SparkleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { whiteLabelingSubmit } from "@/actions/white-labeling-submit";
import { services } from "@/data/services";

const WhiteLabelingForm = ({ className }: { className?: string }) => {
    const t = useTranslations('WhiteLabeling.Form');
    
    // Flatten services list for quick selection
    const allServices = [...services[0].servicesList, ...services[1].servicesList];

    const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
    const [formData, setFormData] = React.useState({
        agencyName: "",
        website: "",
        email: "",
        volume: "",
        details: ""
    });
    const [submitted, setSubmitted] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await whiteLabelingSubmit({
                ...formData,
                services: selectedServices
            });
            if (res?.success) {
                setSubmitted(true);
            }
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className={cn("flex flex-col items-center justify-center text-white text-center py-20 px-6", className)}>
                <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <SparkleIcon size={24} className="text-indigo-400 fill-indigo-400" />
                </div>
                <h1 className="text-2xl font-bold mb-2">{t('success.title')}</h1>
                <p className="text-slate-400 text-sm max-w-xs mb-6 leading-relaxed">
                    {t('success.description')}
                </p>
                <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all font-semibold text-xs"
                >
                    {t('success.button')}
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn("w-full space-y-6 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative z-10", className)}>
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('title')}</h3>
                <p className="text-sm text-slate-400">{t('description')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="agencyName" className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('labels.agencyName')}</label>
                    <input
                        type="text"
                        id="agencyName"
                        value={formData.agencyName}
                        onChange={handleChange}
                        className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20"
                        placeholder={t('placeholders.agencyName')}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="website" className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('labels.website')}</label>
                    <input
                        type="url"
                        id="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20"
                        placeholder={t('placeholders.website')}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('labels.email')}</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20"
                        placeholder={t('placeholders.email')}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="volume" className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('labels.volume')}</label>
                    <input
                        type="text"
                        id="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20"
                        placeholder={t('placeholders.volume')}
                    />
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('labels.services')}</label>
                <div className="flex flex-wrap gap-2">
                    {allServices.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                                setSelectedServices((prev) =>
                                    prev.includes(service.name)
                                        ? prev.filter((s) => s !== service.name)
                                        : [...prev, service.name]
                                );
                            }}
                            className={cn(
                                "text-xs px-4 py-2 rounded-lg border transition-all duration-300 font-medium",
                                selectedServices.includes(service.name)
                                    ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                                    : "bg-[#13131a] border-white/5 text-slate-400 hover:border-white/20 hover:text-white"
                            )}
                        >
                            {service.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-slate-500">{t('labels.details')}</label>
                <textarea
                    id="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full bg-[#13131a] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-white/20 min-h-[120px] resize-none"
                    placeholder={t('placeholders.details')}
                    required
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300",
                        loading && "opacity-70 cursor-not-allowed scale-100"
                    )}
                >
                    {loading ? "Sending..." : t('button')}
                </button>
            </div>
        </form>
    );
};

export default WhiteLabelingForm;
