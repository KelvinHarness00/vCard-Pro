import React from 'react';
import { useVCard } from '@/contexts/VCardContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Linkedin, Youtube, X, Mail, Phone, Copy, Download, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { generateVCard } from '@/utils/vcard';
import kelvinPerfil from '@/assets/perfil.png';

const ClassicLayout = () => {
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
    <div className={`min-h-screen ${data.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Cartão de Visitas</h1>
          <Link to="/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Profile Card */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-8 text-center">
            <img
              src={data.profileImage || kelvinPerfil}
              alt={data.name}
              className="w-40 h-40 rounded-full border-4 border-gray-200 dark:border-gray-600 shadow-lg object-cover mx-auto mb-6"
              onError={(e) => {
                (e.target as HTMLImageElement).src = kelvinPerfil;
              }}
            />
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              {data.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {data.profession}
            </p>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {data.bio}
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contato</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
                  {data.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <a href={`tel:${data.phone}`} className="text-blue-600 hover:underline">
                  {data.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Portfólio</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Redes Sociais</h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(data.socialLinks).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="capitalize">{platform}</span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pix */}
        <Card className="mb-6 shadow-lg border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pagamento Pix</h2>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
              <p className="font-mono text-sm break-all text-gray-800 dark:text-gray-200">{data.pixKey}</p>
            </div>
            <Button onClick={copyPixKey} className="bg-green-600 hover:bg-green-700">
              <Copy className="h-4 w-4 mr-2" />
              Copiar Chave Pix
            </Button>
          </CardContent>
        </Card>

        {/* Download Button */}
        <div className="text-center mb-8">
          <Button onClick={downloadVCard} size="lg" className="px-8">
            <Download className="h-5 w-5 mr-2" />
            Salvar Contato
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-500 dark:text-gray-400 border-t">
          <p>&copy; 2024 {data.name}. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default ClassicLayout;
