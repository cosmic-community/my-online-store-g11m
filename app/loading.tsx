export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-navy-200 border-t-navy-900 rounded-full animate-spin" />
        <p className="text-navy-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}