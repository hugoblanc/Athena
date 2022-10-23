import { Share } from '@capacitor/share';
import { environment } from '../../../environments/environment';

export function shareContent(key: string, contentId: number, title: string) {
  return Share.share({
    title,
    text: "J'ai trouvé ça sur Athena app: ",
    url: `${environment.webAppUrl}share/${key}/${contentId}`,
    dialogTitle: 'Informes tes amis',
  });
}
