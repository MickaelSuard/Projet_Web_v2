import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface CreateCapsuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (description: string, imagePath: string) => void;
}

export function CreateCapsuleModal({ isOpen, onClose, onCreate }: Readonly<CreateCapsuleModalProps>) {
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDescription = description.trim();
    if (!trimmedDescription || !imagePreview) return;
    onCreate(trimmedDescription, imagePreview);
    setDescription("");
    setImagePreview("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Créer une capsule</h2>
          <button onClick={onClose} type="button" className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>
        <label className="mb-4 flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50">
          {imagePreview ? <img src={imagePreview} alt="Aperçu" className="h-full w-full object-cover" /> : <span className="flex items-center gap-2 text-sm font-medium"><ImagePlus className="h-5 w-5" />Ajouter une image</span>}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={5} placeholder="Décris ta capsule..." className="mb-4 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-indigo-400" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} type="button" className="cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100">Annuler</button>
          <button disabled={!description.trim() || !imagePreview} type="submit" className="cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">Créer</button>
        </div>
      </form>
    </div>
  );
}
