import Link from 'next/link';
import { getProducts, getCategories, getReviews, getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const recentReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 opacity-90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium mb-6">
              ✨ Welcome to our store
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Discover Quality
              <br />
              <span className="text-amber-400">Products You Love</span>
            </h1>
            <p className="text-lg md:text-xl text-navy-200 mb-8 leading-relaxed">
              Explore our carefully curated collection of premium products. From trending items to everyday essentials, find everything you need in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-secondary text-lg px-8 py-4">
                Shop Now →
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200 text-lg"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-navy-500 text-lg max-w-2xl mx-auto">
              Find what you need quickly by browsing our organized categories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const imageUrl = category.metadata?.image?.imgix_url;
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-navy-100"
                >
                  {imageUrl ? (
                    <img
                      src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
                      alt={getMetafieldValue(category.metadata?.name) || category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={300}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                      <span className="text-5xl">🏷️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold mb-1">
                      {getMetafieldValue(category.metadata?.name) || category.title}
                    </h3>
                    {category.metadata?.description && (
                      <p className="text-white/80 text-sm line-clamp-2">
                        {getMetafieldValue(category.metadata.description)}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                  Featured Products
                </h2>
                <p className="text-navy-500 text-lg">
                  Our top picks just for you
                </p>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center text-navy-600 hover:text-navy-900 font-semibold transition-colors"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => {
                const imageUrl = product.metadata?.featured_image?.imgix_url;
                const price = product.metadata?.price;
                const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);

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
                      <h3 className="font-semibold text-navy-900 group-hover:text-amber-600 transition-colors mb-1">
                        {product.title}
                      </h3>
                      {product.metadata?.category && (
                        <p className="text-xs text-navy-400 mb-2">
                          {getMetafieldValue(product.metadata.category.metadata?.name) || product.metadata.category.title}
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
            <div className="sm:hidden mt-8 text-center">
              <Link href="/products" className="btn-primary">
                View All Products →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {recentReviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-navy-500 text-lg max-w-2xl mx-auto">
              Real reviews from real customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentReviews.map((review) => {
              const rating = review.metadata?.rating;
              const reviewerName = getMetafieldValue(review.metadata?.reviewer_name);
              const comment = getMetafieldValue(review.metadata?.comment);
              const productTitle = review.metadata?.product?.title;

              return (
                <div key={review.id} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-sm">
                      {reviewerName ? reviewerName.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">
                        {reviewerName || 'Anonymous'}
                      </p>
                      {productTitle && (
                        <p className="text-xs text-navy-400">
                          on {productTitle}
                        </p>
                      )}
                    </div>
                  </div>
                  {rating !== undefined && rating !== null && (
                    <div className="mb-3">
                      <StarRating rating={Number(rating)} size="sm" />
                    </div>
                  )}
                  {comment && (
                    <p className="text-navy-600 text-sm leading-relaxed line-clamp-4">
                      &ldquo;{comment}&rdquo;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews" className="btn-primary">
              Read All Reviews →
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-navy-200 text-lg mb-8 max-w-xl mx-auto">
            Explore our complete catalog and find the perfect products for you.
          </p>
          <Link href="/products" className="btn-secondary text-lg px-8 py-4">
            Browse All Products →
          </Link>
        </div>
      </section>
    </div>
  );
}