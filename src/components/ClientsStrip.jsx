export default function ClientsStrip() {
  const logos = ['TechNova', '▲ Infracore', 'Vortex Digital', '▲ SkyBridge', 'DataStream', '▲ Nexify', 'CloudAxis', '▲ OptiBase']
  const doubled = [...logos, ...logos]

  return (
    <div className="clients-strip">
      <div className="clients-track">
        {doubled.map((logo, i) => (
          <span className="client-logo" key={i}>{logo}</span>
        ))}
      </div>
    </div>
  )
}
