import React from 'react';
import Section from './ui/Section';
import { BookOpen, Shield, TrendingUp, Cpu, ArrowUpRight } from 'lucide-react';

const Card = ({ icon, title, desc, num }: { icon: React.ReactNode, title: string, desc: string, num: string }) => (
  <div className="relative bg-[#080808] border border-white/5 p-8 group overflow-hidden transition-all duration-500 hover:border-gold/30">
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
       <ArrowUpRight className="text-gold" />
    </div>
    
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-[40px] group-hover:bg-gold/10 transition-colors duration-500"></div>

    <div className="relative z-10">
      <span className="block font-sora font-bold text-white/10 text-4xl mb-6">{num}</span>
      <div className="w-10 h-10 border-l border-t border-white/20 flex items-start justify-start pt-2 pl-2 mb-6 text-gray-400 group-hover:text-gold group-hover:border-gold transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-sora font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-gray-500 font-inter text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
  </div>
);

const BlockTalk: React.FC = () => {
  return (
    <Section id="block-talk" className="bg-darkbg relative overflow-hidden py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <div>
           <span className="text-gold font-sora text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Knowledge Base</span>
           <h2 className="text-4xl md:text-6xl font-sora font-extrabold text-white leading-none">
             BLOCK TALK
           </h2>
        </div>
        <p className="text-gray-400 max-w-sm text-right font-inter text-sm mt-6 md:mt-0 border-r border-gold pr-4">
          Decoding the matrix. <br/>
          Simple explanations for complex chains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          num="01"
          icon={<TrendingUp size={20} />} 
          title="Market Alpha" 
          desc="Weekly insights on where the liquidity is flowing before the crowd arrives." 
        />
        <Card 
          num="02"
          icon={<Shield size={20} />} 
          title="Security Hygiene" 
          desc="Stay safe in the dark forest. Wallet management and scam avoidance 101." 
        />
        <Card 
          num="03"
          icon={<Cpu size={20} />} 
          title="DeFi Strategies" 
          desc="Yield farming without getting farmed. High level strategies for passive accumulation." 
        />
        <Card 
          num="04"
          icon={<BookOpen size={20} />} 
          title="NFT Culture" 
          desc="Understanding the meta beyond the floor price. Community, art, and utility." 
        />
      </div>
    </Section>
  );
};

export default BlockTalk;