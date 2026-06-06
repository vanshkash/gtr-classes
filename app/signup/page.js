export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-2xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold mb-6">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Create Account
        </button>

      </div>
    </div>
  );
}