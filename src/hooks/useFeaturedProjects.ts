import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { projectService } from '../services/projectService';

export const useFeaturedProjects = (limit = 6) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatured = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectService.getFeaturedProjects(limit);
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar projetos em destaque');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return { projects, isLoading, error, refetch: fetchFeatured };
};
