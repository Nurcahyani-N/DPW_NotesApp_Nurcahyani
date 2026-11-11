import {
  Heart,
  Pencil,
  Trash2,
  RotateCcw,
  X,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/dateFormatter";

export default function NoteCard({
  note,
  onFavorite,
  onDelete,
  isTrash = false,
  onRestore,
  onDeleteForever,
}) {
  const navigate = useNavigate();

  return (
    <article className={`note-card note-${note.color || "apricot"}`}>
      <div className="note-card-top">
        <span className="category-pill">
          <span className="category-dot" />
          {note.category}
        </span>

        <button
          className={`icon-button favorite-button ${note.isFavorite ? "favorited" : ""}`}
          onClick={() => onFavorite(note.id)}
          title="Favorit"
          aria-label="Toggle favorit"
        >
          <Heart size={17} fill={note.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <button
        type="button"
        className="note-content-button"
        onClick={() => !isTrash && navigate(`/notes/${note.id}`)}
        disabled={isTrash}
      >
        {note.coverImage && (
          <img className="note-card-cover" src={note.coverImage} alt="" />
        )}
        <h3>{note.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: note.content || "" }} />
      </button>

      <div className="note-card-bottom">
        <span className="note-card-date">
          {note.eventDate && <CalendarDays size={11} />}
          {formatDate(note.eventDate || note.updatedAt || note.createdAt)}
        </span>

        <div className="note-actions">
          {isTrash ? (
            <>
              <button
                className="icon-button"
                onClick={() => onRestore(note.id)}
                title="Pulihkan"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="icon-button danger-icon"
                onClick={() => onDeleteForever(note.id)}
                title="Hapus permanen"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                className="icon-button"
                onClick={() => navigate(`/notes/${note.id}/edit`)}
                title="Edit"
              >
                <Pencil size={14} />
              </button>
              <button
                className="icon-button danger-icon"
                onClick={() => onDelete(note.id)}
                title="Pindahkan ke archive bin"
              >
                <Trash2 size={14} />
              </button>
              <button
                className="icon-button"
                onClick={() => navigate(`/notes/${note.id}`)}
                title="Lihat catatan"
              >
                <ArrowUpRight size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
