export default function Process() {
  return (
    <section id="processo">
      <div className="container">
        <div className="process-header">
          <p className="section-label reveal">Como trabalhamos</p>
          <h2 className="section-title reveal reveal-delay-1">Nosso Processo</h2>
          <p className="section-sub reveal reveal-delay-2">Da ideia ao deploy, cada etapa é executada com rigor técnico e comunicação transparente.</p>
        </div>
        <div className="process-steps">
          <div className="process-step reveal reveal-delay-1">
            <div className="process-num">01</div>
            <h3 className="process-step-title">Diagnóstico</h3>
            <p className="process-step-desc">Mapeamos sua infraestrutura atual, objetivos e gargalos para definir o melhor caminho tecnológico.</p>
          </div>
          <div className="process-step reveal reveal-delay-2">
            <div className="process-num">02</div>
            <h3 className="process-step-title">Arquitetura</h3>
            <p className="process-step-desc">Projetamos a solução com foco em performance, escalabilidade e custo-benefício para o seu negócio.</p>
          </div>
          <div className="process-step reveal reveal-delay-3">
            <div className="process-num">03</div>
            <h3 className="process-step-title">Desenvolvimento</h3>
            <p className="process-step-desc">Executamos com sprints ágeis, código limpo e deploys contínuos com monitoramento em tempo real.</p>
          </div>
          <div className="process-step reveal reveal-delay-4">
            <div className="process-num">04</div>
            <h3 className="process-step-title">Suporte</h3>
            <p className="process-step-desc">Operação 24/7 com SLAs garantidos, atualizações proativas e escalonamento sob demanda.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
