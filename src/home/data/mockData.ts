import type { Capsule, CapsuleComment, User } from "../types";

export const ITEMS_PER_PAGE = 12;
export const AVATAR_COLORS = ["bg-violet-500", "bg-indigo-500", "bg-teal-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500"];

export const MOCK_USER: User = { id: 1, username: "Mosho", role: "admin" };

const CAPSULE_DESCRIPTIONS = [
  "Une journée au marché de Noël, entre odeurs de cannelle et lumières dorées.",
  "Recette secrète de grand-mère, une tarte aux pommes qui sent les dimanches d'automne.",
  "Randonnée dans les Alpes : six heures de montée pour un panorama qui coupe le souffle.",
  "Soirée jazz au caveau du vieux quartier, avec la contrebasse qui résonne dans les pierres.",
  "Coucher de soleil sur la Saône, les quais se teintent d'orange et la ville ralentit.",
  "Expo photo contemporaine au musée : des portraits qui défient le regard.",
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

export const MOCK_COMMENTS: CapsuleComment[] = [
  { id: 1, capsuleId: 1, author: "Bob", content: "Magnifique photo, j'adore l'atmosphère !", createdAt: new Date(Date.now() - 3600000).toISOString(), avatarColor: "bg-indigo-500" },
  { id: 2, capsuleId: 1, author: "Clara", content: "Tu as été là-bas en décembre ? C'est une de mes périodes préférées.", createdAt: new Date(Date.now() - 7200000).toISOString(), avatarColor: "bg-teal-500" },
  { id: 3, capsuleId: 1, author: "David", content: "Les lumières sont incroyables. Quel appareil tu as utilisé ?", createdAt: new Date(Date.now() - 86400000).toISOString(), avatarColor: "bg-rose-500" },
  { id: 4, capsuleId: 2, author: "Eva", content: "Ma grand-mère faisait pareil ! Ça me rappelle tellement de souvenirs.", createdAt: new Date(Date.now() - 1800000).toISOString(), avatarColor: "bg-amber-500" },
  { id: 5, capsuleId: 2, author: "Alice", content: "Est-ce qu'on peut avoir la recette complète ?", createdAt: new Date(Date.now() - 5400000).toISOString(), avatarColor: "bg-violet-500" },
  { id: 6, capsuleId: 3, author: "Bob", content: "Quelle ascension ! J'ai fait ce même sentier l'été dernier.", createdAt: new Date(Date.now() - 10800000).toISOString(), avatarColor: "bg-indigo-500" },
];
