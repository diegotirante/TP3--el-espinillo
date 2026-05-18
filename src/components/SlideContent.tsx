import { motion, AnimatePresence } from 'motion/react';
import { Mic, ShieldCheck, Zap, Users, Mail, MapPin, Eye, TrendingUp, Settings, ClipboardCheck, Wallet, Globe } from 'lucide-react';

export interface SlideData {
    subtitle?: string;
    title: string;
    description: string;
    video: string;
    image: string;
    script: string;
    list?: string[];
    stats?: Array<{ icon: any; label: string }>;
    contact?: {
        email: string;
        location: string;
        role: string;
    };
}

interface SlideContentProps {
    slide: SlideData;
    index: number;
}

export const SlideContent = ({ slide }: SlideContentProps) => {
    const handleSpeak = () => {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(slide.script);
        utterance.lang = 'es-AR'; 
        utterance.rate = 0.95; 
        utterance.pitch = 0.9; // Lower pitch for deeper, professional masculine tone

        const getBestVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            
            // Priority list for professional male voices
            const filters = [
                (v: SpeechSynthesisVoice) => v.lang.includes('es') && (v.name.includes('Tomás') || v.name.includes('Male') || v.name.includes('Google español') || v.name.includes('Dario')),
                (v: SpeechSynthesisVoice) => v.lang.includes('es') && !v.name.toLowerCase().includes('female') && !v.name.toLowerCase().includes('zira') && !v.name.toLowerCase().includes('sabina') && !v.name.toLowerCase().includes('helena'),
                (v: SpeechSynthesisVoice) => v.lang.startsWith('es')
            ];

            for (const filter of filters) {
                const voice = voices.find(filter);
                if (voice) return voice;
            }
            return null;
        };

        const setVoiceAndSpeak = () => {
            const voice = getBestVoice();
            if (voice) utterance.voice = voice;
            window.speechSynthesis.speak(utterance);
        };

        // Voices might not be loaded initially
        if (window.speechSynthesis.getVoices().length > 0) {
            setVoiceAndSpeak();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                setVoiceAndSpeak();
                window.speechSynthesis.onvoiceschanged = null;
            };
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={slide.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full flex flex-col lg:flex-row gap-12 items-center"
            >
                {/* Left Side: Content */}
                <div className="flex-1 space-y-6">
                    {slide.subtitle && (
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-electric uppercase tracking-[0.5em] text-[9px] md:text-xs font-black mb-2 block"
                        >
                            {slide.subtitle}
                        </motion.span>
                    )}
                    
                    <h1 className="font-display font-black leading-[0.95] text-navy text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tighter">
                        {slide.title}
                    </h1>
                    
                    {slide.contact && (
                        <p className="text-electric font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
                            {slide.contact.role}
                        </p>
                    )}

                    <div className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                        {slide.description}
                    </div>

                    {slide.list && (
                        <motion.ul 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 text-slate-500 text-base md:text-lg border-l-[3px] border-electric/20 pl-8 py-2"
                        >
                            {slide.list.map((item, i) => (
                                <li key={i} className="flex items-center gap-4 group cursor-default">
                                    <div className="w-1.5 h-1.5 bg-electric rounded-full transition-all group-hover:scale-150 group-hover:shadow-[0_0_8px_rgba(26,83,255,0.6)]" />
                                    <span className="group-hover:text-navy transition-colors">{item}</span>
                                </li>
                            ))}
                        </motion.ul>
                    )}

                    {slide.contact && (
                        <div className="pt-8 space-y-5">
                            <div className="flex items-center gap-5 text-slate-600 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-electric/5 flex items-center justify-center border border-electric/10 group-hover:bg-electric group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Mail size={22} />
                                </div>
                                <span className="font-bold text-lg group-hover:text-electric transition-colors">{slide.contact.email}</span>
                            </div>
                            <div className="flex items-center gap-5 text-slate-600 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl bg-electric/5 flex items-center justify-center border border-electric/10 group-hover:bg-electric group-hover:text-white transition-all duration-500 shadow-sm">
                                    <MapPin size={22} />
                                </div>
                                <span className="font-bold text-lg group-hover:text-electric transition-colors">{slide.contact.location}</span>
                            </div>
                        </div>
                    )}

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="pt-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center cursor-pointer group"
                        onClick={handleSpeak}
                    >
                        <div className="relative">
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-electric/20 rounded-full blur-xl"
                            />
                            <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-electric transition-all shadow-[0_10px_30px_rgba(10,31,68,0.3)] group-hover:shadow-electric/40 relative z-10">
                                <Mic className="text-white" size={28} fill="currentColor" />
                            </div>
                        </div>
                        <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm flex-1 group-hover:border-electric/20 transition-all">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black text-electric/70 mb-2">Escuchar Guion Oficial</p>
                            <p className="italic text-slate-500 text-base md:text-lg leading-relaxed line-clamp-2 font-medium">
                                "{slide.script}"
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Visuals */}
                <div className="w-full lg:w-[45%] flex flex-col gap-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[6px] border-white"
                    >
                        <img 
                            src={slide.image} 
                            alt={slide.title} 
                            className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
                    </motion.div>

                    {slide.stats && (
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.5
                                    }
                                }
                            }}
                            className="grid grid-cols-3 gap-4"
                        >
                            {slide.stats.map((stat, i) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div 
                                        key={i} 
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        whileHover={{ 
                                            y: -8, 
                                            scale: 1.05, 
                                            boxShadow: "0 25px 30px -10px rgba(0, 0, 0, 0.1)" 
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 400, 
                                            damping: 20 
                                        }}
                                        className="bg-white/60 p-5 rounded-[2rem] border border-white/80 text-center shadow-sm cursor-default hover:bg-white hover:border-electric/10 transition-colors group"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.2, rotate: 10 }}
                                        >
                                            <Icon className="text-electric mx-auto mb-3" size={26} />
                                        </motion.div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-electric transition-colors">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
