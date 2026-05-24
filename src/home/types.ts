export interface Capsule {
  id: number;
  description: string;
  imagePath: string;
  username: string;
  createdAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface CapsuleComment {
  id: number;
  capsuleId: number;
  author: string;
  content: string;
  createdAt: string;
  avatarColor: string;
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
