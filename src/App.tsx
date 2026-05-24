import { useState } from "react";
import { CapsuleCard } from "./home/components/CapsuleCard";
import { EmptyCapsulesState } from "./home/components/EmptyCapsulesState";
import { HomeHeader } from "./home/components/HomeHeader";
import { Navbar } from "./home/components/Navbar";
import { Pagination } from "./home/components/Pagination";
import { ToastContainer } from "./home/components/ToastContainer";
import { AVATAR_COLORS, ITEMS_PER_PAGE, MOCK_CAPSULES, MOCK_COMMENTS, MOCK_USER } from "./home/data/mockData";
import { useToast } from "./home/hooks/useToast";
import type { Capsule, CapsuleComment } from "./home/types";
import { CapsuleDetails } from "./home/components/CapsuleDetails";

export default function HomePage() {
  const [capsules, setCapsules] = useState<Capsule[]>(MOCK_CAPSULES);
  const [comments, setComments] = useState<CapsuleComment[]>(MOCK_COMMENTS);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toasts, addToast } = useToast();
  const favoriteCount = capsules.filter((capsule) => capsule.isLiked).length;
  const normalizedSearch = searchQuery.toLowerCase();
  const filteredCapsules = capsules.filter((capsule) => capsule.description.toLowerCase().includes(normalizedSearch) || capsule.username.toLowerCase().includes(normalizedSearch));
  const totalPages = Math.ceil(filteredCapsules.length / ITEMS_PER_PAGE);
  const paginatedCapsules = filteredCapsules.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const DetailsComments = selectedCapsule ? comments.filter((comment) => comment.capsuleId === selectedCapsule.id) : [];

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleLike = (id: number) => {
    const capsuleToUpdate = capsules.find((capsule) => capsule.id === id);
    if (!capsuleToUpdate) return;
    const isLiked = !capsuleToUpdate.isLiked;
    addToast(isLiked ? "❤️ Ajouté aux favoris" : "💔 Retiré des favoris");
    setCapsules((currentCapsules) => currentCapsules.map((capsule) => capsule.id === id ? { ...capsule, isLiked } : capsule));
    setSelectedCapsule((currentCapsule) => currentCapsule?.id === id ? { ...currentCapsule, isLiked } : currentCapsule);
  };

  const toggleBookmark = (id: number) => {
    const capsuleToUpdate = capsules.find((capsule) => capsule.id === id);
    if (!capsuleToUpdate) return;
    const isBookmarked = !capsuleToUpdate.isBookmarked;
    addToast(isBookmarked ? "🔖 Sauvegardé" : "🔖 Sauvegarde retirée");
    setCapsules((currentCapsules) => currentCapsules.map((capsule) => capsule.id === id ? { ...capsule, isBookmarked } : capsule));
    setSelectedCapsule((currentCapsule) => currentCapsule?.id === id ? { ...currentCapsule, isBookmarked } : currentCapsule);
  };

  const addComment = (capsuleId: number, content: string) => {
    const newComment: CapsuleComment = {
      id: Date.now(),
      capsuleId,
      author: MOCK_USER.username,
      content,
      createdAt: new Date().toISOString(),
      avatarColor: AVATAR_COLORS[MOCK_USER.id % AVATAR_COLORS.length],
    };
    setComments((currentComments) => [...currentComments, newComment]);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar user={MOCK_USER} favoriteCount={favoriteCount} searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HomeHeader capsuleCount={filteredCapsules.length} searchQuery={searchQuery} />
        {paginatedCapsules.length === 0 ? (
          <EmptyCapsulesState />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCapsules.map((capsule) => <CapsuleCard key={capsule.id} capsule={capsule} onToggleLike={toggleLike} onToggleBookmark={toggleBookmark} onOpen={setSelectedCapsule} />)}
          </div>
        )}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>
      <CapsuleDetails capsule={selectedCapsule} comments={DetailsComments} currentUser={MOCK_USER} onClose={() => setSelectedCapsule(null)} onToggleLike={toggleLike} onToggleBookmark={toggleBookmark} onAddComment={addComment} />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
