import Link from 'next/link';
import { getProducts, getCategories, getMetafieldValue } from '@/lib/cosmic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Products | My Online Store',
  description: 'Browse our complete collection of products.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
          All Products
        </h1>
        <p className="text-navy-500 text-lg">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Category Quick Links */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="px-4 py-2 bg-navy-50 text-navy-700 rounded-full text-sm font-medium hover:bg-navy-100 transition-colors"
            >
              {getMetafieldValue(cat.metadata?.name) || cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageUrl = product.metadata?.featured_image?.imgix_url;
            const price = product.metadata?.price;
            const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
            const description = getMetafieldValue(product.metadata?.description);

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="card group"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
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
                  {product.metadata?.category && (
                    <p className="text-xs text-navy-400 mb-2">
                      {getMetafieldValue(product.metadata.category.metadata?.name) || product.metadata.category.title}
                    </p>
                  )}
                  {description && (
                    <p className="text-sm text-navy-500 line-clamp-2 mb-3">
                      {description}
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
          <h2 className="text-xl font-semibold text-navy-900 mb-2">No products yet</h2>
          <p className="text-navy-500">Products will appear here once added to the store.</p>
        </div>
      )}
    </div>
  );
}