import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold">Sign In</h1>
      <p className="mb-4 text-gray-700">This is the sign in page</p>
      <form className="w-full max-w-sm rounded bg-white p-6 shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full rounded border p-2"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 w-full rounded border p-2"
          />
        </div>
      </form>
      <SignedOut>
        <SignInButton forceRedirectUrl="/" />
      </SignedOut>
    </div>
  );
}
