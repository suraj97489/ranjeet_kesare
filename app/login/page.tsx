import { login, signup } from './actions'

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string; error: string }
}) {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <h1 className="text-2xl font-bold mb-4 text-center">Organizer Login</h1>

                {searchParams?.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{searchParams.error}</span>
                    </div>
                )}

                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6 text-black border-gray-300"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6 text-black border-gray-300"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button
                    formAction={login}
                    className="bg-blue-600 rounded-md px-4 py-2 text-foreground mb-2 text-white hover:bg-blue-700 transition-colors"
                >
                    Sign In
                </button>
                <button
                    formAction={signup}
                    className="border border-gray-300 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-gray-100 transition-colors text-black"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
