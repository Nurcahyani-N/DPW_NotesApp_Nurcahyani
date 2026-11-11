import { ArrowLeft, CalendarDays, Heart, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/dateFormatter";

export default function ViewNote({ notes, actions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((item) => item.id === id && !item.isDeleted);

  if (!note) {
    return (
      <div className="page-content">
        <div className="empty-state">
          <h3>Catatan tidak ditemukan</h3>
          <button className="primary-button" onClick={() => navigate("/notes")}>
            Kembali ke catatan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content note-view-page">
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Kembali
      </button>

      <article className={`note-view-card note-${note.color || "apricot"}`}>
        <div className="note-view-top">
          <span className="category-pill">
            <span className="category-dot" />
            {note.category}
          </span>
          <button
            className={`icon-button favorite-button ${note.isFavorite ? "favorited" : ""}`}
            onClick={() => actions.onFavorite(note.id)}
            aria-label="Simpan ke Saved Moments"
            title="Saved Moments"
          >
            <Heart size={19} fill={note.isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {note.coverImage && (
          <img
            className="note-view-cover"
            src={note.coverImage}
            alt="Gambar catatan"
          />
        )}
        <h2>{note.title}</h2>

        <div className="note-view-meta">
          <span>
            <CalendarDays size={14} />{" "}
            {formatDate(note.eventDate || note.createdAt)}
          </span>
          <span>
            Terakhir diperbarui: {formatDate(note.updatedAt || note.createdAt)}
          </span>
        </div>

        <div
          className="note-view-content"
          dangerouslySetInnerHTML={{ __html: note.content || "" }}
        />

        <div className="note-view-actions">
          <button
            className="note-view-action note-edit-action"
            onClick={() => navigate(`/notes/${note.id}/edit`)}
          >
            <Pencil size={15} /> Edit catatan
          </button>
          <button
            className="note-view-action note-delete-action"
            onClick={() => {
              actions.onDelete(note.id);
              navigate("/notes");
            }}
          >
            <Trash2 size={15} /> Pindahkan ke archive bin
          </button>
        </div>
      </article>
    </div>
  );
}
