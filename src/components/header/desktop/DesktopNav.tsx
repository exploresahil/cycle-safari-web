"use client";

import "./style.scss";
import { NavData } from "../data.db";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Debug flag to keep all menus open
const DEBUG_OPEN_ALL = false;

const DesktopNav = () => {
  // Initialize all menus as open if in debug mode
  const initialMenuState = DEBUG_OPEN_ALL
    ? NavData.reduce<{ [key: number]: boolean }>((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {})
    : {};

  const initialSubMenuState = DEBUG_OPEN_ALL
    ? NavData.reduce<{ [key: number]: boolean }>((acc, item, index) => {
        if (item.submenu) {
          item.submenu.forEach((_, subIndex) => {
            const menuIndex = index * 100 + subIndex;
            acc[menuIndex] = true;
          });
        }
        return acc;
      }, {})
    : {};

  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>(
    initialMenuState
  );
  const [openSubSubmenus, setOpenSubSubmenus] = useState<{
    [key: number]: boolean;
  }>(initialSubMenuState);

  const handleMouseEnter = (index: number) => {
    if (!DEBUG_OPEN_ALL) {
      setOpenSubmenus((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleMouseLeave = (index: number) => {
    if (!DEBUG_OPEN_ALL) {
      setOpenSubmenus((prev) => ({ ...prev, [index]: false }));
      setOpenSubSubmenus({});
    }
  };

  const handleSubItemMouseEnter = (index: number) => {
    if (!DEBUG_OPEN_ALL) {
      setOpenSubSubmenus((prev) => ({ ...prev, [index]: true }));
    }
  };

  const handleSubItemMouseLeave = (index: number) => {
    if (!DEBUG_OPEN_ALL) {
      setOpenSubSubmenus((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <nav id="DesktopNav">
      {NavData.map((item, index) => {
        const isSubmenu = item.submenu && item.submenu.length > 0;
        const isHrefOnly = item.href && !isSubmenu;

        if (isHrefOnly && item.href) {
          return (
            <Link key={index} href={item.href} className="nav_link">
              {item.label}
            </Link>
          );
        }

        if (isSubmenu && item.submenu) {
          return (
            <div
              key={index}
              className={`nav_item ${openSubmenus[index] ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="nav_item_label">
                <p>{item.label}</p>
                <ChevronDown
                  size={22}
                  className={openSubmenus[index] ? "rotated" : ""}
                />
              </div>
              <div
                className={`nav_item_submenu_container ${
                  openSubmenus[index] ? "show" : ""
                }`}
              >
                <div className="nav_item_submenu">
                  {item.submenu.map((subItem, subIndex) => {
                    const isSubSubmenu =
                      subItem.submenu && subItem.submenu.length > 0;

                    if (subItem.href && !isSubSubmenu) {
                      return (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className="submenu_link"
                        >
                          {subItem.label}
                        </Link>
                      );
                    }

                    if (isSubSubmenu && subItem.submenu) {
                      const menuIndex = index * 100 + subIndex;
                      return (
                        <div
                          key={subIndex}
                          className={`submenu_item ${
                            openSubSubmenus[menuIndex] ? "active" : ""
                          }`}
                          onMouseEnter={() =>
                            handleSubItemMouseEnter(menuIndex)
                          }
                          onMouseLeave={() =>
                            handleSubItemMouseLeave(menuIndex)
                          }
                        >
                          <div className="submenu_item_label">
                            <p>{subItem.label}</p>
                            <ChevronDown
                              size={18}
                              className={
                                openSubSubmenus[menuIndex] ? "rotated" : ""
                              }
                            />
                          </div>
                          <div
                            className={`sub_submenu_container ${
                              openSubSubmenus[menuIndex] ? "show" : ""
                            }`}
                          >
                            {subItem.submenu.map(
                              (subSubItem, subSubIndex) =>
                                subSubItem.href && (
                                  <Link
                                    key={subSubIndex}
                                    href={subSubItem.href}
                                    className="sub_submenu_link"
                                  >
                                    {subSubItem.label}
                                  </Link>
                                )
                            )}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>
          );
        }

        return null;
      })}
    </nav>
  );
};

export default DesktopNav;
