export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900">Loading...</h3>
        <p className="mt-1 text-sm text-gray-500">Please wait while we fetch your data</p>
      </div>
    </div>
  )
} 