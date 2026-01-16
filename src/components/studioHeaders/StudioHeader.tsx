"use client";

import Link from "next/link";
import "./style.scss";

const StudioHeader = () => {
  return (
    <header id="StudioHeader" className="header">
      <Link href="/" className="logo">
        CYCLE SAFARI
      </Link>
    </header>
  );
};

export default StudioHeader;
