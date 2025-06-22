"use client";

import React from "react"; // Não precisamos mais de useState ou useEffect para este propósito aqui
import { PlayCircle, X } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogClose } from "@radix-ui/react-dialog"; // Importe os componentes do Radix UI Dialog
import clsx from "clsx"; // Para combinar classes Tailwind condicionalmente

interface MdxVideoPlayerProps {
  videoUrl: string; // A URL completa do vídeo (ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ)
  title?: string;   // Título opcional para o vídeo
  description?: string; // Descrição opcional para o vídeo
}

const getYouTubeEmbedUrl = (url: string) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:(?:\?|&)([^&#]+))?/;
  const match = url.match(regExp);
  if (match && match[1]) {
    // Retorna a URL de incorporação para o YouTube
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return null;
};

const getYouTubeThumbnail = (url: string) => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:(?:\?|&)([^&#]+))?/;
  const match = url.match(regExp);
  if (match && match[1]) {
    // Retorna a URL da miniatura de alta qualidade do YouTube
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  // Retorna uma imagem de placeholder se a URL não for válida ou não for do YouTube
  return "https://placehold.co/480x360/e0e0e0/505050?text=Video";
};

export function MdxVideoPlayer({ videoUrl, title, description }: MdxVideoPlayerProps) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  const thumbnailUrl = getYouTubeThumbnail(videoUrl);

  // Não é mais necessário verificar isClient aqui, pois o componente será carregado dinamicamente no cliente.

  if (!embedUrl) {
    // Retorna um alerta se a URL do vídeo for inválida
    return (
      <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
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

  return (
    // Usa Radix UI Dialog para o modal do vídeo
    <Dialog>
      <DialogTrigger asChild>
        {/* Thumbnail clicável que age como gatilho do modal */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group shadow-lg transition-transform duration-300 hover:scale-[1.01] my-6">
          <img
            src={thumbnailUrl}
            alt={title || "Miniatura do Vídeo"}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
            // Fallback para imagem de placeholder se a miniatura falhar
            onError={(e) => {
              e.currentTarget.onerror = null; // Evita loop infinito
              e.currentTarget.src = "https://placehold.co/480x360/e0e0e0/505050?text=Video+Indisponível";
            }}
          />
          {/* Ícone de play sobreposto */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-colors duration-300 rounded-lg">
            <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
          </div>
          {/* Título e descrição do vídeo, se fornecidos */}
          {(title || description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white">
              {title && <h4 className="text-lg font-bold truncate">{title}</h4>}
              {description && <p className="text-sm opacity-80 line-clamp-2">{description}</p>}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/80 z-50 animate-in fade-in-0" />
      <DialogContent className={clsx(
        "fixed z-50 grid w-[calc(100%-2rem)] max-w-4xl p-0 shadow-lg duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg"
      )}>
        {/* Reprodutor de vídeo incorporado */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={title || "Reprodutor de Vídeo"}
          ></iframe>
        </div>
        {/* Botão para fechar o modal */}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Fechar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}