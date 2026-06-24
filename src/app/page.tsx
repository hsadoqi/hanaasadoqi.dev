export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-dvh">
        {/* Hero goes here first */}
      </main>
    </>
  );
}
