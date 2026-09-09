import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/servicesAndProcess';

export const ProcessTimeline: React.FC = () => {
  return (
    <section
      id="como-funciona"
      aria-label="Como funciona o processo de desenvolvimento"
      className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 relative overflow-hidden border-y border-slate-200"
    >
      {/* Subtle geometric background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
              Como funciona
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Do planejamento à entrega
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Um processo simples, transparente e focado no seu resultado.
            </p>
          </div>

          {/* Right Column: 4 Steps Horizontal */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <div key={step.number} className="flex flex-col relative group">
                
                {/* Step number badge & arrow connector */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0e1626] text-white font-bold text-sm flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-blue-600 transition-all duration-300 shrink-0">
                    {step.number}
                  </div>

                  {/* Horizontal arrow to next step on desktop */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:flex items-center text-slate-400 pl-2 flex-1 justify-center">
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Step title & description */}
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
