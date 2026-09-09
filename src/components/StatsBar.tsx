import React from 'react';
import { Calendar, Rocket, Users, Target } from 'lucide-react';
import { STATS } from '../data/servicesAndProcess';

export const StatsBar: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-blue-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-indigo-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-cyan-400" />;
      default:
        return <Target className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section
      id="indicadores"
      aria-label="Indicadores e resultados"
      className="w-full bg-[#0a0e19] border-y border-slate-800/80 py-7 sm:py-9 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-slate-800/70">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 ${
                index !== 0 ? 'lg:pl-8' : ''
              } ${index % 2 !== 0 ? 'pl-2 sm:pl-4' : ''}`}
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-center shrink-0 shadow-inner">
                {getIcon(stat.icon)}
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
