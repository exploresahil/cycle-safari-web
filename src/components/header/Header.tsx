"use client";

import "./style.scss";
import useResponsive from "@/hooks/useResponsive";
import MobileNav from "./mobile/MobileNav";
import DesktopNav from "./desktop/DesktopNav";
import { headerHeight } from "@/constants/header";
import Link from "next/link";

const Header = () => {
  const { isMounted, isLaptop, isDesktop } = useResponsive();

  if (!isMounted)
    return (
      <header
        id="Header"
        style={{
          height: isLaptop ? headerHeight.laptop : headerHeight.mobile,
        }}
      ></header>
    );

  return (
    <header
      id="Header"
      style={{
        height: isLaptop ? headerHeight.laptop : headerHeight.mobile,
      }}
    >
      <Link href="/" className="logo">
        CYCLE SAFARI
      </Link>
      {isLaptop ? <DesktopNav /> : isDesktop ? <DesktopNav /> : <MobileNav />}
    </header>
  );
};

export default Header;
