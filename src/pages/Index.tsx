
import React from 'react';
import { useVCard } from '@/contexts/VCardContext';
import ModernLayout from '@/components/layouts/ModernLayout';
import ClassicLayout from '@/components/layouts/ClassicLayout';
import MinimalLayout from '@/components/layouts/MinimalLayout';
import GradientLayout from '@/components/layouts/GradientLayout';
import CreativeLayout from '@/components/layouts/CreativeLayout';

const Index = () => {
  const { data } = useVCard();

  const renderLayout = () => {
    switch (data.layout) {
      case 'classic':
        return <ClassicLayout />;
      case 'minimal':
        return <MinimalLayout />;
      case 'gradient':
        return <GradientLayout />;
      case 'creative':
        return <CreativeLayout />;
      default:
        return <ModernLayout />;
    }
  };

  return (
    <div className={data.theme === 'dark' ? 'dark' : ''}>
      {renderLayout()}
    </div>
  );
};

export default Index;
