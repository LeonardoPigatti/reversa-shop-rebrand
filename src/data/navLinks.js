const NAV_LINKS = [
  { label: 'HOME',               href: '#' },
  { label: 'TODOS',              href: '#', page: 'catalog', filter: {} },
  { label: 'REVERSA X MARIMOON', href: '#', page: 'catalog', filter: { colecao: 'Marimoon' } },
  { label: 'FEMININO',           href: '#', page: 'catalog', filter: { genero: 'feminino' },           dropdown: true },
  { label: 'PLUS SIZE',          href: '#', page: 'catalog', filter: { plus_size: 'true' } },
  { label: 'CALÇADOS',           href: '#', page: 'catalog', filter: { categoria: 'Calçados' },        dropdown: true },
  { label: 'ACESSÓRIOS',         href: '#', page: 'catalog', filter: { categoria: 'Acessórios' },      dropdown: true },
  { label: 'DECOR',              href: '#', page: 'catalog', filter: { categoria: 'Decoração' } },
  { label: 'REPOSIÇÕES',         href: '#' },
  { label: 'MASCULINO',          href: '#', page: 'catalog', filter: { genero: 'masculino' },          dropdown: true },
  { label: 'COSMÉTICOS',         href: '#', page: 'catalog', filter: { categoria: 'Cosméticos' } },
  { label: 'OFERTAS',            href: '#' },
  { label: 'BAZAR',              href: '#' },
]

export default NAV_LINKS