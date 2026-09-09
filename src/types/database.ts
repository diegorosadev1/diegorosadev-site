export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          slug: string;
          category: string;
          short_description: string;
          description: string | null;
          logo_url: string | null;
          thumbnail_url: string | null;
          hero_desktop_url: string | null;
          hero_mobile_url: string | null;
          context_title: string | null;
          context_description: string | null;
          context_image_url: string | null;
          results_title: string | null;
          results_description: string | null;
          live_url: string | null;
          github_url: string | null;
          published: boolean;
          featured: boolean;
          display_order: number;
          show_context: boolean;
          show_problems: boolean;
          show_solutions: boolean;
          show_highlights: boolean;
          show_results: boolean;
          show_gallery: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          category: string;
          short_description: string;
          description?: string | null;
          logo_url?: string | null;
          thumbnail_url?: string | null;
          hero_desktop_url?: string | null;
          hero_mobile_url?: string | null;
          context_title?: string | null;
          context_description?: string | null;
          context_image_url?: string | null;
          results_title?: string | null;
          results_description?: string | null;
          live_url?: string | null;
          github_url?: string | null;
          published?: boolean;
          featured?: boolean;
          display_order?: number;
          show_context?: boolean;
          show_problems?: boolean;
          show_solutions?: boolean;
          show_highlights?: boolean;
          show_results?: boolean;
          show_gallery?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          url: string;
          alt: string | null;
          caption: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          url: string;
          alt?: string | null;
          caption?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['project_images']['Insert']>;
      };
      project_problems: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['project_problems']['Insert']>;
      };
      project_solutions: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['project_solutions']['Insert']>;
      };
      project_highlights: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['project_highlights']['Insert']>;
      };
      project_results: {
        Row: {
          id: string;
          project_id: string;
          value: string;
          label: string;
          icon_name: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          project_id: string;
          value: string;
          label: string;
          icon_name?: string | null;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['project_results']['Insert']>;
      };
      technologies: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          subtitle: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          subtitle?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['technologies']['Insert']>;
      };
      project_technologies: {
        Row: {
          project_id: string;
          technology_id: string;
        };
        Insert: {
          project_id: string;
          technology_id: string;
        };
        Update: Partial<Database['public']['Tables']['project_technologies']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          active: boolean;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon: string;
          active?: boolean;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      site_content: {
        Row: {
          id: string;
          section: string;
          content: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section: string;
          content: Json;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['site_content']['Insert']>;
      };
      site_settings: {
        Row: {
          id: string;
          site_name: string | null;
          logo_url: string | null;
          favicon_url: string | null;
          cnpj: string | null;
          default_meta_title: string | null;
          default_meta_description: string | null;
          og_image_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          site_name?: string | null;
          logo_url?: string | null;
          favicon_url?: string | null;
          cnpj?: string | null;
          default_meta_title?: string | null;
          default_meta_description?: string | null;
          og_image_url?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
    };
  };
}
