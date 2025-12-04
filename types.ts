export interface VideoItem {
  id: string;
  title: string;
  views: string;
  thumbnail: string;
  category: string;
}

export interface EventItem {
  id: string;
  title: string;
  location: string;
  image: string;
  size: 'small' | 'large' | 'tall' | 'wide';
}

export interface Partner {
  name: string;
  logoText: string;
}
