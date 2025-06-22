"use client";

import React, { useState, useEffect } from "react";
import { PlayCircle, X, ImageIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";

interface MdxVideoPlayerProps {
  videoUrl: string;
  title?: string;
  description?: string;
}

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:(?:\?|&)([^&#]+))?/;
  const match = url.match(regExp);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return null;
};

const getYouTubeThumbnailUrls = (url: string) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:(?:\?|&)([^&#]+))?/;
  const match = url.match(regExp);
  if (match && match[1]) {
    const videoId = match[1];
    return [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`
    ];
  }
  return [];
};

export function MdxVideoPlayer({ videoUrl, title, description }: MdxVideoPlayerProps) {
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailedToLoadAll, setImageFailedToLoadAll] = useState(false);

  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const thumbnailUrls = getYouTubeThumbnailUrls(videoUrl);
  const currentThumbnailUrl = thumbnailUrls[currentThumbnailIndex];

  useEffect(() => {
    setCurrentThumbnailIndex(0);
    setImageLoaded(false);
    setImageFailedToLoadAll(false);
  }, [videoUrl]);

  if (!embedUrl) {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
        <div className="flex items-center gap-2">
          <X className="h-5 w-5" />
          <h3 className="font-semibold">URL de Vídeo Inválida</h3>
        </div>
        <p className="mt-2 text-sm">
          A URL fornecida &quot;{videoUrl}&quot; não é um formato de vídeo suportado.
          Atualmente, apenas URLs do YouTube são suportadas.
        </p>
      </div>
    );
  }

  const handleImageError = () => {
    if (currentThumbnailIndex < thumbnailUrls.length - 1) {
      setCurrentThumbnailIndex(prevIndex => prevIndex + 1);
      setImageLoaded(false);
    } else {
      setImageFailedToLoadAll(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="mb-6">
      <Dialog>
        <DialogTrigger asChild>
          <div className="group cursor-pointer">
            {/* Container da miniatura */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Miniatura */}
              {!imageFailedToLoadAll && currentThumbnailUrl && (
                <img
                  src={currentThumbnailUrl}
                  alt={title || "Miniatura do Vídeo"}
                  className={clsx(
                    "w-full h-full object-cover transition-all duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}

              {/* Loading state */}
              {!imageLoaded && !imageFailedToLoadAll && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                  <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600 mb-2"></div>
                    <span className="text-sm">Carregando...</span>
                  </div>
                </div>
              )}

              {/* Fallback quando todas as miniaturas falharam */}
              {imageFailedToLoadAll && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <ImageIcon className="w-12 h-12 mb-3" />
                    <span className="text-sm font-medium">Miniatura indisponível</span>
                    <span className="text-xs opacity-75">Clique para assistir</span>
                  </div>
                </div>
              )}

              {/* Overlay com botão de play */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <PlayCircle className="w-8 h-8 text-white"  />
                </div>
              </div>

              {/* Duração do vídeo (placeholder - pode ser implementado com API do YouTube) */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                HD
              </div>
            </div>

            {/* Informações do vídeo */}
            {(title || description) && (
              <div className="mt-3 px-1">
                {title && (
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base line-clamp-2 mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogTrigger>

        <DialogOverlay className="fixed inset-0 bg-black/80 z-50 animate-in fade-in-0" />
        <DialogContent className={clsx(
          "fixed z-50 grid w-[95vw] max-w-6xl p-0 shadow-2xl duration-200 bg-black rounded-xl overflow-hidden",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}>
          <VisuallyHidden>
            <DialogTitle>{title || "Reprodutor de Vídeo"}</DialogTitle>
          </VisuallyHidden>
          
          <div className="relative w-full aspect-video">
            <iframe
              className="w-full h-full"
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title || "Reprodutor de Vídeo"}
            />
          </div>
          
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-black/50 hover:bg-black/70 p-2 transition-colors duration-200">
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}