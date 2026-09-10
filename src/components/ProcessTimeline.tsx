import React from 'react';
import {
  MessageSquare,
  FileText,
  Code2,
  Rocket,
  ArrowRight,
  ShieldCheck,
  Clock,
  Heart,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/servicesAndProcess';

export const ProcessTimeline: React.FC = () => {
  const getStepVisuals = (index: number) => {
    switch (index) {
      case 0:
        return {
          icon: <MessageSquare className="w-5 h-5 text-white" />,
          squircleClass:
            'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25',
          numberColor: 'text-blue-600',
        };
      case 1:
        return {
          icon: <FileText className="w-5 h-5 text-white" />,
          squircleClass:
            'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/25',
          numberColor: 'text-purple-600',
        };
      case 2:
        return {
          icon: <Code2 className="w-5 h-5 text-white" />,
          squircleClass:
            'bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/25',
          numberColor: 'text-blue-600',
        };
      case 3:
      default:
        return {
          icon: <Rocket className="w-5 h-5 text-white" />,
          squircleClass:
            'bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg shadow-purple-600/25',
          numberColor: 'text-purple-600',
        };
    }
  };

  return (
    <section
      id="como-funciona"
      aria-label="Como funciona o processo de desenvolvimento"
      className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-24 relative overflow-hidden border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & Trust Badges */}
          <div className="lg:col-span-4 flex flex-col items-start">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2.5px] bg-blue-600 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Como funciona
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-black text-slate-950 tracking-tight leading-[1.15] mb-4">
              <span className="whitespace-nowrap">Do planejamento à</span>{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                entrega
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-sm mb-8 sm:mb-10">
              Um processo simples, transparente e focado no resultado.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-7 pt-2">
              
              {/* Badge 1 */}
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="flex flex-col text-xs font-medium text-slate-700 leading-tight">
                  <span>Comunicação</span>
                  <span>constante</span>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-cyan-500 shrink-0" />
                <div className="flex flex-col text-xs font-medium text-slate-700 leading-tight">
                  <span>Prazos</span>
                  <span>bem definidos</span>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-indigo-500 shrink-0" />
                <div className="flex flex-col text-xs font-medium text-slate-700 leading-tight">
                  <span>Seu projeto</span>
                  <span>em boas mãos</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: 4 Cards with Arrows */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row flex-wrap xl:flex-nowrap items-center gap-3 sm:gap-2.5 lg:gap-3 justify-between">
              {PROCESS_STEPS.map((step, index) => {
                const visual = getStepVisuals(index);

                return (
                  <React.Fragment key={step.number}>
                    {/* Step Card */}
                    <div className="bg-white rounded-3xl p-6 sm:p-6 lg:p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(59,130,246,0.08)] transition-all duration-300 flex flex-col justify-between flex-1 w-full sm:min-w-[180px] lg:min-w-[190px] min-h-[240px] group">
                      
                      {/* Top: Icon Squircle + Step Number */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${visual.squircleClass}`}
                        >
                          {visual.icon}
                        </div>
                        <span className={`text-base font-bold ${visual.numberColor}`}>
                          {step.number}
                        </span>
                      </div>

                      {/* Content: Title & Description */}
                      <div className="mt-6">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>

                    </div>

                    {/* Arrow between cards on large screens */}
                    {index < PROCESS_STEPS.length - 1 && (
                      <div className="hidden xl:flex items-center justify-center shrink-0 px-0.5">
                        <ArrowRight className="w-5 h-5 text-indigo-400" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
