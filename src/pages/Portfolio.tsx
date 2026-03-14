import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "La Rosa Negra",
    category: "Restaurante / Gastronomia",
    description: "Website elegante para um restaurante de prestígio, com foco na experiência gastronómica e reserva online.",
    image: "https://picsum.photos/seed/larosanegra/1200/800",
    tags: ["React", "Motion", "Tailwind"],
    link: "https://larosanegra-site.vercel.app/"
  },
  {
    title: "Brincar e Cuidar",
    category: "Serviços / Babysitting",
    description: "Plataforma de serviços de babysitting e cuidados infantis, focada na confiança e segurança das famílias.",
    image: "https://picsum.photos/seed/brincarecuidar/1200/800",
    tags: ["React", "Tailwind", "Vite"],
    link: "https://brincarecuidar.netlify.app/"
  },
  {
    title: "SaaS Analytics",
    category: "Dashboard / B2B",
    description: "Painel de controlo para análise de dados em tempo real com visualizações complexas.",
    image: "https://picsum.photos/seed/project3/1200/800",
    tags: ["D3.js", "TypeScript", "Firebase"],
    link: "#"
  },
  {
    title: "Agência Criativa",
    category: "Website Institucional",
    description: "Site de portfólio com animações fluidas e foco em storytelling visual.",
    image: "https://picsum.photos/seed/project4/1200/800",
    tags: ["Motion", "Vite", "Tailwind"],
    link: "#"
  }
];

const PortfolioPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-brand-gray mb-4"
          >
            // O NOSSO TRABALHO
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
          >
            Portfólio de <br />
            Projetos Selecionados
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-gray text-xl max-w-2xl leading-relaxed"
          >
            Explora a nossa galeria de soluções digitais. Cada projeto é uma prova do nosso compromisso com a performance, design e inovação.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-white/5 mb-8 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                  <a href={project.link} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-brand-gray uppercase tracking-widest mb-2">{project.category}</div>
                  <h3 className="text-3xl font-bold tracking-tighter mb-4">{project.title}</h3>
                  <p className="text-brand-gray text-sm max-w-md mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-brand-gray">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Link to={project.link} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-6 h-6" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-8 tracking-tighter">Tens um projeto em mente?</h2>
          <Link to="/#contacto" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
            Entrar em Contacto <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
