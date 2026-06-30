"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Share2, Minus, Plus, Truck, ShieldCheck, RefreshCcw, Check } from "lucide-react";
import { Product } from "@/lib/data";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  // Use real images from Deodap if available, fallback to primary image
  const gallery = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="pb-24">
      {/* Product Overview Section */}
      <section className="pt-8 md:pt-16 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-max">
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24 shrink-0">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square w-20 md:w-full rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
              <div className="relative aspect-square w-full bg-muted rounded-3xl overflow-hidden border border-border">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image src={activeImage} alt={product.name} fill className="object-cover" priority />
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.discountBadge && (
                    <Badge variant="destructive" className="font-semibold px-3 py-1 shadow-sm rounded-lg text-sm">
                      {product.discountBadge}
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-primary hover:bg-primary text-primary-foreground font-semibold px-3 py-1 shadow-sm rounded-lg text-sm">
                      New Arrival
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-8">
                <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-medium ml-1.5">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground underline cursor-pointer hover:text-foreground transition-colors">
                    {product.reviews} Reviews
                  </span>
                </div>

                <div className="flex items-end gap-4">
                  <span className="text-4xl font-bold text-foreground">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through pb-1">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              <Separator className="mb-8" />

              {/* Options */}
              <div className="space-y-6 mb-8">


                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                    Quantity
                  </h3>
                  <div className="flex items-center h-12 w-36 rounded-full border border-border bg-background">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 h-full flex items-center justify-center hover:bg-muted rounded-l-full transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="flex-1 h-full flex items-center justify-center hover:bg-muted rounded-r-full transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="hidden sm:flex flex-1 h-14 rounded-full text-lg font-semibold shadow-md" onClick={handleAddToCart}>
                  Add to Cart — ₹{(product.price * quantity).toLocaleString("en-IN")}
                </Button>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-full shrink-0">
                    <Heart className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-full shrink-0">
                    <Share2 className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">30 Days Return</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-sm font-medium">In Stock</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Details & Reviews Tabs */}
      <section className="py-16 bg-light-background border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="description" className="w-full max-w-4xl mx-auto">
            <TabsList className="w-full justify-start h-auto bg-transparent border-b border-border rounded-none p-0 overflow-x-auto flex-nowrap mb-8">
              <TabsTrigger 
                value="description" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="specifications" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger 
                value="faq" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3 font-medium text-base whitespace-nowrap"
              >
                FAQ
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="text-muted-foreground leading-relaxed space-y-6">
              <p>
                Experience the perfect blend of form and function with our {product.name}. Designed meticulously for modern living, it integrates seamlessly into your daily routine while making a bold statement. The premium materials ensure durability without compromising on aesthetics.
              </p>
              <p>
                Every detail has been thoughtfully considered. From the ergonomic contours to the intuitive interface, we've stripped away the unnecessary to focus purely on what matters. Whether you're at home, in the office, or on the move, this is the essential companion you didn't know you needed.
              </p>
            </TabsContent>
            
            <TabsContent value="specifications">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Material</span>
                  <span className="font-medium text-foreground">Premium Grade</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-medium text-foreground">12.5 x 8 x 2 cm</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium text-foreground">240g</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Warranty</span>
                  <span className="font-medium text-foreground">1 Year Limited</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Origin</span>
                  <span className="font-medium text-foreground">Designed in California</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Star className="h-12 w-12 text-amber-400 fill-amber-400 mb-4" />
                <h3 className="font-heading text-2xl font-bold mb-2">4.8 out of 5</h3>
                <p className="text-muted-foreground mb-8">Based on {product.reviews} reviews</p>
                <Button variant="outline">Write a Review</Button>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the return policy?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    We offer a 30-day return policy for all unused products in their original packaging. 
                    Simply initiate a return from your account dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Standard shipping takes 3-5 business days. Expedited options are available at checkout.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Does it come with a warranty?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Yes, all our products come with a 1-year limited warranty against manufacturing defects.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Buy Button (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border sm:hidden z-50">
        <Button size="lg" className="w-full h-14 rounded-full text-lg font-semibold shadow-md" onClick={handleAddToCart}>
          Add to Cart — ₹{(product.price * quantity).toLocaleString("en-IN")}
        </Button>
      </div>
      
    </div>
  );
}
