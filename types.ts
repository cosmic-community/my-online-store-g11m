export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicImage;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price?: number;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: string;
    category?: ProductCategory;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    comment?: string;
    product?: Product;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}