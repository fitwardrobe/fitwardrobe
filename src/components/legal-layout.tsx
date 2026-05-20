"use client"


export function LegalLayout({ title, updatedDate, children }: { title: string, updatedDate: string, children: React.ReactNode }) {
  return (
    <main className="py-(--space-12)">
      <div className="container mx-auto px-(--content-padding) max-w-[800px]">
        <h1 className="text-(--text-4xl) font-bold mb-4">{title}</h1>
        <div className="bg-(--color-bg-alt) p-6 rounded-md mb-8 text-(--text-sm)">
          <p><strong>Organization:</strong> FitWardrobe</p>
          <p><strong>Last Updated:</strong> {updatedDate}</p>
        </div>
        <div className="prose max-w-none text-(--color-text-body) leading-[1.8]">
          {children}
        </div>
      </div>
    </main>
  )
}
