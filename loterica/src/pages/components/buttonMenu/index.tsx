import React from "react";
import { IoMenu } from "react-icons/io5";

interface ToggleMenuButtonProps {
  isHidden: boolean;
  toggle: () => void;
}

const MenuButton: React.FC<ToggleMenuButtonProps> = ({ isHidden, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`menu-toggle-btn ${!isHidden ? 'menu-aberto' : ''}`}
    >
      <IoMenu size={25} />
    </button>
  );
};

export default MenuButton;
