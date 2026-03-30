export default function ReviewsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="h-10 w-56 bg-gray-200 rounded-lg animate-pulse mb-3" />
        <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="text-center mb-6">
              <div className="h-12 w-16 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mx-auto" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 space-y-6">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}