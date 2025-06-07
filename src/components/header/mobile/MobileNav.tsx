"use client";

import "./style.scss";
import { AlignJustify, ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { mobileNavVariants, submenuVariants } from "./anime";
import { NavData } from "../data.db";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [openSubSubmenus, setOpenSubSubmenus] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSubmenu = (indexToToggle: number) => {
    setOpenSubmenus((prev) => {
      const newState: { [key: number]: boolean } = {};
      for (const key in prev) {
        if (parseInt(key) !== indexToToggle) {
          newState[parseInt(key)] = false;
        }
      }
      newState[indexToToggle] = !prev[indexToToggle];
      return newState;
    });
    setOpenSubSubmenus({}); // Close all deeper sub-submenus when a main submenu is toggled
  };

  const toggleSubSubmenu = (indexToToggle: number) => {
    setOpenSubSubmenus((prev) => {
      const newState: { [key: number]: boolean } = {};
      for (const key in prev) {
        if (parseInt(key) !== indexToToggle) {
          newState[parseInt(key)] = false;
        }
      }
      newState[indexToToggle] = !prev[indexToToggle];
      return newState;
    });
  };

  // Helper function to close all menus
  const closeAllMenus = () => {
    setIsOpen(false);
    setOpenSubmenus({});
    setOpenSubSubmenus({});
  };

  return (
    <div id="MobileNav">
      <button onClick={() => setIsOpen(true)}>
        <AlignJustify size={30} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.nav
            variants={mobileNavVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <button className="close_btn" onClick={closeAllMenus}>
              <X size={30} />
            </button>
            <ul className="nav_list">
              {NavData.map((item, index) => {
                const isSubmenu = item.submenu && item.submenu.length > 0;
                const isHrefOnly = item.href && !isSubmenu;

                return (
                  <li key={index}>
                    <div className="nav_item">
                      {item.href && isHrefOnly ? (
                        <Link href={item.href} onClick={closeAllMenus}>
                          {item.label}
                        </Link>
                      ) : (
                        <p>{item.label}</p>
                      )}
                      {isSubmenu && (
                        <button onClick={() => toggleSubmenu(index)}>
                          <ChevronDown
                            size={22}
                            style={{
                              transform: openSubmenus[index]
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease-in-out",
                            }}
                          />
                        </button>
                      )}
                    </div>
                    {isSubmenu && (
                      <AnimatePresence initial={false}>
                        {openSubmenus[index] && (
                          <motion.ul
                            variants={submenuVariants}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="submenu"
                          >
                            {item.submenu &&
                              item.submenu.map((subItem, subIndex) => {
                                const isSubSubmenu =
                                  subItem.submenu && subItem.submenu.length > 0;

                                return (
                                  <li key={subIndex}>
                                    <div className="nav_item">
                                      {subItem.href ? (
                                        <Link
                                          href={subItem.href}
                                          onClick={closeAllMenus}
                                        >
                                          {subItem.label}
                                        </Link>
                                      ) : (
                                        <p>{subItem.label}</p>
                                      )}
                                      {isSubSubmenu && (
                                        <button
                                          onClick={() =>
                                            toggleSubSubmenu(subIndex)
                                          }
                                        >
                                          <ChevronDown
                                            size={22}
                                            style={{
                                              transform: openSubSubmenus[
                                                subIndex
                                              ]
                                                ? "rotate(180deg)"
                                                : "rotate(0deg)",
                                              transition:
                                                "transform 0.3s ease-in-out",
                                            }}
                                          />
                                        </button>
                                      )}
                                    </div>
                                    {isSubSubmenu && (
                                      <AnimatePresence>
                                        {openSubSubmenus[subIndex] && (
                                          <motion.ul
                                            variants={submenuVariants}
                                            initial="hidden"
                                            animate="show"
                                            exit="hidden"
                                            className="sub_submenu"
                                          >
                                            {subItem.submenu?.map(
                                              (subSubItem, subSubIndex) => {
                                                return (
                                                  <li key={subSubIndex}>
                                                    {subSubItem.href ? (
                                                      <Link
                                                        href={subSubItem.href}
                                                        onClick={closeAllMenus}
                                                      >
                                                        {subSubItem.label}
                                                      </Link>
                                                    ) : (
                                                      <p>{subSubItem.label}</p>
                                                    )}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </motion.ul>
                                        )}
                                      </AnimatePresence>
                                    )}
                                  </li>
                                );
                              })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
