"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";
import { getProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getProducts();
      setProducts(allProducts.slice(0, 8));
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Handpicked essentials that combine form and function, designed to elevate your everyday experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
