"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", external: false },
    { href: "/about", label: "About", external: false },
    {
      href: "https://www.linkedin.com/in/kayzhang34/",
      label: "LinkedIn",
      external: true,
    },
    { href: "https://github.com/KayZhang34/", label: "Github", external: true },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-sm border border-gray-200">
        <ul className="flex items-center gap-8 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href} className="flex items-center gap-2">
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                )}
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className={`transition-colors ${
                      isActive
                        ? "font-medium text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
