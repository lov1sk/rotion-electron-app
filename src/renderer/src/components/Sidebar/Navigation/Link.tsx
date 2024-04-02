import clsx from "clsx";
import { DotsThree } from "phosphor-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: ReactNode;
}

export function Link({ children, to }: LinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        // Retornamos a classe dessa função, porem podemos usar das propriedades do navlink para determinar se o link esta ativo ou nao
        return clsx(
          "flex items-center text-sm gap-2 text-rotion-100 hover:text-rotion-50 py-1 px-3 rounded group hover:bg-rotion-700",
          {
            /** Caso o link esteja ativo, aplica essa cor de fundo */
          },
          { "bg-rotion-700": isActive }
        );
      }}
    >
      <span className="truncate flex-1">{children}</span>

      <div className="flex items-center h-full group-hover:visible ml-auto text-rotion-100">
        <button className="px-px rounded-sm hover:bg-rotion-500">
          <DotsThree weight="bold" className="h-4 w-4" />
        </button>
      </div>
    </NavLink>
  );
}
