import { Link } from "react-router";

export default function AccountSettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <Link className="text-blue-600 hover:underline" to="/diplomas">
        Back to Diplomas
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-slate-800">Account Settings</h1>
    </main>
  );
}
