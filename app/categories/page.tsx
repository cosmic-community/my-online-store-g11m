import Link from 'next/link';
import { getCategories, getMetafieldValue } from '@/lib/cosmic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories | My Online Store',
  description: 'Browse our product categories and find exactly what you need.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">
          Product Categories
        </h1>
        <p className="text-navy-500 text-lg">
          Browse by category to find exactly what you&apos;re looking for
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const imageUrl = category.metadata?.image?.imgix_url;
            const name = getMetafieldValue(category.metadata?.name) || category.title;
            const description = getMetafieldValue(category.metadata?.description);

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className="card overflow-hidden">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={`${imageUrl}?w=800&h=500&fit=crop&auto=format,compress`}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={400}
                        height={250}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100">
                        <span className="text-6xl">🏷️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-navy-900 group-hover:text-amber-600 transition-colors mb-2">
                      {name}
                    </h3>
                    {description && (
                      <p className="text-navy-500 text-sm leading-relaxed line-clamp-2">
                        {description}
                      </p>
                    )}
                    <span className="inline-flex items-center mt-3 text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">
                      View Products →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🏷️</span>
          <h2 className="text-xl font-semibold text-navy-900 mb-2">No categories yet</h2>
          <p className="text-navy-500">Categories will appear here once added.</p>
        </div>
      )}
    </div>
  );
}