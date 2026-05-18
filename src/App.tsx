import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShieldCheck, Zap, Users, Eye, TrendingUp, Settings, ClipboardCheck, Wallet, Globe, Rocket } from 'lucide-react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { SlideContent, type SlideData } from './components/SlideContent';
import { SplashScreen } from './components/SplashScreen';

const SLIDES: SlideData[] = [
    {
        subtitle: "Apertura | Visión 2026",
        title: "Consorcio \"El Espinillo\"",
        description: "Iniciamos un viaje desde la gestión informal hacia una administración de activos de clase mundial. Su edificio no es solo una vivienda; es su activo financiero más importante.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-city-skyline-at-night-with-bright-lights-34440-large.mp4",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000", 
        script: "Soy Diego Tirante. Hoy presento el Plan Espinillo: una reingeniería absoluta para transformar este edificio en un activo inmobiliario de vanguardia. Bienvenidos a la gestión del futuro."
    },
    {
        subtitle: "Auditoría de Realidad",
        title: "Diagnóstico de Activos",
        description: "Identificamos una brecha de 40 años frente a los estándares modernos de Córdoba. El edificio presenta una obsolescencia operativa que afecta directamente el precio del m2.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-at-sunset-13177-large.mp4",
        image: "https://images.unsplash.com/photo-1545324418-f1d3c5b53571?auto=format&fit=crop&w=2000",
        script: "El diagnóstico es claro: obsolescencia funcional crítica. Si no modernizamos la operativa hoy, el mercado inmobiliario seguirá castigando el valor de sus unidades frente a la competencia nueva.",
        list: [
            "Desgaste estructural de procesos administrativos.",
            "Infraestructura técnica al límite de su vida útil.",
            "Inexistencia de integración digital en servicios básicos."
        ]
    },
    {
        subtitle: "Integridad & Vigilancia",
        title: "Seguridad Inteligente 2.0",
        description: "Migramos de la vigilancia pasiva a la prevención proactiva. Implementación de control de acceso biométrico, tótems digitales y monitoreo cloud 24/7.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-digital-screen-with-futuristic-graphics-42722-large.mp4",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000",
        script: "La seguridad inteligente reduce costos de vigiladores físicos en un 40% mientras aumenta la efectividad real mediante tótems de monitoreo remoto y llaves digitales encriptadas.",
        stats: [
            { icon: ShieldCheck, label: "Reducción de Intrusión" },
            { icon: Eye, label: "Visibilidad 360°" },
            { icon: Globe, label: "Control Remoto" }
        ]
    },
    {
        subtitle: "Compromiso Ambiental",
        title: "Energía & Sustentabilidad",
        description: "Plan de eficiencia energética integral. Reemplazo LED total, sensores de movimiento y estudio de paneles solares para áreas comunes.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-bright-light-on-a-modern-white-staircase-42719-large.mp4",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb5485594?auto=format&fit=crop&w=2000",
        script: "Optimizar el consumo no es solo ecológico, es financiero. Proyectamos un ahorro del 35% en la factura eléctrica de áreas comunes mediante tecnología LED y automatización de flujo.",
        stats: [
            { icon: Zap, label: "Ahorro Energético" },
            { icon: TrendingUp, label: "Vida Útil LED" },
            { icon: Settings, label: "Automatización" }
        ]
    },
    {
        subtitle: "Logística Operativa",
        title: "Mantenimiento Técnico",
        description: "Pasamos del 'mantenimiento por rotura' al mantenimiento preventivo programado con certificación técnica mensual.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-working-on-an-electric-circuit-42720-large.mp4",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000",
        script: "Tercerizaremos servicios con empresas de primera línea, bajo contratos de cumplimiento de nivel de servicio (SLA). No más reparaciones improvisadas; soluciones de ingeniería definitivas.",
        list: [
            "Service certificado de elevadores 10/10.",
            "Limpieza técnica industrializada.",
            "Seguimiento cloud de incidencias edilicias."
        ]
    },
    {
        subtitle: "Ingeniería Financiera",
        title: "Optimización de Gastos",
        description: "Revisión profunda de los contratos de abonos fijos. Renegociación corporativa para reducir las expensas sin sacrificar calidad.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-business-charts-and-statistics-on-a-tablet-screen-42717-large.mp4",
        image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=2000",
        script: "Mi gestión se basa en la transparencia total. Cada peso invertido debe generar un retorno en confort o en valor de la propiedad. Eliminaremos los gastos hormiga que desangran el fondo de reserva.",
        stats: [
            { icon: Wallet, label: "Reducción Expensas" },
            { icon: ClipboardCheck, label: "Auditoría Mensual" },
            { icon: TrendingUp, label: "Fondo de Reserva" }
        ]
    },
    {
        subtitle: "Gobernanza Digital",
        title: "Transparencia 360°",
        description: "Portal vecinal exclusivo. Acceso a facturas, comprobantes, votaciones y reportes en tiempo real desde el celular.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-businessman-using-a-tablet-in-a-modern-office-42718-large.mp4",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000",
        script: "La era del papel terminó. En El Espinillo, cada vecino podrá auditar las cuentas del consorcio desde su móvil. Transparencia digital para una convivencia pacífica y profesional.",
        list: [
            "Expensas digitales en PDF.",
            "Chat directo de incidencias.",
            "Votaciones en línea para asambleas."
        ]
    },
    {
        subtitle: "Capital Appreciation",
        title: "Valorización del Activo",
        description: "La profesionalización de la gestión genera un aumento inmediato en el valor de reventa. Un edificio bien gestionado se vende más rápido y a mejor precio.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-architectural-shot-of-a-modern-building-with-glass-facade-42721-large.mp4",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000",
        script: "No estamos gastando, estamos invirtiendo. Un edificio con tecnología y gestión profesional cotiza un 15% por encima de sus similares en la zona. Protejamos su patrimonio.",
        stats: [
            { icon: TrendingUp, label: "Plusvalía Real" },
            { icon: Users, label: "Atractivo Inquilino" },
            { icon: Globe, label: "Reputación Edilicia" }
        ]
    },
    {
        subtitle: "Cronograma de Acción",
        title: "Los Primeros 90 Días",
        description: "Fase de estabilización y despliegue tecnológico inicial. Resultados tangibles desde el primer mes de gestión.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-busy-office-with-many-people-working-42716-large.mp4",
        image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=2000",
        script: "El cambio comienza hoy. Los primeros 90 días son críticos para tomar control de los activos, sanear las finanzas y establecer el nuevo estándar de seguridad inteligente.",
        list: [
            "Mes 1: Auditoría y Saneamiento.",
            "Mes 2: Despliegue de Seguridad Digital.",
            "Mes 3: Optimización Energética."
        ]
    },
    {
        subtitle: "Cuidado del Capital Humano",
        title: "Limpieza & Estética",
        description: "Protocolos de limpieza de hotelería 5 estrellas. El Espinillo debe lucir como un activo premium en cada rincón.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-a-modern-indoor-lobby-42724-large.mp4",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&w=2000",
        script: "La cara visible del edificio es su limpieza. Implementaremos brigadas técnicas y supervisión constante para asegurar que el hall y los palieres hablen bien de sus dueños.",
        stats: [
            { icon: Users, label: "Staff Capacitado" },
            { icon: Eye, label: "Estándar Visual" },
            { icon: ShieldCheck, label: "Higiene Certificada" }
        ]
    },
    {
        subtitle: "Resumen de Transformación",
        title: "El Nuevo Espinillo",
        description: "Un edificio inteligente, eficiente, seguro y patrimonialmente robusto. El futuro ya no es una promesa, es una ejecución.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-with-car-lights-passing-by-42715-large.mp4",
        image: "https://images.unsplash.com/photo-1497366754035-7c7036417951?auto=format&fit=crop&w=2000",
        script: "Profesionalismo, tecnología y transparencia. Esas son las banderas del Nuevo Espinillo bajo mi administración. Estamos listos para el siguiente nivel.",
        stats: [
            { icon: Rocket, label: "Futuro Activo" },
            { icon: Settings, label: "Gestión 360" },
            { icon: Wallet, label: "Solidez Fiscal" }
        ]
    },
    {
        subtitle: "Cierre & Compromiso",
        title: "Diego Tirante",
        description: "Especialista en administración de activos inmobiliarios complejos. Quedo a su disposición para iniciar esta transformación ahora mismo.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-handshake-between-two-businessmen-in-an-office-42723-large.mp4",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=2000",
        script: "Es momento de profesionalizar El Espinillo. Soy Diego Tirante y les ofrezco mi experiencia y compromiso total para liderar este cambio. Muchas gracias por su atención.",
        contact: {
            role: "Nuevo Administrador 'EL ESPINILLO'",
            email: "diegotirante@gmail.com",
            location: "Córdoba, Argentina | Universidad Siglo 21"
        }
    }
];

export default function App() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showSplash, setShowSplash] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (showSplash) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                prevSlide();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, showSplash]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative selection:bg-electric/30 selection:text-white overflow-hidden">
            <AnimatePresence>
                {showSplash && (
                    <SplashScreen onEnter={() => setShowSplash(false)} />
                )}
            </AnimatePresence>

            <BackgroundVideo src={SLIDES[currentSlideIndex].video} />

            <main className="glass-card w-full max-w-6xl p-8 md:p-20 z-10 transition-all duration-700 overflow-hidden min-h-[600px] flex items-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <SlideContent 
                    slide={SLIDES[currentSlideIndex]} 
                    index={currentSlideIndex} 
                />
            </main>

            {/* Navigation Bar */}
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-navy/80 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-full flex items-center gap-10 md:gap-16 z-20 transition-all hover:bg-navy/95 hover:border-electric/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
                <button 
                    id="prevBtn" 
                    onClick={prevSlide}
                    disabled={currentSlideIndex === 0}
                    className="text-white/30 hover:text-electric disabled:opacity-5 disabled:cursor-not-allowed transition-all hover:scale-125 active:scale-90"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={36} strokeWidth={1.5} />
                </button>
                
                <div className="flex gap-3 items-center">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlideIndex(i)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                i === currentSlideIndex 
                                ? 'w-10 bg-electric shadow-[0_0_15px_rgba(26,83,255,0.8)]' 
                                : 'w-2 bg-white/10 hover:bg-white/30'
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <button 
                    id="nextBtn" 
                    onClick={nextSlide}
                    disabled={currentSlideIndex === SLIDES.length - 1}
                    className="text-white/30 hover:text-electric disabled:opacity-5 disabled:cursor-not-allowed transition-all hover:scale-125 active:scale-90"
                    aria-label="Next slide"
                >
                    <ChevronRight size={36} strokeWidth={1.5} />
                </button>
            </nav>

            <header className="fixed top-8 left-8 md:top-12 md:left-12 z-30 pointer-events-none">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="flex flex-col gap-1"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-[3px] h-8 bg-electric" />
                        <span className="text-white font-display text-2xl md:text-3xl font-black tracking-tighter uppercase">Diego Tirante</span>
                    </div>
                    <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-[0.6em] text-white/40 pl-4">Nuevo administrador "EL ESPINILLO"</span>
                </motion.div>
            </header>

            <div className="fixed top-8 md:top-12 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-navy/40 border border-white/5 backdrop-blur-xl text-[10px] md:text-xs uppercase font-black tracking-[0.4em] text-white/60 z-20 shadow-xl flex items-center gap-4">
                <span className="opacity-30">Status</span>
                <span className="text-electric font-black">{currentSlideIndex + 1}</span>
                <span className="opacity-10">|</span>
                <span className="opacity-40">{SLIDES.length}</span>
            </div>

            <footer className="fixed bottom-6 right-10 text-[10px] uppercase font-bold tracking-[0.3em] text-white/20 pointer-events-none hidden lg:block">
                Diego Tirante • Nuevo Administrador "EL ESPINILLO" • Córdoba 2026
            </footer>
        </div>
    );
}

