import NoteForm from "../components/NoteForm";

export default function CreateNote({ onSave }) {
  return (
    <div className="page-content form-page">
      <NoteForm onSave={onSave} />
    </div>
  );
}
