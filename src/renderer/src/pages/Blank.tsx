import { Link } from "react-router-dom";

export function Blank() {
  return (
    <div>
      <h1 className="text-rotion-100 text-5xl">Hello</h1>
      <Link to="/document">CLique aqui</Link>
    </div>
  );
}
