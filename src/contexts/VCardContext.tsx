import { createContext, useContext, useState, ReactNode } from 'react';
import img1 from '@/assets/img1.jpeg';
import img2 from '@/assets/img2.jpeg';
import img3 from '@/assets/img3.jpeg';
import img4 from '@/assets/img4.jpg';

export interface VCardData {
  name: string;
  profession: string;
  bio: string;
  email: string;
  phone: string;
  pixKey: string;
  profileImage: string;
  galleryImages: string[];
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
    x: string;
  };
  layout: 'modern' | 'classic' | 'minimal' | 'gradient' | 'creative';
  theme: 'light' | 'dark';
  primaryColor: string;
}

interface VCardContextType {
  data: VCardData;
  updateData: (newData: Partial<VCardData>) => void;
}

const defaultData: VCardData = {
  name: "Kelvin Harness",
  profession: "CEO da Harena Techh",
  bio: "Transformo ideias em produtos digitais com propósito. Empreendedor, estrategista e apaixonado por construir soluções que resolvem problemas reais.",
  email: "kelvin.harness@harenatech.com.br",
  phone: "+55 (81) 99778-00402",
  pixKey: "(81) 99778-00402",
  profileImage: require('@/assets/perfil.png'),
  galleryImages: [
    require(img1),
    require(img2),
    require(img3),
    require(img4)
  ],
  socialLinks: {
    instagram: "https://instagram.com/_kelvinharness",
    linkedin: "https://linkedin.com/in/kelvinharness",
    youtube: "https://youtube.com/@harenatech",
    x: "https://x.com/"
  },
  layout: 'modern',
  theme: 'dark',
  primaryColor: '#3B82F6'
};

const STORAGE_KEY = 'vcard-data';

function getInitialData(): VCardData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultData;
    }
  }
  return defaultData;
}

const VCardContext = createContext<VCardContextType | undefined>(undefined);

export const VCardProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<VCardData>(getInitialData());

  const updateData = (newData: Partial<VCardData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <VCardContext.Provider value={{ data, updateData }}>
      {children}
    </VCardContext.Provider>
  );
};

export const useVCard = () => {
  const context = useContext(VCardContext);
  if (!context) {
    throw new Error('useVCard must be used within a VCardProvider');
  }
  return context;
};
