// app/products/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found | My Online Store' };
  }

  return {
    title: `${product.title} | My Online Store`,
    description: getMetafieldValue(product.metadata?.description) || `Explore ${product.title} at My Online Store.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);

  const imageUrl = product.metadata?.featured_image?.imgix_url;
  const gallery = product.metadata?.gallery;
  const price = product.metadata?.price;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const description = getMetafieldValue(product.metadata?.description);
  const category = product.metadata?.category;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (Number(r.metadata?.rating) || 0), 0) / reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-navy-400 mb-8">
        <Link href="/" className="hover:text-navy-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-navy-600 transition-colors">Products</Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-navy-600 transition-colors"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-navy-700">{product.title}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
            {imageUrl ? (
              <img
                src={`${imageUrl}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-8xl">📦</span>
              </div>
            )}
          </div>
          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    width={150}
                    height={150}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm text-amber-600 font-medium hover:text-amber-700 transition-colors"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2 mb-4">
            {product.title}
          </h1>

          {/* Rating Summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={Math.round(averageRating)} size="md" showNumber />
              <span className="text-sm text-navy-400">
                ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price */}
          {price !== undefined && price !== null && (
            <p className="text-3xl font-bold text-navy-900 mb-6">
              ${Number(price).toFixed(2)}
            </p>
          )}

          {/* Inventory Status */}
          {inventoryStatus && (
            <div className="mb-6">
              <span
                className={`badge text-sm ${
                  inventoryStatus.toLowerCase().includes('in stock')
                    ? 'badge-in-stock'
                    : inventoryStatus.toLowerCase().includes('low')
                    ? 'badge-low-stock'
                    : 'badge-out-of-stock'
                }`}
              >
                {inventoryStatus}
              </span>
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-navy-900 mb-3">Description</h2>
              <p className="text-navy-600 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Content */}
          {product.content && (
            <div
              className="prose prose-navy max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-bold text-navy-900 mb-6">
          Customer Reviews ({reviews.length})
        </h2>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => {
              const reviewerName = getMetafieldValue(review.metadata?.reviewer_name);
              const rating = review.metadata?.rating;
              const comment = getMetafieldValue(review.metadata?.comment);

              return (
                <div key={review.id} className="card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-sm">
                        {reviewerName ? reviewerName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">
                          {reviewerName || 'Anonymous'}
                        </p>
                        <p className="text-xs text-navy-400">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    {rating !== undefined && rating !== null && (
                      <StarRating rating={Number(rating)} size="sm" />
                    )}
                  </div>
                  {comment && (
                    <p className="text-navy-600 leading-relaxed">{comment}</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <span className="text-4xl mb-3 block">⭐</span>
            <p className="text-navy-500">No reviews yet for this product.</p>
          </div>
        )}
      </section>
    </div>
  );
}