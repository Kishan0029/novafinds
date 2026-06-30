import { supabase } from './supabase';
import { Product } from './data';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products from Supabase:', error);
    return [];
  }

  // Transform snake_case from DB to camelCase for the frontend
  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    rating: Number(item.rating),
    reviews: Number(item.reviews),
    category: item.category as Product['category'],
    image: item.image,
    images: item.images || [],
    isNew: item.is_new,
    discountBadge: item.discount_badge || undefined,
    colors: item.colors || undefined,
    stock: Number(item.stock),
  }));
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error(`Error fetching product ${id} from Supabase:`, error);
    return null;
  }

  const productData = data as any;
  return {
    id: productData.id,
    name: productData.name,
    description: productData.description,
    price: Number(productData.price),
    originalPrice: productData.original_price ? Number(productData.original_price) : undefined,
    rating: Number(productData.rating),
    reviews: Number(productData.reviews),
    category: productData.category as Product['category'],
    image: productData.image,
    images: productData.images || [],
    isNew: productData.is_new,
    discountBadge: productData.discount_badge || undefined,
    colors: productData.colors || undefined,
    stock: Number(productData.stock),
  };
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }

  return (data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    rating: Number(item.rating),
    reviews: Number(item.reviews),
    category: item.category as Product['category'],
    image: item.image,
    images: item.images || [],
    isNew: item.is_new,
    discountBadge: item.discount_badge || undefined,
    colors: item.colors || undefined,
    stock: Number(item.stock),
  }));
}
