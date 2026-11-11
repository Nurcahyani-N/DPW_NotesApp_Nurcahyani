import { Heart } from "lucide-react";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";

export default function Favorites({ notes, actions }) {
  const favorites = notes.filter((note) => !note.isDeleted && note.isFavorite);
  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">KEEP THEM CLOSE</span>
          <h2>
            Catatan favorit <Heart className="inline-heart" size={22} />
          </h2>
          <p>Hal-hal yang ingin kamu temukan dengan cepat.</p>
        </div>
      </div>
      {favorites.length ? (
        <div className="notes-grid">
          {favorites.map((note) => (
            <NoteCard key={note.id} note={note} {...actions} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Belum ada catatan favorit"
          description="Tekan ikon hati pada catatan untuk menyimpannya di sini."
        />
      )}
    </div>
  );
}
