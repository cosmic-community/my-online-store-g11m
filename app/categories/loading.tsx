export default function CategoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="h-10 w-56 bg-gray-200 rounded-lg animate-pulse mb-3" />
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="card">
            <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
            <div className="p-5 space-y-2">
              <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}