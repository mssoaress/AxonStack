// Serviços oferecidos pela Axon Stack (os mesmos seis já publicados no site).
// Os benefícios só reformulam o que já era afirmado — não acrescente promessas,
// prazos ou garantias sem confirmação comercial.
//
// `icon` é a chave de ServiceIcon (components/Icons.jsx).
// `id` vira a âncora do card (#servico-<id>), usada nos links do rodapé.
export const SERVICES = [
  {
    id: 'sistemas',
    title: 'Sistemas, SaaS e Integrações',
    category: 'Software',
    icon: 'software',
    description:
      'Sistemas web e plataformas SaaS sob medida para o processo da sua empresa, conectados às ferramentas que vocês já usam.',
    benefits: [
      'Automações que reduzem o trabalho manual',
      'Integração com as ferramentas atuais da empresa',
      'Arquitetura robusta, preparada para escalar',
    ],
  },
  {
    id: 'sites',
    title: 'Desenvolvimento de Sites',
    category: 'Software',
    icon: 'web',
    description:
      'Sites e landing pages com design moderno, rápidos e estruturados para transformar visitas em contatos.',
    benefits: [
      'Performance em qualquer dispositivo',
      'SEO técnico desde a estrutura',
      'Páginas pensadas para conversão',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Computing',
    category: 'Infraestrutura',
    icon: 'cloud',
    description:
      'Infraestrutura em nuvem escalável, configurada sob medida para as demandas do seu negócio.',
    benefits: [
      'Escala conforme a demanda',
      'Arquitetura voltada à alta disponibilidade',
      'Configuração sob medida',
    ],
  },
  {
    id: 'servidores',
    title: 'Infraestrutura de Servidores',
    category: 'Infraestrutura',
    icon: 'servers',
    description:
      'Montagem, configuração e gerenciamento de servidores para a sua operação rodar com estabilidade.',
    benefits: [
      'Monitoramento contínuo',
      'Gerenciamento completo do ambiente',
      'Suporte especializado',
    ],
  },
  {
    id: 'vps',
    title: 'VPS e Hospedagem',
    category: 'Infraestrutura',
    icon: 'vps',
    description:
      'Servidores virtuais privados e hospedagem com performance consistente para sites e sistemas.',
    benefits: ['Performance consistente', 'Backups automáticos', 'Painel de controle intuitivo'],
  },
  {
    id: 'email',
    title: 'E-mail Corporativo',
    category: 'Infraestrutura',
    icon: 'mail',
    description:
      'E-mail profissional com o domínio da sua empresa, transmitindo credibilidade em cada contato.',
    benefits: ['Domínio próprio', 'Anti-spam avançado', 'Sincronização em todos os dispositivos'],
  },
]
