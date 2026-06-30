"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600&h=800",
    itemCount: "124 Products"
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600&h=800",
    itemCount: "86 Products"
  },
  {
    id: "home",
    name: "Smart Home",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600&h=800",
    itemCount: "53 Products"
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=600&h=800",
    itemCount: "215 Products"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export default function Categories() {
  return (
    <section className="py-16 md:py-24 bg-light-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our highly curated categories to find the perfect addition to your daily routine.
            </p>
          </div>
          <Link 
            href="/categories" 
            className="group flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View All Categories
            <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/categories/${category.id}`} className="group block relative rounded-2xl overflow-hidden aspect-[3/4]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white font-heading font-semibold text-2xl mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.itemCount}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
