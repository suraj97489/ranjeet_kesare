export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-pulse">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-4 shadow-xl" />
          <div className="h-7 w-40 bg-indigo-100 rounded mx-auto mb-2" />
          <div className="h-4 w-56 bg-indigo-50 rounded mx-auto" />
        </div>
        <div className="bg-white/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
          <div className="h-4 w-24 bg-gray-100 rounded" />
          <div className="h-10 w-full bg-gray-100 rounded" />
          <div className="h-4 w-24 bg-gray-100 rounded mt-4" />
          <div className="h-10 w-full bg-gray-100 rounded" />
          <div className="h-11 w-full bg-indigo-100 rounded mt-4" />
        </div>
        <div className="mt-6 h-3 w-64 bg-gray-100 rounded mx-auto" />
      </div>
    </div>
  )
}

