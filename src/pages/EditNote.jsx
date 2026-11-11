import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";

export default function EditNote({ notes, onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((item) => item.id === id && !item.isDeleted);
  if (!note)
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
  return (
    <div className="page-content form-page">
      <NoteForm initialNote={note} onSave={(updates) => onSave(id, updates)} />
    </div>
  );
}
