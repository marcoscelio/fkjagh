import { useState, useEffect, useRef } from "react";
import classNames from "classnames";

interface MenuProps {
  icon: any;
  items: MenuItem[];
  label?: any;
  position?: string;
}

interface MenuItem {
  action: () => void;
  label: string;
  id: number;
}

const Menu = (props: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mr-3 w-full" ref={menuRef}>
      <div
        className="flex justify-start items-center text-gray-800 focus:outline-none focus:text-gray-500 
                  cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="ml-3">{props.icon}</div>
        {props.label && <div className="mr-auto w-full">{props.label}</div>}
      </div>

      <div
        className={classNames(
          `absolute top-0 ${
            props.position
              ? props.position === "left"
                ? "left-0"
                : "right-0"
              : "right-0"
          } mt-2 w-48 bg-white rounded-md shadow-lg z-10`,
          {
            hidden: !isOpen,
          }
        )}
      >
        <div className="py-1">
          {props.items.map((item: MenuItem) => {
            return (
              <div key={item.id} className="hover:bg-gray-100">
                <div
                  className={classNames("block px-4 py-2 text-gray-800")}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
