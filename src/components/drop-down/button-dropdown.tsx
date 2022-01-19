import React, {FC, ReactNode, useState} from 'react';
import DropdownMenu from "./drop-down-menu";
import DropdownToggle from "./drop-down-toggle";

interface IDropDownProps {
  label: string;
  className: string;
  items: ReactNode[];
}

const ButtonDropdown: FC<IDropDownProps> = ({label, className, items, children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <DropdownToggle className={className} isOpen={isOpen} setIsOpen={setIsOpen}>
        Trade
      </DropdownToggle>

      <DropdownMenu isOpen={isOpen}>
        {items.map(i => i)}
      </DropdownMenu>
    </div>
  );
};

export default ButtonDropdown;
