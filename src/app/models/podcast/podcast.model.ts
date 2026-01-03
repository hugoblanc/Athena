export interface Podcast {
  id: number;
  contentId: number;
  dialogueText: string;
  audioUrl: string;
  duration: number | null;
  status: string;
  createdAt: Date;
  content: {
    id: number;
    contentId: string;
    title: string;
    meta_media: {
      id: number;
      key: string;
      title: string;
      logo: string;
    };
    image?: {
      id: number;
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface PodcastListResponse {
  data: Podcast[];
  meta: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
  };
}
