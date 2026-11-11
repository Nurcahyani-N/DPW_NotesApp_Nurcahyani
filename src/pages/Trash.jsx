import { Trash2 } from "lucide-react";
import NoteCard from "../components/NoteCard";
import EmptyState from "../components/EmptyState";

export default function Trash({ notes, actions }) {
  const deleted = notes.filter((note) => note.isDeleted);
  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">OUT OF SIGHT, NOT YET GONE</span>
          <h2>
            Tempat sampah <Trash2 className="inline-heart" size={22} />
          </h2>
          <p>Catatan yang dihapus bisa dipulihkan kapan saja.</p>
        </div>
        {deleted.length > 0 && (
          <button
            className="outline-button"
            onClick={() => {
              if (
                confirm("Hapus semua catatan di tempat sampah secara permanen?")
              )
                actions.emptyTrash();
            }}
          >
            Kosongkan Sampah
          </button>
        )}
      </div>
      {deleted.length ? (
        <div className="notes-grid">
          {deleted.map((note) => (
            <NoteCard key={note.id} note={note} isTrash {...actions} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Tempat sampah kosong"
          description="Catatan yang kamu hapus akan muncul di sini."
        />
      )}
    </div>
  );
}
