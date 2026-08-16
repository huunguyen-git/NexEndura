import { create } from 'zustand';

interface GalleryState {
  activeImage: string | null;
  setActiveImage: (img: string | null) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  activeImage: null,
  setActiveImage: (activeImage) => set({ activeImage }),
}));
