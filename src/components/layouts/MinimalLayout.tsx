import React from 'react';
import { useVCard } from '@/contexts/VCardContext';
import { Button } from '@/components/ui/button';
import { Instagram, Linkedin, Youtube, X, Mail, Phone, Copy, Download, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { generateVCard } from '@/utils/vcard';
import kelvinPerfil from '@/assets/perfil.png';

const MinimalLayout = () => {
  const { data } = useVCard();

  const copyPixKey = () => {
    navigator.clipboard.writeText(data.pixKey);
    toast({
      title: "Chave Pix copiada!",
      description: "A chave foi copiada para sua área de transferência.",
    });
  };

  const downloadVCard = () => {
    const vCardData = generateVCard(data);
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast({
      title: "vCard baixado!",
      description: "O arquivo de contato foi baixado com sucesso.",
    });
  };

  const socialIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    x: X
  };

  return (
    <div className={`min-h-screen ${data.theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Settings Button */}
      <div className="fixed top-4 right-4 z-10">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="opacity-60 hover:opacity-100">
            <Settings className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-8 py-16 max-w-2xl">
        {/* Profile Section */}
        <div className="text-center mb-16">
          <img
            src={data.profileImage || kelvinPerfil}
            alt={data.name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-8 border-2 border-gray-200 dark:border-gray-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = kelvinPerfil;
            }}
          />
          <h1 className="text-5xl font-light mb-4 tracking-tight">
            {data.name}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 font-light">
            {data.profession}
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg mx-auto font-light">
            {data.bio}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-16">
          <div className="space-y-6">
            <a
              href={`mailto:${data.email}`}
              className="flex items-center justify-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>{data.email}</span>
            </a>
            <a
              href={`tel:${data.phone}`}
              className="flex items-center justify-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>{data.phone}</span>
            </a>
          </div>
        </div>

        {/* Gallery - Simplified */}
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-2">
            {data.galleryImages.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Work ${index + 1}`}
                className="w-full h-32 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-16">
          <div className="flex justify-center space-x-8">
            {Object.entries(data.socialLinks).map(([platform, url]) => {
              const IconComponent = socialIcons[platform as keyof typeof socialIcons];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <IconComponent className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Pix */}
        <div className="mb-16 text-center">
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">PIX</p>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded inline-block">
              {data.pixKey}
            </p>
          </div>
          <Button onClick={copyPixKey} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copiar
          </Button>
        </div>

        {/* Download */}
        <div className="text-center mb-16">
          <Button onClick={downloadVCard} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Salvar Contato
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-500">
          <p>&copy; 2024 {data.name}</p>
        </footer>
      </div>
    </div>
  );
};

export default MinimalLayout;
