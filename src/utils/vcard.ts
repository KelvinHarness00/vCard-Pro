
import { VCardData } from '@/contexts/VCardContext';

export function generateVCard(data: VCardData): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name}`,
    `ORG:${data.profession}`,
    `EMAIL:${data.email}`,
    `TEL:${data.phone}`,
    `NOTE:${data.bio}`,
    `URL:${data.socialLinks.linkedin}`,
    'END:VCARD'
  ].join('\n');

  return vcard;
}
