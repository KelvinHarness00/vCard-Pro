
import React from 'react';
import { useVCard } from '@/contexts/VCardContext';

interface LayoutPreviewProps {
  layout: string;
}

const LayoutPreview = ({ layout }: LayoutPreviewProps) => {
  const { data } = useVCard();

  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
      Preview do layout "{layout}" com os dados de {data.name}
      <br />
      <span className="text-xs">(Preview detalhado será implementado)</span>
    </div>
  );
};

export default LayoutPreview;
