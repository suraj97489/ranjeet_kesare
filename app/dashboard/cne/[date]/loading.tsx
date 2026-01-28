export default function CNEDetailsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 animate-pulse">
          <div className="h-4 w-28 bg-indigo-100 rounded mb-3" />
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-64 bg-gray-100 rounded" />
              <div className="h-4 w-48 bg-gray-100 rounded" />
              <div className="h-3 w-32 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* List skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-pulse">
        <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 flex justify-between items-center">
            <div className="h-4 w-56 bg-gray-100 rounded" />
            <div className="h-9 w-28 bg-green-100 rounded-lg" />
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-40 bg-gray-100 rounded" />
                    <div className="h-3 w-32 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-5 w-5 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

