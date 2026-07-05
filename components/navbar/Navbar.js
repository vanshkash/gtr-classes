import Link from "next/link";
import MobileNav from "./MobileNav";
import AuthButtons from "./AuthButtons";
import getCurrentUser from "@/lib/getCurrentUser";
import UserMenu from "./UserMenu";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Notes", href: "/notes" },
  { name: "About Us", href: "/about" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact", href: "/contact" },
];

export default async function Navbar() {
  const currentUser = await getCurrentUser();
  const isLoggedIn = !!currentUser;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.webp" alt="GTR Classes" className="h-10 w-auto" />

            <span className="text-xl font-bold text-slate-900">
              GTR Classes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
relative text-sm font-medium text-slate-700
transition-all duration-300
hover:text-blue-600
after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0
after:bg-blue-600
after:transition-all after:duration-300
hover:after:w-full
"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoggedIn ? (
              <AuthButtons isLoggedIn={isLoggedIn} />
            ) : (
              <UserMenu />
            )}
          </div>

          {/* Mobile */}
          <MobileNav navLinks={navLinks} isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
}
