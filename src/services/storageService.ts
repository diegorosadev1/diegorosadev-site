import { supabase, isSupabaseConfigured, STORAGE_BUCKETS } from '../lib/supabase';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const storageService = {
  validateFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: 'Formato inválido. Apenas JPEG, PNG ou WEBP são permitidos.',
      };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        error: 'Arquivo muito grande. O tamanho máximo permitido é 5MB.',
      };
    }

    return { valid: true };
  },

  async uploadImage(
    file: File,
    bucket: 'portfolio-projects' | 'portfolio-site',
    pathPrefix: string
  ): Promise<UploadResult> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error || 'Arquivo inválido');
    }

    // Clean file name
    const timestamp = Date.now();
    const cleanName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');
    const filePath = `${pathPrefix}/${timestamp}-${cleanName}`;

    // If Supabase is not configured yet, convert to Base64/Blob URL so the user can test immediately in preview
    if (!isSupabaseConfigured()) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            path: filePath,
          });
        };
        reader.readAsDataURL(file);
      });
    }

    try {
      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.warn('Supabase storage upload error, falling back to data URL:', error.message);
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              url: reader.result as string,
              path: filePath,
            });
          };
          reader.readAsDataURL(file);
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return {
        url: publicUrlData.publicUrl,
        path: filePath,
      };
    } catch (err: any) {
      console.error('Storage upload error:', err);
      // Fallback
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            path: filePath,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  },
};
