import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { projectService } from '../services/projectService';

export const useProjectDetail = (slug: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!slug) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectService.getProjectBySlug(slug);
      setProject(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar detalhes do projeto');
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return { project, isLoading, error, refetch: fetchProject };
};
