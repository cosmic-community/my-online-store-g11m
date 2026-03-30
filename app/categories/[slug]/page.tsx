// app/categories/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | My Online Store' };
  }

  const name = getMetafieldValue(category.metadata?.name) || category.title;
  return {
    title: `${name} | My Online Store`,
    description: getMetafieldValue(category.metadata?.description) || `Browse ${name} products at My Online Store.`,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);
  const imageUrl = category.metadata?.image?.imgix_url;

  return (
    <div>
      {/* Category Hero */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        {imageUrl && (
          <img
            src={`${imageUrl}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            width={960}
            height={300}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 text-sm text-navy-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <span>/</span>
            <span className="text-white">{name}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{name}</h1>
          {description && (
            <p className="text-navy-200 text-lg max-w-2xl">{description}</p>
          )}
          <p className="text-navy-300 mt-4">
            {products.length} product{products.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const prodImageUrl = product.metadata?.featured_image?.imgix_url;
              const price = product.metadata?.price;
              const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
              const prodDescription = getMetafieldValue(product.metadata?.description);

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="card group"
                >
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {prodImageUrl ? (
                      <img
                        src={`${prodImageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={300}
                        height={300}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-5xl">📦</span>
                      </div>
                    )}
                    {inventoryStatus && (
                      <span
                        className={`absolute top-3 right-3 badge ${
                          inventoryStatus.toLowerCase().includes('in stock')
                            ? 'badge-in-stock'
                            : inventoryStatus.toLowerCase().includes('low')
                            ? 'badge-low-stock'
                            : 'badge-out-of-stock'
                        }`}
                      >
                        {inventoryStatus}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-navy-900 group-hover:text-amber-600 transition-colors mb-1 line-clamp-1">
                      {product.title}
                    </h3>
                    {prodDescription && (
                      <p className="text-sm text-navy-500 line-clamp-2 mb-3">
                        {prodDescription}
                      </p>
                    )}
                    {price !== undefined && price !== null && (
                      <p className="text-lg font-bold text-navy-900">
                        ${Number(price).toFixed(2)}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-5xl mb-4 block">📦</span>
            <h2 className="text-xl font-semibold text-navy-900 mb-2">No products in this category</h2>
            <p className="text-navy-500 mb-6">Check back soon for new arrivals.</p>
            <Link href="/products" className="btn-primary">
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}