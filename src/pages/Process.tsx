import React from 'react';
import { motion } from 'motion/react';
import { MousePointer2, Layers, Sparkles, Code2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const detailedSteps = [
  {
    step: "01",
    title: "Descoberta e Estratégia",
    description: "Tudo começa com uma conversa profunda. Queremos entender não apenas o que tu queres construir, mas porquê. Analisamos o teu mercado, competidores e público-alvo para definir um roteiro estratégico claro.",
    details: [
      "Workshops de definição de objetivos",
      "Análise de mercado e concorrência",
      "Definição de Personas e User Stories",
      "Arquitetura de Informação inicial"
    ],
    icon: MousePointer2,
    color: "blue"
  },
  {
    step: "02",
    title: "Planeamento",
    description: "Criamos a estrutura lógica do teu website. Focamo-nos na jornada do utilizador para garantir que a navegação seja intuitiva e que cada elemento tenha um propósito claro na conversão.",
    details: [
      "Wireframes de baixa fidelidade",
      "Fluxogramas de utilizador",
      "Prototipagem interativa",
      "Testes de usabilidade iniciais"
    ],
    icon: Layers,
    color: "purple"
  },
  {
    step: "03",
    title: "Design Visual",
    description: "Materializamos a estratégia através de uma estética refinada e intencional, moldada às tuas preferências e aos objetivos traçados. Após a validação total do protótipo e garantindo a tua plena satisfação, transitamos com segurança para a fase de engenharia e lançamento.",
    details: [
      "Design System personalizado",
      "Interfaces de alta fidelidade",
      "Aprovação do Protótipo Final",
      "Micro-interações e animações"
    ],
    icon: Sparkles,
    color: "emerald"
  },
  {
    step: "04",
    title: "Desenvolvimento e Lançamento",
    description: "Transformamos o design em código limpo, rápido e seguro. Utilizamos IA e as tecnologias mais avançadas para otimizar a performance e garantir que o teu site esteja sempre à frente.",
    details: [
      "Desenvolvimento Frontend otimizado",
      "Integração de CMS (Content Management)",
      "SEO técnico e performance",
      "Lançamento e Monitorização"
    ],
    icon: Code2,
    color: "orange"
  }
];

const ProcessPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-brand-gray mb-4"
          >
            // METODOLOGIA ZIVOX
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
          >
            Como Transformamos <br />
            Visão em Realidade
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-gray text-xl max-w-2xl leading-relaxed"
          >
            O nosso processo é rigoroso, transparente e focado em resultados. Combinamos criatividade com engenharia de precisão em cada etapa do caminho.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {detailedSteps.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass p-10 md:p-16 rounded-[3rem] hover:border-white/20 transition-all duration-500 flex flex-col items-start"
            >
              <div className="w-full flex justify-between items-start mb-12">
                <div className="text-sm font-mono text-brand-gray uppercase tracking-widest">PASSO {item.step}</div>
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                  <item.icon className="w-8 h-8 text-white group-hover:text-blue-400 transition-colors" />
                  <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-blue-500/50 transition-colors" />
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">{item.title}</h2>
              <p className="text-brand-gray text-lg leading-relaxed mb-10 max-w-xl">
                {item.description}
              </p>

              <div className="w-full h-px bg-white/10 mb-10" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {item.details.map(detail => (
                  <div key={detail} className="flex items-center gap-3 text-sm text-brand-gray group-hover:text-white transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter relative z-10">Pronto para a primeira etapa?</h2>
          <p className="text-brand-gray mb-12 max-w-xl mx-auto relative z-10">
            O sucesso do teu projeto começa com uma conversa. Vamos definir a estratégia certa para o teu negócio.
          </p>
          <Link to="/#contacto" className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
            Entrar em Contacto <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
