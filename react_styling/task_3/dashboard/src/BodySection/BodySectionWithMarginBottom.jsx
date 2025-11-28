import BodySection from './BodySection'

export default function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="mb-12">
      <BodySection title={title}>
        {children}
      </BodySection>
    </div>
  )
}
