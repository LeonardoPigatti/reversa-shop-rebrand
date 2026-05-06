const NAV_LINKS = [
  { label: 'HOME',               href: '#' },
  { label: 'TODOS',              href: '#', page: 'catalog', filter: {} },
  { label: 'REVERSA X MARIMOON', href: '#', page: 'catalog', filter: { colecao: 'Marimoon' } },
  {
    label: 'FEMININO',
    href: '#',
    page: 'catalog',
    filter: { genero: 'feminino' },
    dropdown: true,
    subitens: [
      { label: 'Vestidos',               filter: { genero: 'feminino', categoria: 'Vestidos' } },
      { label: 'Blusas',                 filter: { genero: 'feminino', categoria: 'Blusas' } },
      { label: 'Casacos e Jaquetas',     filter: { genero: 'feminino', categoria: 'Jaquetas' } },
      { label: 'Fitness',                filter: { genero: 'feminino', categoria: 'Fitness' } },
      { label: 'Shorts, Calças e Saias', filter: { genero: 'feminino', categoria: 'Calças' } },
      { label: 'Pra Ficar em Casa',      filter: { genero: 'feminino', categoria: 'Homewear' } },
      { label: 'Moda Praia',             filter: { genero: 'feminino', categoria: 'Moda Praia' } },
    ],
  },
  { label: 'PLUS SIZE',          href: '#', page: 'catalog', filter: { plus_size: 'true' } },
  { label: 'CALÇADOS',           href: '#', page: 'catalog', filter: { categoria: 'Calçados' },   dropdown: true },
  { label: 'ACESSÓRIOS',         href: '#', page: 'catalog', filter: { categoria: 'Acessórios' }, dropdown: true },
  { label: 'DECOR',              href: '#', page: 'catalog', filter: { categoria: 'Decoração' } },
  { label: 'REPOSIÇÕES',         href: '#' },
  { label: 'MASCULINO',          href: '#', page: 'catalog', filter: { genero: 'masculino' },     dropdown: true },
  { label: 'COSMÉTICOS',         href: '#', page: 'catalog', filter: { categoria: 'Cosméticos' } },
  { label: 'OFERTAS',            href: '#', page: 'catalog', filter: { oferta: 'true' } },
  { label: 'BAZAR',              href: '#' },
]

export default NAV_LINKS