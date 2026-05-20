import type { Capsule, User } from "../types";

export const ITEMS_PER_PAGE = 12;

export const MOCK_USER: User = {
  id: 1,
  username: "Mosho",
  role: "admin",
};

const CAPSULE_DESCRIPTIONS = [
  "Une journée au marché de Noël",
  "Recette secrète de grand-mère",
  "Randonnée dans les Alpes",
  "Soirée jazz au caveau",
  "Coucher de soleil sur la Saône",
  "Expo photo contemporaine",
];

const AUTHORS = ["Alice", "Bob", "Clara", "David", "Eva"];

export const MOCK_CAPSULES: Capsule[] = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  description: CAPSULE_DESCRIPTIONS[index % CAPSULE_DESCRIPTIONS.length],
  imagePath: `https://picsum.photos/400/300?random=${Math.random()}`,
  //imagePath: `https://picsum.photos/seed/${index + 20}/400/300`,
  username: AUTHORS[index % AUTHORS.length],
  createdAt: new Date(Date.now() - index * 86400000 * 2).toISOString(),
  isLiked: index % 3 === 0,
  isBookmarked: index % 5 === 0,
}));
