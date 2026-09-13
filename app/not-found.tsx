import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex max-w-xl flex-1 flex-col justify-center px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-ink-soft">Go home, or see what&apos;s on.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded bg-blue px-5 py-2.5 text-sm font-semibold text-white">
          Home
        </Link>
        <Link
          href="/experiences"
          className="rounded border border-ink/20 px-5 py-2.5 text-sm font-semibold"
        >
          See what&apos;s on
        </Link>
      </div>
    </main>
  );
}
