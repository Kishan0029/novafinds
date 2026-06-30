"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Priya Patel",
    role: "Verified Buyer",
    image: "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&fit=crop&q=80&w=200&h=200",
    content: "The quality of the products I received exceeded all my expectations. Not only is the design flawless, but the functionality is exactly what I was looking for. Will definitely be shopping here again.",
    rating: 5
  },
  {
    id: 2,
    name: "Rohan Sharma",
    role: "Tech Enthusiast",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=200&h=200",
    content: "Nova Finds has completely transformed my workspace. The minimalist aesthetic matches my setup perfectly, and the shipping was incredibly fast. Highly recommended for anyone who values design.",
    rating: 5
  },
  {
    id: 3,
    name: "Arjun Desai",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?auto=format&fit=crop&q=80&w=200&h=200",
    content: "As a designer, I'm extremely picky about what I buy. Every item from this store feels premium and well-thought-out. It's refreshing to see an e-commerce brand that genuinely cares about quality.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-light-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Don't just take our word for it. Here's what our community has to say about their Nova Finds experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground/90 text-lg leading-relaxed mb-8 flex-1 italic">
                "{review.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
