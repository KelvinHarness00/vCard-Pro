import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import img1 from '@/assets/img1.jpeg';
import img2 from '@/assets/img2.jpeg';
import img3 from '@/assets/img3.jpeg';
import img4 from '@/assets/img4.jpg';
import perfilImg from '@/assets/perfil.png';
import { imageToBase64 } from '@/lib/imageToBase64';

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
  profileImage: perfilImg,
  galleryImages: [
    img1,
    img2,
    img3,
    img4
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
  const [loading, setLoading] = useState(false);

  // Converte imagens padrão para base64 se necessário (apenas na primeira vez)
  useEffect(() => {
    const isBase64 = (str: string) => str.startsWith('data:image/');
    const needsConvert = data.galleryImages.some(img => !isBase64(img));
    if (needsConvert) {
      setLoading(true);
      Promise.all(data.galleryImages.map(img => isBase64(img) ? img : imageToBase64(img)))
        .then(base64s => {
          setData(prev => {
            const updated = { ...prev, galleryImages: base64s };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
          });
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const updateData = (newData: Partial<VCardData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) {
    return <div style={{padding: 40, textAlign: 'center'}}>Carregando imagens...</div>;
  }

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
