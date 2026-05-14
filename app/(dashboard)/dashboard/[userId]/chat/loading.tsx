import { Skeleton } from "@/components/ui/skeleton";

export default function ChatLoading() {
  return (
    <div className="h-[calc(100vh-9rem)] overflow-hidden rounded-3xl border border-border/50 bg-card/40 shadow-2xl shadow-p/5 backdrop-blur-sm">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 border-r border-border/40 lg:block">
          <div className="space-y-4 p-4">
            <Skeleton className="h-12 rounded-2xl" />
            <Skeleton className="h-11 rounded-2xl" />
          </div>

          <div className="border-t border-border/40 p-3">
            <div className="mb-4 flex items-center justify-between px-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>

            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-border/30 p-3">
                  <div className="flex gap-3">
                    <Skeleton className="size-10 shrink-0 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="flex min-h-0 flex-col bg-background/40">
          <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border/40 bg-card/55 px-4 py-4 backdrop-blur-xl md:px-6">
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-72 max-w-[55vw]" />
              </div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <Skeleton className="h-7 w-28 rounded-full" />
              <Skeleton className="size-10 rounded-2xl" />
            </div>
          </header>

          <main className="flex-1 overflow-hidden px-4 py-6 md:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-6">
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                <div className="flex gap-4">
                  <Skeleton className="size-11 shrink-0 rounded-2xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              </div>

              {Array.from({ length: 5 }).map((_, index) => {
                const isRight = index % 2 === 1;

                return (
                  <div key={index} className={isRight ? "flex justify-end" : "flex justify-start"}>
                    <div className="flex max-w-[78%] gap-3">
                      {!isRight && <Skeleton className="mt-1 size-9 shrink-0 rounded-full" />}
                      <div className={isRight ? "space-y-2" : "space-y-2"}>
                        <Skeleton className="h-16 w-[min(560px,70vw)] rounded-3xl" />
                        <Skeleton className={isRight ? "ml-auto h-3 w-24" : "h-3 w-28"} />
                      </div>
                      {isRight && <Skeleton className="mt-1 size-9 shrink-0 rounded-full" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          <footer className="border-t border-border/40 bg-card/55 p-4 backdrop-blur-xl md:p-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-background/85 p-2 shadow-xl shadow-p/5">
              <div className="flex items-end gap-2">
                <Skeleton className="mb-1 size-11 rounded-2xl" />
                <Skeleton className="h-12 flex-1 rounded-2xl" />
                <Skeleton className="mb-1 size-11 rounded-2xl" />
              </div>
            </div>
            <Skeleton className="mx-auto mt-2 h-3 w-72" />
          </footer>
        </section>
      </div>
    </div>
  );
}
