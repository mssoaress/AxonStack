export default function Process() {
  return (
    <section id="processo" aria-labelledby="processo-title">
      <div className="container">
        <div className="process-header">
          <p className="section-label reveal">Como trabalhamos</p>
          <h2 className="section-title reveal reveal-delay-1" id="processo-title">
            Nosso Processo
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            Da ideia ao deploy, cada etapa é executada com rigor técnico e comunicação transparente.
          </p>
        </div>
        <ol className="process-steps">
          <li className="process-step reveal reveal-delay-1">
            <div className="process-num" aria-hidden="true">
              01
            </div>
            <h3 className="process-step-title">Diagnóstico</h3>
            <p className="process-step-desc">
              Mapeamos sua infraestrutura atual, objetivos e gargalos para definir o melhor caminho
              tecnológico.
            </p>
          </li>
          <li className="process-step reveal reveal-delay-2">
            <div className="process-num" aria-hidden="true">
              02
            </div>
            <h3 className="process-step-title">Arquitetura</h3>
            <p className="process-step-desc">
              Projetamos a solução com foco em performance, escalabilidade e custo-benefício para o
              seu negócio.
            </p>
          </li>
          <li className="process-step reveal reveal-delay-3">
            <div className="process-num" aria-hidden="true">
              03
            </div>
            <h3 className="process-step-title">Desenvolvimento</h3>
            <p className="process-step-desc">
              Executamos com sprints ágeis, código limpo e deploys contínuos com monitoramento em
              tempo real.
            </p>
          </li>
          <li className="process-step reveal reveal-delay-4">
            <div className="process-num" aria-hidden="true">
              04
            </div>
            <h3 className="process-step-title">Suporte</h3>
            <p className="process-step-desc">
              Acompanhamento contínuo, atualizações proativas e escalonamento sob demanda, com
              níveis de atendimento definidos com cada cliente.
            </p>
          </li>
        </ol>
      </div>
    </section>
  )
}
