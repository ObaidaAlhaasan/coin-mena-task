import React, {FC} from "react";

interface IDropdownToggle {
  className: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DropdownToggle: FC<IDropdownToggle> = ({className, isOpen, setIsOpen, children}) => {
  const arrowIcon = isOpen ? <i className="fas fa-chevron-up ms-auto"/> : <i className="fas fa-chevron-down ms-auto"/>;

  return <div className={className} onClick={() => setIsOpen(!isOpen)}>
    <span>
      {children}
    </span>
    {arrowIcon}
  </div>
}

export default DropdownToggle;
