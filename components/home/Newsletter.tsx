"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-card rounded-3xl p-8 md:p-16 border border-border shadow-xl text-center"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Join the Club
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get 15% off your first order. Plus, be the first to know about new arrivals and exclusive sales.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              className="h-14 rounded-full px-6 bg-background border-border focus-visible:ring-primary"
              required
            />
            <Button type="submit" size="lg" className="h-14 rounded-full px-8 font-semibold shrink-0">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
