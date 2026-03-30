import Link from 'next/link';
import { getReviews, getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'Read what our customers have to say about our products.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (Number(r.metadata?.rating) || 0), 0) / reviews.length
      : 0;

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const rating = Number(r.metadata?.rating) || 0;
    if (rating >= 1 && rating <= 5) {
      const roundedRating = Math.round(rating);
      if (ratingCounts[roundedRating] !== undefined) {
        ratingCounts[roundedRating]++;
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
          Customer Reviews
        </h1>
        <p className="text-navy-500 text-lg">
          See what our customers think about our products
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Rating Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Rating Summary</h2>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-navy-900 mb-1">
                  {averageRating.toFixed(1)}
                </p>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-sm text-navy-400 mt-2">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingCounts[stars] ?? 0;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm text-navy-500 w-3">{stars}</span>
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-navy-400 w-8 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3 space-y-6">
            {reviews.map((review) => {
              const reviewerName = getMetafieldValue(review.metadata?.reviewer_name);
              const rating = review.metadata?.rating;
              const comment = getMetafieldValue(review.metadata?.comment);
              const product = review.metadata?.product;

              return (
                <div key={review.id} className="card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold">
                        {reviewerName ? reviewerName.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">
                          {reviewerName || 'Anonymous'}
                        </p>
                        <p className="text-sm text-navy-400">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    {rating !== undefined && rating !== null && (
                      <StarRating rating={Number(rating)} size="md" />
                    )}
                  </div>

                  {product && (
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 bg-navy-50 rounded-lg text-sm text-navy-600 hover:bg-navy-100 transition-colors"
                    >
                      <span className="text-xs">📦</span>
                      <span className="font-medium">{product.title}</span>
                    </Link>
                  )}

                  {comment && (
                    <p className="text-navy-600 leading-relaxed">&ldquo;{comment}&rdquo;</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">⭐</span>
          <h2 className="text-xl font-semibold text-navy-900 mb-2">No reviews yet</h2>
          <p className="text-navy-500 mb-6">Customer reviews will appear here.</p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}