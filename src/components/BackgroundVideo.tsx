import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BackgroundVideoProps {
    src: string;
}

export const BackgroundVideo = ({ src }: BackgroundVideoProps) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (src !== currentSrc) {
            setIsTransitioning(true);
            const timer = setTimeout(() => {
                setCurrentSrc(src);
                setIsTransitioning(false);
            }, 400); // Small delay for the fade effect
            return () => clearTimeout(timer);
        }
    }, [src, currentSrc]);

    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-navy overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSrc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransitioning ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover brightness-50 saturate-50 opacity-40 grayscale-[20%]"
                        src={currentSrc}
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-transparent to-navy/80 pointer-events-none" />
        </div>
    );
};
