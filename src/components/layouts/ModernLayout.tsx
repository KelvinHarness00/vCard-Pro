import React, { useState } from 'react';
import { useVCard } from '@/contexts/VCardContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Linkedin, Youtube, X, Mail, Phone, Copy, Download, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { generateVCard } from '@/utils/vcard';
import kelvinPerfil from '@/assets/perfil.png';

const ModernLayout = () => {
  const { data } = useVCard();
  const [showModal, setShowModal] = useState(false);
  const [galleryModal, setGalleryModal] = useState<{ open: boolean; src: string }>({ open: false, src: '' });

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
    <div className={`min-h-screen ${data.theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'}`}>
      {/* Modal de destaque da imagem */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowModal(false)}>
          <img
            src={data.profileImage}
            alt={data.name}
            className="max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
      {galleryModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setGalleryModal({ open: false, src: '' })}>
          <img
            src={galleryModal.src}
            alt="Galeria em destaque"
            className="max-w-full max-h-full rounded-lg shadow-2xl border-4 border-white"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
      {/* Header com botão de configurações */}
      <div className="sticky top-0 z-10 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 border-b border-white/20" style={{ display: 'none' }}>
        <div className="container mx-auto px-4 py-4 flex justify-end">
          <Link to="/settings">
            <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
          <CardContent className="p-0">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
              <div className="relative -mt-16 text-center px-6 pb-6">
                <div className="inline-block relative cursor-pointer" onClick={() => setShowModal(true)}>
                  <img
                    src={data.profileImage}
                    alt={data.name}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover mx-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = kelvinPerfil;
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
                </div>
                <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">
                  {data.name}
                </h1>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {data.profession}
                </p>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {data.bio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mb-8 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Entre em Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">{data.email}</span>
              </a>
              <a
                href={`tel:${data.phone}`}
                className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300">{data.phone}</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Gallery Section*/}
        <Card className="mb-8 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Galeria
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.galleryImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer" onClick={() => setGalleryModal({ open: true, src: image })}>
                  <img
                    src={image}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Harena Tech Section */}
        <Card className="mb-8 shadow-xl bg-gradient-to-r from-blue-900 to-purple-900 text-white border-0">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Harena Tech</h2>
            <p className="mb-4 text-base">A Harena Tech é referência em soluções digitais inovadoras, tecnologia e transformação digital para empresas e pessoas.</p>
            <div className="flex justify-center gap-6 mb-2">
              <a href="https://instagram.com/harenatech" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="https://www.linkedin.com/company/harena-tech" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Linkedin className="h-7 w-7" />
              </a>
              <a href="https://youtube.com/@harenatech" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                <Youtube className="h-7 w-7" />
              </a>
              <a href="https://harenatech.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M18.72 18.72l1.06 1.06M1.5 12H3m18 0h1.5M4.219 19.781l1.061-1.061M18.72 5.28l1.06-1.06M7.5 12a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z" />
                </svg>
              </a>
            </div>
            <span className="text-xs text-white/70 block">@harenatech</span>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="mb-8 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
              Minhas Redes Sociais
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(data.socialLinks).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:from-blue-50 hover:to-indigo-100 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <IconComponent className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {platform}
                    </span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pix Section */}
        <Card className="mb-8 shadow-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
          <CardContent className="p-4 text-center"> {/* padding reduzido */}
            <h2 className="text-xl font-bold mb-2">Chave Pix</h2> {/* fonte menor */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 mb-2"> {/* padding reduzido */}
              <p className="text-base font-mono break-all">{data.pixKey}</p> {/* fonte menor */}
            </div>
            <Button
              onClick={copyPixKey}
              className="bg-white text-green-600 hover:bg-gray-100 shadow-lg py-2 px-4 text-sm" /* botão menor */
            >
              <Copy className="h-4 w-4 mr-2" />
              Copiar Chave Pix
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            onClick={downloadVCard}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl py-6 text-lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Salvar Contato
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 {data.name}. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Cartão de visitas digital criado com vCard Pro by Harena Tech</p>
        </footer>
      </div>
    </div>
  );
};

export default ModernLayout;
