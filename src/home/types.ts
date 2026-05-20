export interface Capsule {
  id: number;
  description: string;
  imagePath: string;
  username: string;
  createdAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface User {
  id: number;
  username: string;
  role: "admin" | "user";
}

export interface ToastItem {
  id: number;
  message: string;
}
