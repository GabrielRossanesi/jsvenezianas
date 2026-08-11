# JS Venezianas

Landing page responsiva para captação de orçamentos pelo WhatsApp.

No Windows, também é possível iniciar o site com dois cliques em `iniciar-site.bat`.

## Rodar localmente

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run lint
npm run build
```

## Antes de publicar

- Troque o número, texto de exibição e Instagram em `src/config.ts`.
- Substitua os depoimentos demonstrativos em `src/data.ts` por avaliações reais.
- Substitua ou amplie a galeria em `src/data.ts`; os arquivos públicos ficam em `public/images`.
- Revise os dados de Open Graph em `index.html` quando houver domínio e imagem social definitivos.

Os PNGs originais gerados para a direção de arte foram preservados em `source-images`. As versões WebP otimizadas usadas pelo site ficam em `public/images`.
