import React from 'react';
import {
  LayoutGrid,
  Car,
  Dumbbell,
  Cpu,
  Building2,
  Search,
  X,
} from 'lucide-react';

export interface ProjectFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const categories = [
    { id: 'todos', label: 'Todos', icon: LayoutGrid },
    { id: 'automotivo', label: 'Automotivo', icon: Car },
    { id: 'esportes', label: 'Esportes', icon: Dumbbell },
    { id: 'tecnologia', label: 'Tecnologia', icon: Cpu },
    { id: 'institucional', label: 'Institucional', icon: Building2 },
  ];

  return (
    <div
      id="project-filters-bar"
      className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-8"
    >
      {/* Category Pills (Horizontal scrolling on small screens) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory.toLowerCase() === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              id={`filter-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'bg-[#0c1222] hover:bg-slate-800/80 text-slate-300 hover:text-white border border-slate-800/90'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input on Right */}
      <div className="relative w-full md:w-72 shrink-0">
        <input
          id="project-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar projeto..."
          className="w-full bg-[#0c1222] text-slate-200 placeholder:text-slate-500 border border-slate-800/90 rounded-xl px-4 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/50 transition-all pr-10 shadow-inner"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};
