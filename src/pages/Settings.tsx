import React, { useState } from 'react';
import { useVCard } from '@/contexts/VCardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, Palette, Save, User, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import LayoutPreview from '@/components/LayoutPreview';

const Settings = () => {
  const { data, updateData } = useVCard();
  const [previewLayout, setPreviewLayout] = useState(data.layout);
  const [previewImage, setPreviewImage] = useState<string>(data.profileImage || require('@/assets/kelvinHarnessPerfil.png'));

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Seu cartão de visitas foi atualizado com sucesso.",
    });
  };

  const handlePublish = () => {
    updateData({ ...data, layout: previewLayout });
    toast({
      title: "Cartão publicado!",
      description: "Suas alterações estão ativas no seu cartão de visitas.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Cartão
              </Button>
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Configurações do vCard
            </h1>
          </div>
          <div className="flex space-x-3">
            <Link to="/">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </Link>
            <Button onClick={handlePublish} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Publicar Cartão
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">
                  <User className="h-4 w-4 mr-2" />
                  Pessoal
                </TabsTrigger>
                <TabsTrigger value="layout">
                  <Layout className="h-4 w-4 mr-2" />
                  Layout
                </TabsTrigger>
                <TabsTrigger value="theme">
                  <Palette className="h-4 w-4 mr-2" />
                  Tema
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => updateData({ name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="profession">Profissão</Label>
                      <Input
                        id="profession"
                        value={data.profession}
                        onChange={(e) => updateData({ profession: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={data.bio}
                        onChange={(e) => updateData({ bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => updateData({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        value={data.phone}
                        onChange={(e) => updateData({ phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pixKey">Chave Pix</Label>
                      <Input
                        id="pixKey"
                        value={data.pixKey}
                        onChange={(e) => updateData({ pixKey: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="profileImage">Foto de Perfil</Label>
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const base64 = reader.result as string;
                              setPreviewImage(base64);
                              updateData({ profileImage: base64 });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="mb-2"
                      />
                      <div className="flex items-center space-x-4 mt-2">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = require('@/assets/kelvinHarnessPerfil.png');
                          }}
                        />
                        <Link to="/">
                          <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                            visualizar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Minhas Redes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={data.socialLinks.instagram}
                        onChange={(e) => updateData({
                          socialLinks: { ...data.socialLinks, instagram: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={data.socialLinks.linkedin}
                        onChange={(e) => updateData({ 
                          socialLinks: { ...data.socialLinks, linkedin: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        value={data.socialLinks.youtube}
                        onChange={(e) => updateData({ 
                          socialLinks: { ...data.socialLinks, youtube: e.target.value }
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="x">X (Twitter)</Label>
                      <Input
                        id="x"
                        value={data.socialLinks.x}
                        onChange={(e) => updateData({ 
                          socialLinks: { ...data.socialLinks, x: e.target.value }
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="layout">
                <Card>
                  <CardHeader>
                    <CardTitle>Escolha seu Layout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['modern', 'classic', 'minimal', 'gradient', 'creative'].map((layout) => (
                        <div
                          key={layout}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            previewLayout === layout 
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setPreviewLayout(layout as any)}
                        >
                          <h3 className="font-semibold mb-2 capitalize">{layout}</h3>
                          <div className="h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                            Preview {layout}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="theme">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalização do Tema</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Tema</Label>
                      <div className="flex space-x-4 mt-2">
                        <Button
                          variant={data.theme === 'light' ? 'default' : 'outline'}
                          onClick={() => updateData({ theme: 'light' })}
                          className="flex-1"
                        >
                          Claro
                        </Button>
                        <Button
                          variant={data.theme === 'dark' ? 'default' : 'outline'}
                          onClick={() => updateData({ theme: 'dark' })}
                          className="flex-1"
                        >
                          Escuro
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="primaryColor">Cor Principal</Label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={data.primaryColor}
                          onChange={(e) => updateData({ primaryColor: e.target.value })}
                          className="w-16 h-10 p-1"
                        />
                        <Input
                          value={data.primaryColor}
                          onChange={(e) => updateData({ primaryColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Button onClick={handleSave} className="w-full" variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Preview em Tempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <LayoutPreview layout={previewLayout} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
