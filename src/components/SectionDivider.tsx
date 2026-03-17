interface SectionDividerProps {
  background: string
  fillColor: string
  path: string
}

export default function SectionDivider({ background, fillColor, path }: SectionDividerProps) {
  return (
    <div className="section-divider" style={{ background }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path fill={fillColor} d={path} />
      </svg>
    </div>
  )
}
