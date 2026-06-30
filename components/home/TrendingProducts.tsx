"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/shared/ProductCard";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/data";

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchTrending() {
      const allProducts = await getProducts();
      // Show products 8 to 12 as trending (different from featured)
      setProducts(allProducts.slice(8, 12));
    }
    fetchTrending();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-light-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium mb-4">
              <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
              Trending Now
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              What Everyone is Buying
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover the most popular products loved by our community right now.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
