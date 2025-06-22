'use client';

import { MdxVideoPlayer } from "./mdx-video-player";

interface VideoGridProps {
  children?: React.ReactNode;
  className?: string;
}

interface VideoItem {
  videoUrl: string;
  title?: string;
  description?: string;
}

interface VideoGridContainerProps {
  videos: VideoItem[];
  title?: string;
  subtitle?: string;
}

// Componente wrapper para organizar vídeos em grade
export function VideoGrid({ children, className = "" }: VideoGridProps) {
  return (
    <div className={`grid gap-6 ${className}`}>
      <style jsx>{`
        .video-grid-responsive {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
        
        @media (max-width: 640px) {
          .video-grid-responsive {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .video-grid-responsive {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1025px) {
          .video-grid-responsive {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 1400px) {
          .video-grid-responsive {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
      <div className="video-grid-responsive">
        {children}
      </div>
    </div>
  );
}

// Componente mais avançado que aceita array de vídeos
export function VideoGridContainer({ videos, title, subtitle }: VideoGridContainerProps) {
  return (
    <section className="py-8">
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <VideoGrid>
        {videos.map((video, index) => (
          <MdxVideoPlayer
            key={`${video.videoUrl}-${index}`}
            videoUrl={video.videoUrl}
            title={video.title}
            description={video.description}
          />
        ))}
      </VideoGrid>
    </section>
  );
}

// Exemplo de uso com CSS personalizado usando Tailwind
export function ResponsiveVideoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  );
}