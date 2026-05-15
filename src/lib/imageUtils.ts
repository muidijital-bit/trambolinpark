const MAX_KB = 200;
const MAX_DIMENSION = 1200;

export async function optimizeImage(file: File): Promise<File> {
  // If under 200KB and already webp, skip
  if (file.size <= MAX_KB * 1024 && file.type === 'image/webp') return file;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);

      // Scale down if too large
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP with decreasing quality until under 200KB
      const tryQuality = (quality: number) => {
        canvas.toBlob(blob => {
          if (!blob) { reject(new Error('Canvas toBlob failed')); return; }
          if (blob.size <= MAX_KB * 1024 || quality <= 0.3) {
            resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' }));
          } else {
            tryQuality(Math.round((quality - 0.1) * 10) / 10);
          }
        }, 'image/webp', quality);
      };

      tryQuality(file.size <= MAX_KB * 1024 ? 0.9 : 0.8);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
