import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import NotesToolbar from "../components/NotesToolbar";
import EmptyState from "../components/EmptyState";

export default function AllNotes({ notes, actions }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sort, setSort] = useState("newest");
  const filtered = useMemo(() => {
    let result = notes.filter((note) => !note.isDeleted);
    if (category !== "Semua")
      result = result.filter((note) => note.category === category);
    if (search.trim())
      result = result.filter((note) =>
        `${note.title} ${note.content}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    return result.sort((a, b) =>
      sort === "oldest"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : sort === "az"
          ? a.title.localeCompare(b.title)
          : new Date(b.updatedAt) - new Date(a.updatedAt),
    );
  }, [notes, search, category, sort]);
  return (
    <div className="page-content">
      <div className="page-title-row">
        <div>
          <span className="eyebrow">YOUR COLLECTION</span>
          <h2>
            Semua catatan{" "}
            <span className="count-bubble">{filtered.length}</span>
          </h2>
          <p>Kumpulan catatan kecil yang berarti.</p>
        </div>
        <button
          className="primary-button"
          onClick={() => navigate("/notes/new")}
        >
          <Plus size={17} /> Catatan Baru
        </button>
      </div>
      <NotesToolbar
        {...{ search, setSearch, category, setCategory, sort, setSort }}
      />
      {filtered.length ? (
        <div className="notes-grid">
          {filtered.map((note) => (
            <NoteCard key={note.id} note={note} {...actions} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Catatan tidak ditemukan"
          description={
            search
              ? "Coba kata kunci lain atau ubah filter kategori."
              : "Belum ada catatan pada kategori ini."
          }
        />
      )}
    </div>
  );
}
