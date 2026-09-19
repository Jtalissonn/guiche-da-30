GUICHÊ DA 30 — INSTALAÇÃO COMPLETA

O pacote contém:
- worker.js: site, API, painel, pagamentos, catálogo e e-mails.
- schema.sql: banco, segurança, armazenamento e tabelas do Supabase.
- wrangler.toml: configuração do Cloudflare Worker.
- tests/: testes da regra de taxa e filtro de artistas.

IMPORTANTE
Não coloque senha, Access Token, secret key ou API key privada dentro do worker.js.
As chaves secretas devem ser cadastradas como Secrets no Cloudflare.

1. SUPABASE

1. Crie um NOVO projeto dentro da sua conta atual do Supabase.
2. Abra SQL Editor > New query.
3. Cole todo o conteúdo de schema.sql e execute uma única vez.
4. Em Authentication > URL Configuration, cadastre o domínio do site.
5. Em Authentication > Providers > Email, mantenha e-mail/senha ativado.
6. Em Settings > API Keys, copie a Publishable key (sb_publishable_...).
7. Crie uma Secret key (sb_secret_...) exclusiva para este site.
   Nunca envie essa chave secreta em conversa, e-mail ou captura de tela.
8. Crie sua conta pelo próprio site depois da publicação.
9. Volte ao SQL Editor e execute apenas o comando final comentado no schema.sql,
   substituindo pelo seu e-mail, para tornar sua conta administradora.
10. Acesse o painel separado em https://SEU-DOMINIO/admin e entre com a mesma
    conta administradora. O site público e a área do cliente ficam em /.

2. CLOUDFLARE WORKER

1. Crie um Worker novo chamado guiche-da-30 na MESMA conta Cloudflare.
2. Use worker.js como código completo do Worker.
3. Abra wrangler.toml e preencha as configurações públicas indicadas.
4. Preencha APP_URL e SUPABASE_URL. Em SUPABASE_ANON_KEY, coloque a
   Publishable key que começa com sb_publishable_.
5. Configure o Cron diário: 17 8 * * *.

Secrets obrigatórios:
- SUPABASE_SECRET_KEY (a chave sb_secret_... do Supabase)
- MERCADO_PAGO_ACCESS_TOKEN
- MERCADO_PAGO_WEBHOOK_SECRET
- BREVO_API_KEY
- BREVO_SENDER_EMAIL

Secrets/configurações opcionais para o catálogo:
- TICKETMASTER_API_KEY
- CF_ACCOUNT_ID
- CF_BROWSER_API_TOKEN

Com Wrangler, use para cada segredo:
wrangler secret put NOME_DO_SECRET

3. MERCADO PAGO

1. Acesse Suas integrações e crie uma aplicação exclusiva para Guichê da 30.
2. Copie o Access Token de produção para o Secret MERCADO_PAGO_ACCESS_TOKEN.
3. Em Webhooks, configure:
   https://SEU-DOMINIO/webhooks/mercadopago
4. Marque o evento Pagamentos.
5. Copie a assinatura secreta gerada para MERCADO_PAGO_WEBHOOK_SECRET.
6. Use o simulador do Mercado Pago para testar a notificação antes de vender.

4. BREVO

1. Crie e autentique o remetente/domínio do Guichê da 30.
2. Crie uma API key exclusiva.
3. Cadastre BREVO_API_KEY e BREVO_SENDER_EMAIL nos Secrets do Worker.
4. Não use endereço de remetente que ainda não esteja verificado no Brevo.

5. CATÁLOGO AUTOMÁTICO

O sistema executa uma busca diária e também possui o botão Buscar shows no admin.

Fontes:
- Ticketmaster Discovery API, quando TICKETMASTER_API_KEY estiver configurada.
- Páginas oficiais cadastradas na tabela source_watch.
- Cloudflare Browser Rendering, quando a página exigir JavaScript e os dados
  CF_ACCOUNT_ID e CF_BROWSER_API_TOKEN estiverem configurados.

Eventos encontrados entram como PENDENTES. Isso impede vendas erradas.
No painel, confira a página oficial, aprove o evento e cadastre/confirme setores,
categorias, preço e disponibilidade. Quando a fonte não liberar preço automaticamente,
o setor permanece em erro_verificacao e não pode ser vendido.

Exemplo para cadastrar uma página oficial monitorada no SQL Editor:

insert into public.source_watch (name, url, supplier_name) values
('Matuê Eventim', 'https://www.eventim.com.br/artist/matue/', 'Eventim');

Cadastre apenas páginas oficiais que permitam consulta automatizada.

6. FLUXO DO PEDIDO

1. Cliente cria conta e escolhe evento/setor/categoria.
2. O sistema calcula a taxa de serviço automaticamente por ingresso.
3. Cliente paga no Mercado Pago.
4. O Webhook confirma o pagamento e registra a tarifa real do Mercado Pago.
5. O pedido aparece no painel.
6. Toque em Comprar no fornecedor oficial.
7. Compre usando os dados do participante, conforme as regras do fornecedor.
8. No painel, toque em Enviar ingresso e adicione PDF, imagem/QR ou link.
9. O ingresso é salvo com acesso privado, aparece em Meus ingressos e é enviado
   ao e-mail cadastrado pelo Brevo.

7. TODAS AS CATEGORIAS

O sistema aceita inteira, meia-entrada, social/solidário, VIP, camarote, open bar
e outras categorias. Preencha benefit_requirements em cada opção.

Antes de comprar meia-entrada, confira a documentação e a regra local do evento.
O cliente deve levar o documento original exigido na entrada. Não cadastre um tipo
como disponível quando a cota correspondente estiver esgotada no fornecedor.

8. REGRA DE TAXA

Até R$ 50: R$ 7.
Acima disso: R$ 5 para cada faixa de R$ 50, arredondada para cima.
Exemplos: R$ 50,01–100 = R$ 10; R$ 100,01–150 = R$ 15.

A taxa é calculada por ingresso. A tarifa real do Mercado Pago é descontada da
taxa de serviço e registrada no painel para mostrar o lucro líquido.

9. TESTE ANTES DE PUBLICAR

Execute:
npm install
npm test
npx wrangler dev

Teste obrigatoriamente:
- criação e confirmação de conta;
- pagamento de teste aprovado, pendente e recusado;
- assinatura do Webhook;
- pedido aparecendo no admin;
- upload de PDF e imagem;
- link em Meus ingressos;
- entrega e reenvio pelo Brevo;
- cliente sem acesso a pedido ou ingresso de outro cliente;
- pausa por setor e pausa do evento inteiro;
- compra e reembolso de teste.

10. SEGURANÇA

- O bucket tickets é privado.
- O cliente recebe um link temporário após autenticação.
- O service_role nunca é enviado ao navegador.
- O Webhook do Mercado Pago valida a assinatura.
- O admin é confirmado no servidor em todas as rotas administrativas.
- Eventos descobertos nunca entram automaticamente à venda sem revisão.

Este projeto é separado do outro site, mesmo utilizando as mesmas contas de
Cloudflare, Supabase e Brevo.
