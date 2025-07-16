"use client";

import { useState } from "react";
// import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LinkWithLoader from "../LinkWithLoader";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Plans", href: "/plans" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
    { name: "Register", href: "/register" },
  ];

  return (
    <nav className="fixed top-0 w-full px-4 z-50 backdrop-blur-md border-b border-gray-800 xl:px-0">
      <div className="w-full opacity-100">
        <div className="flex container mx-auto items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <LinkWithLoader
              href="/"
              className="text-[#161616] font-bold text-xl tracking-wider transition-colors duration-300 lg:text-2xl"
            >
              TrustFx
            </LinkWithLoader>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) =>
                item.name === "Register" ? (
                  <LinkWithLoader key={item.name} href={item.href}>
                    <Button className="bg-white text-gray-900 hover:text-gray-50 hover:bg-gray-800 font-semibold  transition-all">
                      {item.name}
                    </Button>
                  </LinkWithLoader>
                ) : (
                  <LinkWithLoader
                    key={item.name}
                    href={item.href}
                    className="relative px-3 py-2 text-sm text-[#161616] font-medium transition-all duration-300 group lg:text-base"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#161616] transition-all duration-300 group-hover:w-full"></span>
                  </LinkWithLoader>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-[#161616] hover:text-[#161616] transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute inset-0 !w-full !h-full transition-all duration-300 cursor-pointer ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-64 opacity-100 backdrop-blur-sm" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-gray-800">
          {navItems.map((item, index) =>
            item.name === "Register" ? (
              <LinkWithLoader
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block max-w-[30rem] px-3 py-2 font-semibold text-center text-white bg-[#161616] hover:bg-gray-700 rounded-md transition-all duration-300 transform ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
              >
                {item.name}
              </LinkWithLoader>
            ) : (
              <LinkWithLoader
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium text-[#161616] hover:bg-gray-200 rounded-md transition-all duration-300 transform z-10 ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
              >
                {item.name}
              </LinkWithLoader>
            )
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 md:hidden transiton-all duration-300 z-[-20]"
          onClick={() => setIsOpen(false)}
          style={{ top: "57px" }}
        />
      )}
    </nav>
  );
}