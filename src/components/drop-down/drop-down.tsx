import React, {FC} from "react";
import "./drop-down.scss";

interface IDropDown {
  className?: string;
}

export const Dropdown: FC<IDropDown> = ({className, children}) => {
  return <div className={`dropdown-menu ${className} overflow-auto`}>
    {children}
  </div>
}
