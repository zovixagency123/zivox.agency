import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Zap, Shield, ArrowRight, Globe, Cpu, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Target,
    title: "Foco no Resultado",
    description: "Não criamos apenas designs bonitos; construímos ferramentas de negócio que geram conversões reais e crescimento sustentável."
  },
  {
    icon: Users,
    title: "Parceria Próxima",
    description: "Trabalhamos como uma extensão da tua equipa, garantindo transparência total e alinhamento estratégico em cada decisão."
  },
  {
    icon: Zap,
    title: "Inovação com IA",
    description: "Utilizamos inteligência artificial e as tecnologias mais recentes para otimizar processos e garantir que estás sempre à frente do mercado."
  },
  {
    icon: Shield,
    title: "Qualidade Sem Compromisso",
    description: "Cada linha de código e cada pixel é revisto para garantir que o produto final exceda os padrões mais exigentes do mercado."
  }
];

const stats = [
  { label: "Anos de Experiência", value: "3+" },
  { label: "Projetos Entregues", value: "30+" },
  { label: "Taxa de Retenção", value: "95%" },
  { label: "Países Atendidos", value: "12" }
];

const AboutPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-brand-gray mb-4"
          >
            // SOBRE NÓS
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-8"
          >
            Elevamos Marcas <br />
            Através da Tecnologia
          </motion.h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-gray text-xl leading-relaxed"
            >
              A Zivox nasceu da vontade de simplificar o complexo. Somos um estúdio de design e tecnologia focado em criar experiências digitais que não só impressionam visualmente, mas que funcionam perfeitamente como motores de crescimento para os nossos clientes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-8"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="border-l border-white/10 pl-6">
                  <div className="text-4xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-brand-gray font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Como Tudo Começou</h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              A Zivox não nasceu numa sala de reuniões corporativa, mas sim da visão partilhada de dois irmãos, Afonso e João Lopes. Movidos por uma paixão comum pelo design e pela engenharia de software, percebemos que o mercado precisava de uma abordagem mais autêntica e focada no cliente.
            </p>
            <p className="text-brand-gray text-lg leading-relaxed">
              Combinando as nossas valências — a precisão técnica e o olhar estético —, decidimos criar uma agência que refletisse os nossos valores familiares: confiança, dedicação e excelência. O que começou como um projeto a dois, rapidamente se transformou numa agência premium, ajudando marcas a destacarem-se no mundo digital com soluções feitas à medida.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative group order-1 lg:order-2"
          >
            <img 
              src="https://picsum.photos/seed/zivox-brothers/1000/1000" 
              alt="Afonso e João Lopes" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative group"
          >
            <img 
              src="https://picsum.photos/seed/zivox-team/1000/1000" 
              alt="Zivox Team" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
          </motion.div>
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">A Nossa Missão</h2>
            <p className="text-brand-gray text-lg leading-relaxed">
              Acreditamos que o design de excelência e a tecnologia de ponta devem estar ao alcance de empresas que procuram destacar-se num mercado saturado. A nossa missão é democratizar o acesso a soluções digitais de alta performance, mantendo um nível de detalhe e cuidado que normalmente só se encontra em grandes agências globais.
            </p>
            <div className="space-y-4">
              {[
                { icon: Globe, text: "Presença global com toque local" },
                { icon: Cpu, text: "Engenharia de software de precisão" },
                { icon: Layout, text: "Design focado na experiência humana" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-white/80">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mb-40">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Os Nossos Valores</h2>
            <p className="text-brand-gray max-w-2xl mx-auto">
              Estes são os pilares que sustentam cada projeto que entregamos e cada relação que construímos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] hover:border-white/20 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-brand-gray leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glass p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter relative z-10">Vamos construir o futuro juntos?</h2>
          <p className="text-brand-gray mb-12 max-w-xl mx-auto relative z-10">
            Seja uma startup à procura do teu primeiro MVP ou uma empresa consolidada a precisar de renovação digital.
          </p>
          <Link to="/#contacto" className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
            Entrar em Contacto <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
