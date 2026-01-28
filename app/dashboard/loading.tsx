export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header skeleton */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg" />
              <div>
                <div className="h-4 w-24 bg-gray-100 rounded mb-1" />
                <div className="h-3 w-32 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="h-9 w-20 bg-red-50 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 animate-pulse">
        {/* Share link card skeleton */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl shadow-lg p-5 sm:p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-10 h-10 bg-white/60 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-white/60 rounded" />
              <div className="h-3 w-56 bg-white/40 rounded" />
            </div>
          </div>
          <div className="bg-white/30 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="h-10 flex-1 bg-white/60 rounded" />
              <div className="h-10 w-28 bg-white rounded" />
            </div>
          </div>
        </div>

        {/* Add lecture card skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg" />
            <div className="h-4 w-48 bg-gray-100 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-100 rounded" />
              <div className="h-10 w-full bg-gray-100 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-28 bg-gray-100 rounded" />
              <div className="h-10 w-full bg-gray-100 rounded" />
            </div>
          </div>
          <div className="h-10 w-32 bg-green-100 rounded" />
        </div>

        {/* Lectures list skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-32 bg-gray-100 rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-40 bg-gray-100 rounded" />
                    <div className="h-3 w-32 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-7 w-16 bg-green-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

