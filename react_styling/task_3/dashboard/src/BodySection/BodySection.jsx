export default function BodySection({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="mt-8 text-xl font-bold">
        {title}
      </h2>
      <div className="mt-4">
        {children}
      </div>
    </section>
  )
}
