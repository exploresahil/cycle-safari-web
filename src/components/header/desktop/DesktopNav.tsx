"use client";

import "./style.scss";
import { NavData } from "../data.db";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const DesktopNav = () => {
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>(
    {}
  );

  const [openSubSubmenus, setOpenSubSubmenus] = useState<{
    [key: number]: boolean;
  }>({});

  return (
    <nav id="DesktopNav">
      {NavData.map((item, index) => {
        const isSubmenu = item.submenu && item.submenu.length > 0;
        const isHrefOnly = item.href && !isSubmenu;

        if (item.href && isHrefOnly)
          return (
            <Link key={index} href={item.href}>
              {item.label}
            </Link>
          );

        if (isSubmenu) {
          return (
            <div
              key={index}
              className="nav_item"
              onMouseEnter={() =>
                setOpenSubmenus({ ...openSubmenus, [index]: true })
              }
              onMouseLeave={() =>
                setOpenSubmenus({ ...openSubmenus, [index]: false })
              }
            >
              <div className="nav_item_label">
                <p>{item.label}</p>
                <ChevronDown size={22} />
              </div>
              {openSubmenus[index] && (
                <div className="nav_item_submenu_container">
                  <div className="nav_item_submenu">
                    {item.submenu &&
                      item.submenu.map((subItem, subIndex) => {
                        const isSubSubmenu =
                          subItem.submenu && subItem.submenu.length > 0;

                        if (subItem.href)
                          return (
                            <Link key={subIndex} href={subItem.href}>
                              {subItem.label}
                            </Link>
                          );
                        if (isSubSubmenu)
                          return (
                            <div key={subIndex} className="nav_item_label">
                              <p>{subItem.label}</p>
                              <ChevronDown size={22} />
                            </div>
                          );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        }
      })}
    </nav>
  );
};

export default DesktopNav;
