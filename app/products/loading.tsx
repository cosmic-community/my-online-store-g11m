export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-3" />
        <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="card">
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}