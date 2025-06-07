"use client";

import "./style.scss";
import useResponsive from "@/hooks/useResponsive";
import MobileNav from "./mobile/MobileNav";
import DesktopNav from "./desktop/DesktopNav";

const Header = () => {
  const { isMounted, isLaptop } = useResponsive();

  if (!isMounted) return null;

  return (
    <header id="Header">
      <img src="/assets/logo/cycle_safari.png" alt="Cycle Safari" />
      {isLaptop ? <DesktopNav /> : <MobileNav />}
    </header>
  );
};

export default Header;
