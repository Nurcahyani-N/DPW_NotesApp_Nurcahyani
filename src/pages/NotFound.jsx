import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <SearchX size={30} />
        </div>
        <span className="not-found-label">OOPS! PAGE NOT FOUND</span>
        <h1>404</h1>
        <h2>This page is nowhere to be found.</h2>
        <p>
          Looks like this little corner of your space doesn't exist. Maybe the
          address is incorrect, or the page has moved.
        </p>
        <div className="not-found-actions">
          <button type="button" onClick={() => navigate("/dashboard")}>
            <Home size={16} /> Back to dashboard
          </button>
          <button
            type="button"
            className="not-found-back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} /> Go back
          </button>
        </div>
        <span className="not-found-footer">
          YOUR THOUGHTS, YOUR SPACE — NOTESPACE
        </span>
      </div>
    </section>
  );
}
