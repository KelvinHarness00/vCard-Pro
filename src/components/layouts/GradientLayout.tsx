import React from 'react';
import { useVCard } from '@/contexts/VCardContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Linkedin, Youtube, X, Mail, Phone, Copy, Download, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { generateVCard } from '@/utils/vcard';
import kelvinPerfil from '@/assets/perfil.png';

const GradientLayout = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Settings Button */}
      <div className="relative z-10 flex justify-end p-4">
        <Link to="/settings">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </Link>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <img
              src={data.profileImage || kelvinPerfil}
              alt={data.name}
              className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-white/30 shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = kelvinPerfil;
              }}
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/30 to-blue-400/30"></div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            {data.name}
          </h1>
          <p className="text-2xl text-blue-200 mb-6 font-light">
            {data.profession}
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
            {data.bio}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <CardContent className="p-6">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center space-x-4 text-white hover:text-blue-200 transition-colors"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <span className="text-lg">{data.email}</span>
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <CardContent className="p-6">
              <a
                href={`tel:${data.phone}`}
                className="flex items-center space-x-4 text-white hover:text-green-200 transition-colors"
              >
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <span className="text-lg">{data.phone}</span>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Gallery */}
        <Card className="mb-12 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Galeria
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.galleryImages.map((image, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl">
                  <img
                    src={image}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="mb-12 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Conecte-se
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(data.socialLinks).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center space-y-3 p-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-white/20 hover:to-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-white/80 group-hover:text-white capitalize font-medium">
                      {platform}
                    </span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pix Section */}
        <Card className="mb-12 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-300/30 shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
              Pagamento Pix
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-lg font-mono break-all text-green-200">{data.pixKey}</p>
            </div>
            <Button 
              onClick={copyPixKey}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Copy className="h-5 w-5 mr-2" />
              Copiar Chave Pix
            </Button>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="text-center mb-12">
          <Button 
            onClick={downloadVCard}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Download className="h-6 w-6 mr-3" />
            Salvar Contato
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-white/60">
          <p>&copy; 2024 {data.name}. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">vCard Pro - Cartão de visitas premium</p>
        </footer>
      </div>
    </div>
  );
};

export default GradientLayout;
