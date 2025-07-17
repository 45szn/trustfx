"use client";

import Link from "next/link";
import NProgress from "nprogress";
import { ReactNode, MouseEvent } from "react";

interface LinkWithLoaderProps {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

const LinkWithLoader = ({
  href,
  children,
  className,
  style,
  onClick,
}: LinkWithLoaderProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    NProgress.start();
    if (onClick) onClick(e); // Call the parent click handler too
  };

  return (
    <Link href={href} className={className} onClick={handleClick} style={style}>
      {children}
    </Link>
  );
};

export default LinkWithLoader;
