"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "Deals", href: "/deals" },
  { name: "Track Order", href: "/track-order" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount, setIsCartOpen } = useCartStore();
  const cartCount = getCartCount();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);

    // Fetch user
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    fetchUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="shrink-0" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 font-heading font-bold text-2xl tracking-tight text-primary">
                  Nova<span className="text-foreground">Finds</span>.
                </Link>
                <div className="flex flex-col gap-4 mt-6">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (searchQuery.trim()) {
                        router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
                        setIsMobileMenuOpen(false);
                      }
                    }} 
                    className="relative w-full mb-2"
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-9 pr-4 rounded-xl bg-muted border-none h-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-foreground/80 hover:text-primary transition-colors py-2 font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  <Link
                    href={user ? "/dashboard" : "/login"}
                    className="text-foreground/80 hover:text-primary transition-colors py-2 flex items-center gap-2 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    {user ? "My Account" : "Sign In"}
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-primary">
            Nova<span className="text-foreground">Finds</span>.
          </Link>
        </div>

        {/* Desktop Logo & Nav */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-primary">
            Nova<span className="text-foreground">Finds</span>.
          </Link>
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
              }
            }} 
            className="hidden md:flex relative w-full max-w-sm items-center"
          >
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 pr-4 rounded-full bg-muted border-none focus-visible:ring-1 focus-visible:ring-primary h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" render={<Link href={user ? "/dashboard" : "/login"} />} nativeButton={false}>
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            {mounted && cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full">
                {cartCount}
              </Badge>
            )}
          </Button>
          
          <Button 
            className="hidden sm:flex rounded-full px-6 font-semibold shadow-sm hover:shadow-md transition-shadow"
            render={<Link href="/shop" />}
            nativeButton={false}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
}
