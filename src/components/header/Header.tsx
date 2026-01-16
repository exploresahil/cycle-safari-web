"use client";

import "./style.scss";
import useResponsive from "@/hooks/useResponsive";
import MobileNav from "./mobile/MobileNav";
import DesktopNav from "./desktop/DesktopNav";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { logUserRoles } from "@/utils/getUser";
import { useUser } from "@auth0/nextjs-auth0";

const Header = () => {
  const { isMounted, isLaptop, isDesktop } = useResponsive();

  if (!isMounted)
    return (
      <header id="Header">
        <Link href="/" className="logo">
          CYCLE SAFARI
        </Link>
      </header>
    );

  return (
    <header id="Header" className="header">
      <Link href="/" className="logo">
        CYCLE SAFARI
      </Link>
      {isLaptop ? <DesktopNav /> : isDesktop ? <DesktopNav /> : <MobileNav />}
    </header>
  );
};

export default Header;
