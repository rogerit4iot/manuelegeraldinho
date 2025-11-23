# Linktree estático — "Links do Rex"

Arquivo estático simples que funciona localmente. A página é full-screen e não permite rolagem global no body; caso existam muitos links, a área de links rola internamente.

Como usar:

1. Abra `c:/dev/manuelegeraldinho/index.html` no navegador (duplo-clique ou arraste para a janela do browser).
2. Para personalizar: edite `index.html` (nome, bio, links) e `styles.css` (cores, tipografia).

Personalização aplicada:
- Paleta atual: `#FD8C0C` (Manuel), `#7E4A25` (Geraldinho), `#758149` (verde de apoio).
- Perfis: há um seletor no topo do cartão para alternar entre **Manuel** e **Geraldinho**.
- Bios: Manuel — "Manhoso, chorão e o rei de tudo."; Geraldinho — "Corajoso e destemido."

Imagens
- Mova/coloque imagens em `public/` para que sejam servidas corretamente em produção com Vite.
- A imagem `manuelegeraldo.jpg` foi movida para `public/manuelegeraldo.jpg`.
 - Se você colocou duas imagens chamadas `manuel` e `geraldo` (por exemplo `manuel.png` e `geraldo.png`), o app já as usa automaticamente: `manuel` será exibido no perfil Manuel e `geraldo` no perfil Geraldinho.

Quer que eu substitua os links de exemplo por URLs reais ou adicione fotos reais (envie URLs)?
Segue os links e cupons adicionados ao projeto:

- Link Instagram: `https://www.instagram.com/manuel_geraldinho/`
- Link TikTok: `https://www.tiktok.com/@manuel.da.aventura`
- Link loja Mercado Livre: `https://www.mercadolivre.com.br/social/nnzd`

Contato (email): `manueldaaventura@gmail.com`

Cupons adicionados (código: `NENEZUDO`, desconto: 10%):
- Petz: `https://www.petz.com.br/` — código `NENEZUDO` (10%)
- Tapz: `https://tapz.com.br/parceiro/manuelgeraldinho/` — código `NENEZUDO` (10%)
- Aus Miaus: `https://www.ausmiaus.com.br/` — código `NENEZUDO` (10%)

Os cupons aparecem na seção "Cupons" do app com botão para abrir o site.

SEO aplicado
- Adicionei meta tags básicas de SEO e social preview no `index.html`:
	- `meta description`, `og:title`, `og:description`, `og:image`, `twitter:card`.
	- `link rel="canonical"` está definido para `https://manuelegeraldinho.com.br/`.
	- JSON-LD mínimo (schema.org Person) embutido.
	- `og:image` e `twitter:image` apontam para `https://manuelegeraldinho.com.br/manuelegeraldo.jpg` por padrão; para um preview consistente considere gerar uma imagem dedicada (`public/og-preview.jpg`) com dimensões recomendadas (1200×630) e atualizar as meta tags.
	 - Foi gerado automaticamente um `public/og-preview.svg` (1200×630) como preview OG simples (avatar + texto). Ele já está apontado nas meta tags.
		 - Observação: para máxima compatibilidade em redes sociais (Facebook/Twitter), recomenda-se gerar uma versão raster `og-preview.jpg` ou `og-preview.png` com dimensões 1200×630. Se quiser, posso gerar também a versão JPG.
Analytics (opcional)

Você pode ativar analytics facilmente sem modificar o código-fonte, usando variáveis de ambiente no AWS Amplify (Configurações de Build / Environment variables):

- Google Analytics 4: defina `VITE_GA_MEASUREMENT_ID` com seu Measurement ID (ex.: `G-XXXXXXXXXX`). O site carregará automaticamente o script do gtag e enviará eventos `link_click` e `contact_copy` quando os usuários clicarem nos links ou copiarem o email.
- Plausible: defina `VITE_PLAUSIBLE_DOMAIN` com seu domínio (ex.: `manuelegeraldinho.com.br`). O script do Plausible será carregado e eventos `link_click` e `contact_copy` serão enviados para o painel do Plausible.

Exemplo (AWS Amplify) — adicione as variáveis de ambiente no painel de Build settings:

1. No console do Amplify, abra o app e clique em "App settings" → "Environment variables".
2. Adicione `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX` (se usar GA) ou `VITE_PLAUSIBLE_DOMAIN` = `manuelegeraldinho.com.br` (se usar Plausible).
3. Reimplemente (redeploy). Após o deploy, as bibliotecas serão carregadas automaticamente e você verá eventos no dashboard do provedor.

Observação de privacidade: se preferir, use Plausible (mais focado em privacidade) ou obtenha consentimento antes de carregar GA4.

	- Adicionei `public/sitemap.xml` e atualizei `public/robots.txt` para apontar para `https://manuelegeraldinho.com.br/sitemap.xml`.
- Criei `public/robots.txt` (permitindo rastreamento). Se quiser, gero também `sitemap.xml`.

Amplify
- Como você está hospedando no AWS Amplify, o conteúdo da pasta `public/` será servido na raiz do site (ex.: `/manuelegeraldo.jpg` e `/robots.txt` estarão acessíveis). Depois do deploy, teste os meta tags/preview usando o Facebook Sharing Debugger e o Twitter Card Validator para forçar re-scrape e ver a pré-visualização.