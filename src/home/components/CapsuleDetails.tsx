import { ArrowUp, Bookmark, Heart, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AVATAR_COLORS } from "../data/mockData";
import type { Capsule, CapsuleComment, User } from "../types";
import { timeAgo } from "../utils/timeAgo";

interface CapsuleDetailsProps {
  capsule: Capsule | null;
  comments: CapsuleComment[];
  currentUser: User;
  onClose: () => void;
  onToggleLike: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onAddComment: (capsuleId: number, content: string) => void;
}

export function CapsuleDetails({ capsule, comments, currentUser, onClose, onToggleLike, onToggleBookmark, onAddComment }: Readonly<CapsuleDetailsProps>) {
  const [visible, setVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (capsule) requestAnimationFrame(() => setVisible(true));
    else setVisible(false);
    setCommentText("");
  }, [capsule]);

  useEffect(() => {
    document.body.style.overflow = capsule ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [capsule]);

  const handleSubmitComment = () => {
    const trimmedComment = commentText.trim();
    if (!trimmedComment || !capsule) return;
    onAddComment(capsule.id, trimmedComment);
    setCommentText("");
    setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (!capsule) return null;

  const date = new Date(capsule.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <button aria-label="Fermer" tabIndex={0} onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${visible ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative h-56 shrink-0 overflow-hidden bg-slate-200">
          <img src={capsule.imagePath} alt={capsule.description} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
          <button onClick={onClose} className=" cursor-pointer absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60" aria-label="Fermer" type="button">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/20 text-xs font-bold text-white backdrop-blur-sm">{capsule.username[0].toUpperCase()}</div>
            <div>
              <p className="text-xs font-semibold leading-none text-white">{capsule.username}</p>
              <p className="mt-0.5 text-xs text-white/70">{date}</p>
            </div>
          </div>
          <div className="absolute bottom-3 right-4 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 backdrop-blur-sm">
            <button onClick={() => onToggleLike(capsule.id)} className={` cursor-pointer flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all ${capsule.isLiked ? "text-rose-400" : "text-white/80 hover:text-rose-300"}`} type="button">
              <Heart className={`h-4 w-4 transition-all ${capsule.isLiked ? "scale-110 fill-current" : "fill-none"}`} />
            </button>
            <div className="h-4 w-px bg-white/20" />
            <button onClick={() => onToggleBookmark(capsule.id)} className={`cursor-pointer flex items-center rounded-full px-2 py-1 transition-all ${capsule.isBookmarked ? "text-amber-400" : "text-white/80 hover:text-amber-300"}`} type="button">
              <Bookmark className={`h-3.5 w-3.5 ${capsule.isBookmarked ? "fill-current" : "fill-none"}`} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-slate-100 px-5 pb-4 pt-5">
            <p className="text-sm leading-relaxed text-slate-800">{capsule.description}</p>
          </div>
          <div className="px-5 py-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">{comments.length} commentaire{comments.length !== 1 ? "s" : ""}</h3>
            {comments.length === 0 ? (
              <div className="py-8 text-center text-slate-400">
                <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-40" strokeWidth={1.5} />
                <p className="text-sm">Sois le premier à commenter</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="group flex gap-3">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${comment.avatarColor} text-xs font-bold text-white`}>{comment.author[0].toUpperCase()}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-semibold text-slate-800">{comment.author}</span>
                        <span className="text-xs text-slate-400">{timeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{comment.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={commentsEndRef} />
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3">
          <div className="flex items-end gap-2">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${AVATAR_COLORS[currentUser.id % AVATAR_COLORS.length]} text-xs font-bold text-white`}>{currentUser.username[0].toUpperCase()}</div>
            <div className="relative flex-1">
              <textarea value={commentText} onChange={(event) => setCommentText(event.target.value)} onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  handleSubmitComment();
                }
              }} placeholder="Ajouter un commentaire..." rows={1} className="w-full resize-none rounded-xl border border-transparent bg-slate-100 px-3 py-2 pr-10 text-sm transition-all placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none" style={{ maxHeight: "120px" }} />
              <button onClick={handleSubmitComment} disabled={!commentText.trim()} className=" not-disabled:cursor-pointer absolute bottom-3 right-2 flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors disabled:bg-slate-300" type="button">
                <ArrowUp className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          <p className="ml-9 mt-1.5 text-xs text-slate-400">Entrée pour envoyer · Maj+Entrée pour sauter une ligne</p>
        </div>
      </aside>
    </>
  );
}
