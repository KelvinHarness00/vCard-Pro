import React, { useState } from 'react';
import { useVCard } from '@/contexts/VCardContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Linkedin, Youtube, X, Mail, Phone, Copy, Download, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { generateVCard } from '@/utils/vcard';
import kelvinPerfil from '@/assets/perfil.png';

const CreativeLayout = () => {
  const { data } = useVCard();
  const [activeSection, setActiveSection] = useState('profile');

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

  const sections = [
    { id: 'profile', title: 'Perfil', color: 'from-pink-500 to-rose-500' },
    { id: 'contact', title: 'Contato', color: 'from-blue-500 to-cyan-500' },
    { id: 'gallery', title: 'Galeria', color: 'from-purple-500 to-violet-500' },
    { id: 'social', title: 'Social', color: 'from-green-500 to-emerald-500' },
    { id: 'pix', title: 'Pix', color: 'from-orange-500 to-amber-500' }
  ];

  return (
    <div className={`min-h-screen ${data.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-20 bg-white dark:bg-gray-800 shadow-xl z-20 flex flex-col items-center py-8 space-y-4">
        <Link to="/settings" className="mb-8">
          <Button variant="ghost" size="sm" className="p-3">
            <Settings className="h-6 w-6" />
          </Button>
        </Link>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              activeSection === section.id
                ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="text-xs font-bold">{section.title.charAt(0)}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="ml-20 min-h-screen">
        {/* Profile Section */}
        {activeSection === 'profile' && (
          <div className="relative overflow-hidden">
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500">
              <div className="text-center text-white transform hover:scale-105 transition-transform duration-500">
                <div className="relative mb-8">
                  <img
                    src={data.profileImage || kelvinPerfil}
                    alt={data.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto border-8 border-white/30 shadow-2xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = kelvinPerfil;
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/30 to-orange-400/30"></div>
                </div>
                <h1 className="text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in">
                  {data.name}
                </h1>
                <p className="text-2xl mb-6 font-light opacity-90 animate-fade-in">
                  {data.profession}
                </p>
                <p className="text-lg max-w-2xl mx-auto leading-relaxed opacity-80 animate-fade-in">
                  {data.bio}
                </p>
                <Button
                  onClick={() => setActiveSection('contact')}
                  className="mt-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                >
                  Explore
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-8">
            <div className="max-w-4xl w-full">
              <h2 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
                Vamos Conversar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white/20 backdrop-blur-lg border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-8">
                    <a
                      href={`mailto:${data.email}`}
                      className="flex items-center space-x-6 text-white group"
                    >
                      <div className="p-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:from-blue-300 group-hover:to-cyan-300 transition-all duration-300">
                        <Mail className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 mb-1">E-mail</p>
                        <p className="text-xl font-medium">{data.email}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>

                <Card className="bg-white/20 backdrop-blur-lg border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <CardContent className="p-8">
                    <a
                      href={`tel:${data.phone}`}
                      className="flex items-center space-x-6 text-white group"
                    >
                      <div className="p-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full group-hover:from-green-300 group-hover:to-emerald-300 transition-all duration-300">
                        <Phone className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80 mb-1">Telefone</p>
                        <p className="text-xl font-medium">{data.phone}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {activeSection === 'gallery' && (
          <div className="h-screen bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 p-8 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="text-5xl font-bold text-white text-center mb-12 drop-shadow-lg">
                Meu Trabalho
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.galleryImages.map((image, index) => (
                  <div key={index} className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-500">
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-semibold">Projeto {index + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Social Section */}
        {activeSection === 'social' && (
          <div className="h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 p-8 flex items-center">
            <div className="max-w-4xl mx-auto w-full text-center">
              <h2 className="text-5xl font-bold text-white mb-12 drop-shadow-lg">
                Conecte-se Comigo
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(data.socialLinks).map(([platform, url]) => {
                  const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group transform hover:scale-110 transition-all duration-300"
                    >
                      <Card className="bg-white/20 backdrop-blur-lg border-white/30 shadow-2xl group-hover:bg-white/30">
                        <CardContent className="p-8 text-center">
                          <div className="p-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full inline-block mb-4 group-hover:from-green-300 group-hover:to-emerald-300 transition-all duration-300">
                            <IconComponent className="h-10 w-10 text-white" />
                          </div>
                          <p className="text-white font-semibold capitalize text-lg">
                            {platform}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Pix Section */}
        {activeSection === 'pix' && (
          <div className="h-screen bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 p-8 flex items-center">
            <div className="max-w-2xl mx-auto w-full text-center">
              <h2 className="text-5xl font-bold text-white mb-12 drop-shadow-lg">
                Pagamento Rápido
              </h2>
              <Card className="bg-white/20 backdrop-blur-lg border-white/30 shadow-2xl">
                <CardContent className="p-12">
                  <div className="mb-8">
                    <p className="text-white/80 mb-4 text-lg">Chave Pix</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-8">
                      <p className="text-white font-mono text-lg break-all">{data.pixKey}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={copyPixKey}
                    size="lg"
                    className="bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-300 hover:to-amber-300 text-white shadow-lg transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
                  >
                    <Copy className="h-6 w-6 mr-3" />
                    Copiar Chave Pix
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Floating Download Button */}
        <div className="fixed bottom-8 right-8 z-30">
          <Button 
            onClick={downloadVCard}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl rounded-full p-4 transform hover:scale-110 transition-all duration-300"
          >
            <Download className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreativeLayout;
