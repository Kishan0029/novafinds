"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, RotateCcw, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Premium Quality",
    description: "Every product is meticulously vetted for unparalleled quality and durability."
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Fast & Free Shipping",
    description: "Enjoy complimentary expedited shipping on all orders over ₹1,999 worldwide."
  },
  {
    icon: <RotateCcw className="h-8 w-8 text-primary" />,
    title: "Hassle-Free Returns",
    description: "Not satisfied? Return your purchase within 30 days for a full refund."
  },
  {
    icon: <HeadphonesIcon className="h-8 w-8 text-primary" />,
    title: "24/7 Expert Support",
    description: "Our dedicated team is always here to assist you, day or night."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            The Nova Finds Difference
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            We believe in providing an exceptional shopping experience from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-light-background border border-border hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6 p-4 bg-background rounded-full shadow-sm border border-border">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
