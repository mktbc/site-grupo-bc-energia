# Inventário de animações e microinterações

Regra aplicada: manter apenas movimento que ajuda a entender, navegar, descobrir
ou confirmar uma ação. Remover movimento decorativo.

| Componente | Animação | Ajuda UX? | Ação |
| --- | --- | --- | --- |
| `home/Sections/Hero` (banner aprovado) | carrossel Swiper com autoplay, setas e dots | navegação principal aprovada | **mantido intacto** |
| `home/Sections/Testimonials` | autoplay a cada 6,5s + pausa no hover | escondia depoimentos e criava movimento sem pedido | **autoplay removido**; setas e indicadores mantidos |
| `SimuleAgora` | ponto verde pulsando (`animate-ping`) + `hover:scale-105` | decorativo | pulsação removida (ponto estático); hover agora só muda a cor |
| `ProductCard` | zoom de fundo 100%→120% em 1000ms | exagerado e lento | zoom de 103% em 300ms, sem `transition-all` |
| `Sustainability` (galeria) | `scale 1.05` em 500ms + stagger nos reveals | acima do limite | `scale 1.02` em 300ms; stagger removido |
| `Positioning` (pilares) | reveal com atraso progressivo por item | atrasava a leitura | stagger removido |
| `Reveal`/`useReveal` global | opacity + translateY 14px em 400ms | sutil e útil | reduzido para 8px em 300ms |
| `Segments` (Home) | troca de foto no hover/foco do segmento | ajuda descoberta | mantido |
| `Button` (estado carregando) | spinner | feedback de estado | mantido |
| Links, setas, botões | cor + seta de 2–4px, 180–220ms | feedback | mantido |

## Verificações globais

- Nenhum parallax, scroll-jacking, count-up, marquee, partícula ou fundo animado.
- Nenhuma biblioteca de animação: Framer Motion já não existe; reveals usam
  `IntersectionObserver` nativo com transição CSS (dispara uma vez e desconecta).
- Só duas seções do site usam reveal ao entrar no viewport; o restante é estável.
- Todas as transições animam `opacity`/`transform` e respeitam
  `prefers-reduced-motion`.
- Nenhum atraso (`transition-delay`) permanece no projeto.
- Um único carrossel automático no site: o banner aprovado da Home.
- Escala máxima em imagens: 1.02.
