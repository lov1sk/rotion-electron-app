import { Link } from "react-router-dom";

export function Blank() {
  return (
    <div className="h-full grid place-content-center">
      <Link to="/document" className="text-rotion-300 text-sm">
        Selecione ou crie um novo documento
      </Link>
    </div>
  );
}
