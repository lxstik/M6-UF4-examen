import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-400 shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-black">Yehor Fal</h1>
      <nav className="flex gap-4">
        <Link
          href="/about"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          About
        </Link>
        <Link
          href="/movieExplorer"
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Movie Explorer
        </Link>
      </nav>
    </header>
  );
}
