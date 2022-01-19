import {FC} from "react";

interface IDropdownMenu {
  isOpen: boolean;
}

const DropdownMenu: FC<IDropdownMenu> = ({isOpen, children}) => {
  if (!isOpen)
    return null;

  return <div className="d-flex flex-column">
    {children}
  </div>
}

export default DropdownMenu;
