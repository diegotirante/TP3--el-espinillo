import { motion } from 'motion/react';

interface SplashScreenProps {
    onEnter: () => void;
}

export const SplashScreen = ({ onEnter }: SplashScreenProps) => {
    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] animated-bg flex items-center justify-center p-6"
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="intro-blur w-full max-w-2xl p-12 rounded-[2.5rem] text-center space-y-8 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-electric/20 rounded-full blur-[80px]" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold-accent/20 rounded-full blur-[80px]" />

                <div className="space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white font-display text-4xl md:text-5xl font-black uppercase tracking-tighter"
                    >
                        TP N°3 - DIEGO TIRANTE
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-gold-accent md:text-electric font-display text-sm md:text-base font-bold uppercase tracking-[0.4em]"
                    >
                        PLAN DE TRANSFORMACIÓN ESTRATÉGICA | CONSORCIO EL ESPINILLO
                    </motion.p>
                </div>

                <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnter}
                    className="glow-btn bg-electric text-white px-10 py-5 rounded-full font-display font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all relative group overflow-hidden"
                >
                    <span className="relative z-10">INGRESAR A LA PROPUESTA</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
