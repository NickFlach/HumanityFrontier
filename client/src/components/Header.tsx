import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  
  const closeMenu = () => setOpen(false);
  
  const navLinks = [
    { href: "#enigma", label: "THE ENIGMA" },
    { href: "#glyphs", label: "GLYPHS" },
    { href: "#prevention", label: "PREVENTION" },
    { href: "#cipher", label: "CIPHER" },
    { href: "#legacy", label: "LEGACY" },
  ];
  
  const pageLinks = [
    { href: "/", label: "HOME" },
    { href: "/quantum-dashboard", label: "DASHBOARD" },
  ];

  const scrollToSection = (id: string) => {
    closeMenu();
    const element = document.getElementById(id.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8 border-b border-[#4cc9f0]/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="quantum-shield bg-[#7b2cbf]/20 w-10 h-10 flex items-center justify-center">
              <div className="quantum-shield bg-[#4cc9f0]/30 w-6 h-6"></div>
            </div>
            <h1 className="text-xl font-space font-bold text-[#4cc9f0]">QUANTUM SHIELD</h1>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-space text-sm tracking-wider hover:text-[#4cc9f0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="h-6 w-px bg-[#4cc9f0]/30"></div>
          
          <nav className="flex space-x-6">
            {pageLinks.map(link => (
              <Link 
                key={link.href}
                href={link.href}
                className="font-space text-sm tracking-wider text-[#7b2cbf] hover:text-[#4cc9f0] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0f0f1a] border-[#4cc9f0]/20 p-0">
            <div className="flex flex-col pt-12 px-6">
              <div className="mb-4 pb-4 border-b border-[#4cc9f0]/20">
                <h3 className="text-[#4cc9f0] text-sm font-space mb-3">PAGES</h3>
                {pageLinks.map(link => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                  >
                    <a className="font-space text-xl py-3 block text-[#7b2cbf] hover:text-[#4cc9f0] transition-colors">
                      {link.label}
                    </a>
                  </Link>
                ))}
              </div>
              
              <h3 className="text-[#4cc9f0] text-sm font-space mb-3">NAVIGATION</h3>
              {navLinks.map(link => (
                <a 
                  key={link.href}
                  href={link.href} 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="font-space text-xl py-3 border-b border-[#4cc9f0]/10 text-white hover:text-[#4cc9f0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
