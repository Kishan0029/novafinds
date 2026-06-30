"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-16 md:pt-32 md:pb-32">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start space-y-8"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              New Arrivals 2026 Collection
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Discover <br /> Products That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Make Life Better
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[500px] leading-relaxed">
              Experience the perfect blend of premium aesthetics and unparalleled functionality with our curated selection of lifestyle essentials.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold group w-full sm:w-auto" render={<Link href="/shop" />} nativeButton={false}>
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-base font-semibold w-full sm:w-auto" render={<Link href="/categories" />} nativeButton={false}>
                Explore Categories
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[600px] w-full aspect-square lg:aspect-auto rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10" />
            <Image
              src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200&h=1600"
              alt="Premium Lifestyle Products"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
