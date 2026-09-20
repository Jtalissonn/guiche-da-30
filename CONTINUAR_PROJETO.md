# Continuação do projeto Guichê da 30

Este arquivo serve como passagem de contexto para outro chat/agente continuar o projeto sem refazer etapas concluídas.

## Links e infraestrutura

- Site público: https://guiche.30tv.workers.dev/
- Painel administrativo: https://guiche.30tv.workers.dev/admin
- Repositório: https://github.com/Jtalissonn/guiche-da-30
- Branch de produção: `main`
- Cloudflare Worker: `guiche`
- Projeto Supabase: `guiche-da-30`
- Supabase project ref: `jkyrwwnncqmwykhtjbce`
- Deploy automático: todo commit na `main` executa `npx wrangler deploy` no Cloudflare Builds.

Não pedir senhas ao usuário e não colocar chaves, tokens ou segredos no GitHub. As variáveis privadas ficam no Cloudflare.

## Objetivo do negócio

O Guichê da 30 vende ingressos sem manter estoque antecipado:

1. O cliente escolhe um evento e paga pelo Mercado Pago.
2. O administrador recebe o pedido aprovado.
3. O administrador compra o ingresso no fornecedor oficial.
4. O ingresso é enviado como PDF, imagem ou link.
5. O cliente recebe por e-mail e acessa em **Meus ingressos**.
6. Prazo prometido ao cliente: até 1 hora depois da aprovação do pagamento.

Artistas monitorados atualmente: Matuê, Teto, WIU e Brandão85.

## Regra da taxa de serviço

- Até R$ 50,00: R$ 7,00.
- De R$ 50,01 a R$ 100,00: R$ 10,00.
- Depois disso: acrescentar R$ 5,00 a cada nova faixa de R$ 50,00.
- A tarifa real do Mercado Pago é descontada da taxa para calcular o lucro líquido.
- O painel mostra total vendido, valor dos ingressos, taxas de serviço, Mercado Pago e lucro líquido.

## O que já está funcionando

- Banco e tabelas do Supabase instalados.
- Autenticação do cliente e perfil administrativo.
- Site público e painel separados.
- O app administrativo abre em `/admin` por meio de manifesto próprio.
- Cores e contraste do painel corrigidos para celular.
- Mercado Pago, webhook, fluxo de pedidos e cálculo da taxa implementados no código.
- Envio de ingresso por arquivo ou link implementado no painel.
- Integração de e-mail prevista via Brevo.
- GitHub conectado ao Cloudflare com deploy automático.
- Testes locais do cálculo de taxa e reconhecimento de artistas passando.
- Versão publicada ao criar este arquivo: `1.0.6`.

## Evento cadastrado

Foi cadastrado no Supabase e aprovado pelo administrador:

- Evento: MATUÊ
- Data: 24/10/2026 às 23h59
- Local: Tuiuti Esporte Clube
- Cidade: Cascavel/PR
- Classificação: 18 anos
- Fornecedor: Eventim
- Link oficial: https://www.eventim.com.br/event/matue-tuiuti-esporte-clube-21917168/

Ainda faltam cadastrar os setores, categorias, preços e taxa obrigatória do fornecedor.

## Estado da busca automática

- A tabela `source_watch` possui a fonte `https://www.eventim.com.br/artist/matue/`.
- O botão **Buscar shows** executa corretamente, mas ainda retorna zero importações.
- A Eventim entrega o evento como `EventSeries` com itens em `subEvent`.
- O leitor foi atualizado para reconhecer `subEvent`, performer em objeto e URL em `offers`.
- Mesmo assim, o acesso direto feito pelo Worker recebe uma página diferente/bloqueada e não encontra o JSON-LD renderizado.
- O evento atual foi inserido manualmente no Supabase para o projeto continuar.
- Não afirmar que a busca automática está resolvida.

Próximas opções para resolver a busca:

1. Configurar Cloudflare Browser Rendering com `CF_ACCOUNT_ID` e `CF_BROWSER_API_TOKEN`; ou
2. Integrar uma API oficial, como Ticketmaster Discovery, usando `TICKETMASTER_API_KEY`; ou
3. Criar no painel um cadastro manual completo de eventos, mantendo a busca automática como complemento.

## Próximos passos recomendados

1. Consultar na página oficial da Eventim os setores e preços atuais do evento de Matuê.
2. Cadastrar cada setor no painel, incluindo categoria, preço do ingresso, taxa obrigatória e exigências de benefício.
3. Confirmar que o evento aparece no site público com a taxa de serviço correta.
4. Fazer uma compra de teste no Mercado Pago.
5. Confirmar webhook e mudança de status para `pagamento_aprovado`.
6. Testar compra manual, envio do ingresso e recebimento por e-mail/Meus ingressos.
7. Confirmar remetente e chave do Brevo sem expor segredos.
8. Resolver a importação automática dos próximos eventos.

## Regras para alterações

- Preservar o checkout, as regras de taxa e o fluxo de entrega já implementados.
- Testar `node --check worker.js` e `npm test` antes de publicar.
- Alterar `APP_VERSION` quando houver mudança no `worker.js`.
- Publicar somente na branch `main` quando a alteração estiver validada.
- Depois do commit, conferir `https://guiche.30tv.workers.dev/health` e aguardar a nova versão.
- Não excluir tabelas, eventos, pedidos ou configurações existentes sem autorização explícita.
- Não colocar credenciais no repositório ou nas mensagens.

## Arquivos principais

- `worker.js`: API, site público, painel, Mercado Pago, e-mail e catálogo.
- `schema.sql`: estrutura completa do Supabase.
- `README_INSTALAR.txt`: configuração das integrações e variáveis.
- `tests/core.test.mjs`: testes das taxas, artistas e leitor de eventos.
- `wrangler.toml`: configuração do Cloudflare Worker e agendamento.

