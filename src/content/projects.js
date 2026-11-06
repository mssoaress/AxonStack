// Portfólio — estrutura pronta para projetos REAIS.
//
// Enquanto esta lista estiver vazia, a seção #projetos e o link "Projetos" da navegação
// não são renderizados: nada fictício vai ao ar. Publique apenas trabalhos com
// autorização do cliente e informações verificáveis.
//
// O primeiro item ganha destaque (card grande); os demais alternam proporções.
//
// @typedef {Object} Project
// @property {string} name                Nome do projeto
// @property {string} category            Ex.: 'Sistema SaaS', 'Site institucional', 'Infraestrutura'
// @property {string} description         Resumo em uma ou duas frases
// @property {string} [problem]           Problema resolvido
// @property {string} [solution]          Solução implementada
// @property {string[]} [technologies]    Somente tecnologias efetivamente usadas
// @property {{src: string, width: number, height: number, alt: string}} [image]
//                                        Captura de tela (WebP/AVIF em public/img/projetos/,
//                                        proporção 16:10 recomendada, ~1600px de largura)
// @property {string} [url]               Link público de demonstração, se existir
//
// Exemplo de formato (NÃO publicar sem dados reais):
// {
//   name: 'Nome do projeto',
//   category: 'Sistema SaaS',
//   description: 'O que é e para quem foi feito.',
//   problem: 'Qual era a dor do cliente.',
//   solution: 'O que foi construído.',
//   technologies: ['React', 'Node.js'],
//   image: { src: '/img/projetos/projeto.webp', width: 1600, height: 1000, alt: 'Tela inicial do …' },
//   url: 'https://…',
// }

/** @type {Project[]} */
export const PROJECTS = []
