import { NotebookPen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmptyState({
  title = "Belum ada catatan",
  description = "Mulai tulis ide pertamamu sekarang.",
}) {
  const navigate = useNavigate();
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <NotebookPen size={28} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="primary-button" onClick={() => navigate("/notes/new")}>
        Buat Catatan
      </button>
    </div>
  );
}
