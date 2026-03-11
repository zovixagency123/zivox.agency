/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Layout, 
  Zap, 
  Github, 
  Twitter, 
  Linkedin,
  ChevronRight,
  ChevronDown,
  MousePointer2,
  Sparkles,
  X,
  ArrowRight
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import PortfolioPage from "./pages/Portfolio";
import ProcessPage from "./pages/Process";
import AboutPage from "./pages/About";

// --- Components ---

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);
  
  return null;
};

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft animated gradient */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-drift" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] animate-drift" style={{ animationDelay: '-5s' }} />
      
      {/* Grid shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Light field / beam texture */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-beam" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-beam" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-beam" style={{ animationDelay: '-6s' }} />
      </div>

      {/* Particle drift */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, "-20px", "0px"],
              opacity: [null, 0.8, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ onStartProject }: { onStartProject: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4 glass" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center overflow-hidden relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-black font-bold text-xl relative z-10 group-hover:text-white transition-colors">Z</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">ZIVOX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-gray">
          {[
            { name: "Início", path: "/" },
            { name: "Sobre", path: "/sobre" },
            { name: "Portfólio", path: "/portfolio" },
            { name: "Processo", path: "/processo" },
            { name: "Contacto", path: "/#contacto" }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="hover:text-white transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <button 
          onClick={onStartProject}
          className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
        >
          Iniciar Projeto
        </button>
      </div>
    </motion.nav>
  );
};

const Hero = ({ onStartProject }: { onStartProject: () => void }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  return (
    <section 
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Slow parallax abstract shapes */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        style={{ x: useTransform(mouseX, v => -v), y: useTransform(mouseY, v => -v) }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-brand-gray mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          DISPONÍVEL PARA NOVOS PROJETOS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-gradient leading-[1.1]"
        >
          Engenharia de <br />
          Excelência Digital
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A Zivox é uma agência web premium especializada na <span className="text-white font-medium">construção de websites</span> e soluções digitais de alta performance para todo o tipo de negócios, desde startups a marcas globais.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={onStartProject}
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              Vamos Começar <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <Link to="/processo" className="group px-8 py-4 bg-transparent border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-all flex items-center gap-2">
            O Nosso Processo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Hero Image/Graphic Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="mt-24 w-full max-w-5xl aspect-video rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1 relative group"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02] rounded-2xl" />
        <div className="w-full h-full rounded-xl bg-brand-black overflow-hidden relative">
          {/* Simulated UI or Abstract Motion */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
             <motion.div 
               animate={{ 
                 rotate: 360,
                 scale: [1, 1.1, 1]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-1/2 aspect-square border border-white/5 rounded-full flex items-center justify-center"
             >
               <div className="w-3/4 aspect-square border border-white/10 rounded-full flex items-center justify-center">
                 <div className="w-1/2 aspect-square border border-white/20 rounded-full" />
               </div>
             </motion.div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 glass p-4 rounded-lg flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-mono text-brand-gray">PERFORMANCE</div>
              <div className="text-sm font-bold">99/100</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-10 glass p-4 rounded-lg flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded bg-purple-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-xs font-mono text-brand-gray">ESTRUTURA</div>
              <div className="text-sm font-bold">Otimizada</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Desenvolvimento Web",
      description: "Websites de alta performance construídos com Next.js, React e princípios modernos de engenharia.",
      icon: Code2,
      color: "blue"
    },
    {
      title: "Design & IA",
      description: "Interfaces inteligentes que utilizam IA para otimizar a experiência do utilizador e garantir que estás sempre um passo à frente dos teus concorrentes.",
      icon: Layout,
      color: "purple"
    },
    {
      title: "Estratégia & IA",
      description: "Roteiros baseados em dados e IA para otimizar o teu negócio e garantir que dominas o panorama digital.",
      icon: Cpu,
      color: "emerald"
    },
    {
      title: "Escalabilidade Global",
      description: "Infraestrutura desenhada para alcance mundial, garantindo velocidade e fiabilidade em qualquer lugar.",
      icon: Globe,
      color: "orange"
    }
  ];

  return (
    <section id="portfolio" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-mono text-brand-gray mb-4"
            >
              01 // CAPACIDADES CORE
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tighter"
            >
              Construímos websites <br />
              para a internet moderna.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gray max-w-md"
          >
            A nossa abordagem combina precisão estética com rigor técnico para entregar 
            produtos digitais sem paralelo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1,
                y: { type: "spring", stiffness: 300, damping: 20 } 
              }}
              whileHover={{ y: -12 }}
              className="group glass p-8 rounded-2xl hover:border-white/20 transition-colors cursor-default"
            >
              <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className={`w-6 h-6 text-white group-hover:animate-pulse`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      step: "Passo 1",
      title: "Descoberta e Estratégia",
      description: "Mergulhamos na essência da tua marca para entender os teus objetivos e o teu público-alvo.",
      icon: MousePointer2
    },
    {
      step: "Passo 2",
      title: "Planeamento",
      description: "Definimos a arquitetura e a estratégia técnica para garantir uma base sólida e escalável.",
      icon: Layers
    },
    {
      step: "Passo 3",
      title: "Design Visual",
      description: "Criamos interfaces minimalistas e intencionais que elevam a percepção da tua marca.",
      icon: Sparkles
    },
    {
      step: "Passo 4",
      title: "Desenvolvimento e Lançamento",
      description: "Transformamos o design em código de alta performance pronto para o mercado.",
      icon: Code2
    }
  ];

  return (
    <section id="processo" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-mono text-brand-gray mb-4"
          >
            02 // O NOSSO PROCESSO
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-8"
          >
            O Nosso Processo
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to="/processo" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all group"
            >
              Ver Detalhes do Processo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1,
                y: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileHover={{ y: -12 }}
              className="group glass p-8 rounded-2xl hover:border-white/20 transition-colors cursor-default flex flex-col items-center text-center"
            >
              <div className="text-[10px] font-mono text-brand-gray mb-8 uppercase tracking-widest">{item.step}</div>
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 relative">
                <item.icon className="w-10 h-10 text-white group-hover:text-blue-400 transition-colors" />
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-8"
            >
              SOBRE <br /> NÓS
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-sm font-mono text-brand-gray uppercase tracking-widest">
                Arquitetura Digital e Engenharia de Software
              </p>
              <p className="text-brand-gray leading-relaxed max-w-sm">
                Soluções Versáteis: Criamos desde plataformas e-commerce robustas a websites institucionais de alta conversão.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <Link 
                  to="/sobre" 
                  className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all group"
                >
                  Descubra Mais <ArrowRight className="w-5 h-5 group-hover:text-blue-400" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img 
                src="https://picsum.photos/seed/zivox-office/800/1000" 
                alt="Zivox Office" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="lg:col-span-3 pt-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl"
            >
              <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-white/10">
                <img 
                  src="https://picsum.photos/seed/philosophy/600/400" 
                  alt="Philosophy" 
                  className="w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4">A Nossa Filosofia</h3>
              <p className="text-sm text-brand-gray leading-relaxed">
                Na Zivox, acreditamos que a confiança é a base de tudo. Como uma agência familiar, trazemos valores de proximidade e dedicação para cada projeto, criando experiências digitais que fortalecem a presença online de quem confia em nós.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
          
          <div className="text-center mb-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-8 py-4 bg-white text-black rounded-2xl font-bold text-2xl md:text-4xl tracking-tighter mb-4"
            >
              CONHEÇA OS FUNDADORES
            </motion.div>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-12 h-4 rounded-full bg-white/10" />
              <div className="w-12 h-4 rounded-full bg-white/10" />
              <div className="w-12 h-4 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src="https://picsum.photos/seed/afonso/600/800" 
                  alt="Afonso Lopes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-3xl font-bold tracking-tighter mb-1">Afonso Lopes</h4>
              <p className="text-sm font-mono text-brand-gray uppercase tracking-widest">Cofundador | Irmão</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-8 border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src="https://picsum.photos/seed/joao/600/800" 
                  alt="João Lopes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-3xl font-bold tracking-tighter mb-1">João Lopes</h4>
              <p className="text-sm font-mono text-brand-gray uppercase tracking-widest">Cofundador | Irmão</p>
            </motion.div>
          </div>

          <div className="mt-20 text-center max-w-2xl mx-auto text-brand-gray text-sm leading-relaxed relative z-10">
            Mais do que sócios, somos irmãos com uma visão partilhada. Na Zivox, combinamos a nossa ligação pessoal com uma paixão comum pelo design e tecnologia para criar soluções digitais que realmente fazem a diferença na vida dos nossos clientes.
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ onContact }: { onContact: () => void }) => {
  const faqs = [
    {
      question: "Quanto tempo demora a construção de um website?",
      answer: "Graças à nossa equipa e esforço, é possível ter agora o teu site em menos de 3 dias. No entanto, projetos mais complexos podem exigir mais tempo para garantir a excelência em cada detalhe."
    },
    {
      question: "Quais as tecnologias que utilizam?",
      answer: "Utilizamos as tecnologias mais modernas do mercado, como Next.js, React, TypeScript e Tailwind CSS, garantindo performance, segurança e escalabilidade."
    },
    {
      question: "Oferecem manutenção após o lançamento?",
      answer: "Não oferecemos manutenção, mas se o site precisar de algum ajuste ou alteração, com um custo de 10 euros fazemos as alterações necessárias para garantir que tudo esteja ao teu gosto."
    },
    {
      question: "O website será otimizado para SEO?",
      answer: "Absolutamente. Todos os nossos projetos seguem as melhores práticas de SEO técnico desde a primeira linha de código, garantindo visibilidade nos motores de busca."
    },
    {
      question: "Como funciona o processo de pagamento?",
      answer: "O pagamento é feito através de um único pagamento após confirmares que está tudo bem feito e ao teu gosto. Depois de concluído o processo de pagamento, lançamos o site oficialmente."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">FAQ</h2>
          <p className="text-brand-gray text-lg mb-8">Tens perguntas? Nós temos as respostas.</p>
          <button 
            onClick={onContact}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95"
          >
            Contacta-nos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-7 flex items-center justify-between text-left transition-colors"
              >
                <span className="font-bold text-lg md:text-xl tracking-tight">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-brand-gray transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 text-brand-gray leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormState({ name: "", email: "", message: "" });
      }, 2000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Ocorreu um erro ao enviar o email. Por favor, tenta novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-gray hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tighter">Email enviado com sucesso</h3>
                <p className="text-brand-gray">Entraremos em contacto em breve.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-4xl font-bold mb-2 tracking-tighter">Vamos Começar</h3>
                <p className="text-brand-gray mb-8">Conta-nos sobre o teu projeto visionário.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-mono text-brand-gray uppercase tracking-widest mb-2">Nome</label>
                    <input 
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                      placeholder="O teu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-gray uppercase tracking-widest mb-2">Email</label>
                    <input 
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-gray uppercase tracking-widest mb-2">Mensagem</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
                    {!isSubmitting && <ArrowUpRight className="w-5 h-5" />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Stats = () => {
  const stats = [
    { label: "Projetos Entregues", value: "30+" },
    { label: "Satisfação do Cliente", value: "99%" },
    { label: "Performance Média", value: "98/100" },
    { label: "Anos de Excelência", value: "3" }
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{stat.value}</div>
              <div className="text-xs font-mono text-brand-gray uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onStartProject }: { onStartProject: () => void }) => {
  return (
    <section id="contacto" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-8"
        >
          Pronto para construir <br />
          algo grandioso?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-brand-gray text-lg mb-12 max-w-xl mx-auto"
        >
          Vamos colaborar para criar uma experiência digital que destaque a tua marca. 
          A nossa equipa está pronta para transformar a tua visão em realidade.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={onStartProject}
            className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Entrar em Contacto</span>
            {/* Button hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-white to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity animate-beam" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-white rounded-sm" />
              <span className="font-display font-bold text-lg tracking-tighter">ZIVOX</span>
            </div>
            <p className="text-brand-gray max-w-sm mb-8">
              Uma agência de design e engenharia web dedicada a criar plataformas digitais de alta performance. Combinamos estética apurada, tecnologia de ponta e estratégias focadas em resultados para impulsionar o crescimento do seu negócio.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-white/50">Plataforma</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfólio</Link></li>
              <li><Link to="/processo" className="hover:text-white transition-colors">Processo</Link></li>
              <li><Link to="/#contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-white/50">Legal</h4>
            <ul className="space-y-4 text-sm text-brand-gray">
              <li><Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="hover:text-white transition-colors">Termos de Serviço</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-xs font-mono text-brand-gray">
          <div>© 2024 ZIVOX AGENCY. TODOS OS DIREITOS RESERVADOS.</div>
          <div className="mt-4 md:mt-0 flex items-center gap-6">
            <span>DESENHADO EM LISBOA</span>
            <span className="flex items-center gap-1">
              <MousePointer2 className="w-3 h-3" /> CURSOR INTERATIVO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LegalPage = ({ title, content }: { title: string, content: string }) => {
  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-12"
        >
          {title}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-invert max-w-none text-brand-gray leading-relaxed space-y-6"
        >
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

// --- Main App ---

const HomePage = ({ onStartProject }: { onStartProject: () => void }) => {
  return (
    <main>
      <Hero onStartProject={onStartProject} />
      
      {/* Section Transition Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Services />
      <Process />
      
      <About />
      <Stats />

      {/* Grid Shimmer Section - Sinta a diferença */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] animate-shimmer" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="glass p-12 md:p-20 rounded-3xl flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <Sparkles className="w-10 h-10 text-blue-400 mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                Sinta a <br />
                diferença Zivox.
              </h2>
              <p className="text-brand-gray mb-8">
                Não construímos apenas websites; projetamos plataformas digitais que 
                impulsionam o crescimento e definem indústrias.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Next.js", "TypeScript", "Tailwind", "Motion", "Vercel"].map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-brand-gray">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-2 border-dashed border-white/20 rounded-full"
                />
                <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-black" />
                </div>
              </div>
              {/* Border Beam Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-beam" />
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-beam" style={{ animationDelay: '-4s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ onContact={onStartProject} />
      
      <CTA onStartProject={onStartProject} />
    </main>
  );
};

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative">
        {/* Custom Cursor Proximity Effect */}
        <motion.div 
          className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-[9999] hidden md:block"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: isInputFocused ? 0 : 1, scale: isInputFocused ? 0.5 : 1 }}
        />
        <motion.div 
          className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: isInputFocused ? 0 : 1 }}
        />

        <Background />
        <Navbar onStartProject={() => setIsContactOpen(true)} />
        
        <Routes>
          <Route path="/" element={<HomePage onStartProject={() => setIsContactOpen(true)} />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/processo" element={<ProcessPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/privacidade" element={<LegalPage title="Política de Privacidade" content="A ZIVOX AGENCY valoriza a tua privacidade. Esta política descreve como recolhemos e utilizamos os teus dados.\n\nRecolhemos apenas as informações necessárias para prestar os nossos serviços e comunicar contigo de forma eficaz. Nunca partilhamos os teus dados com terceiros sem o teu consentimento explícito.\n\nUtilizamos cookies para melhorar a tua experiência no nosso website e analisar o tráfego de forma anónima." />} />
          <Route path="/termos" element={<LegalPage title="Termos de Serviço" content="Ao utilizar os serviços da ZIVOX AGENCY, concordas com os seguintes termos e condições.\n\nTodos os designs e códigos produzidos pela nossa agência estão protegidos por direitos de autor até que o pagamento final seja efetuado, momento em que a propriedade é transferida para o cliente.\n\nReservamo-nos o direito de recusar projetos que não estejam alinhados com os nossos valores éticos ou padrões de qualidade." />} />
          <Route path="/cookies" element={<LegalPage title="Política de Cookies" content="Utilizamos cookies para garantir que o nosso website funciona corretamente e para entender como os utilizadores interagem com o nosso conteúdo.\n\nOs cookies são pequenos ficheiros de texto armazenados no teu dispositivo. Podes optar por desativar os cookies nas definições do teu navegador, embora isso possa afetar algumas funcionalidades do site.\n\nContinuar a navegar no nosso site implica a aceitação da nossa utilização de cookies." />} />
        </Routes>

        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
