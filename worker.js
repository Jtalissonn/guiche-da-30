// Cloudflare Builds conectado ao GitHub.
const APP_VERSION = '1.4.4';
const MATUE_TUIUTI_COVER = 'https://www.fundicaoprogresso.com.br/Admin/Content/Imagens/Release/20250526105735.jpg';
const IMAGE_PROXY_HOSTS = ['eventim.com.br', 'ticketmaster.com', 'ticketmaster.com.br', 'tmol.io'];

const SEPTEMBER_EVENT_SEEDS = [
  {
    source_event_id: 'festa-do-chefe-sao-paulo-2026-09-25',
    official_url: 'https://blacktag.com.br/eventos/32995/festa-do-chefe',
    supplier_name: 'Blacktag', title: 'Festa do Chefe — WIU, MC Hariel e MC Lele JP',
    description: '30ª edição da Festa do Chefe. Área VIP Open Bar Premium, evento open air. É necessário levar um ecocopo ou adquirir um no local. O portão fecha às 02h30.',
    image_url: 'https://d106p58duwuiz5.cloudfront.net/event/cover/6f8d14b0832c38f933028c5be4ad8180.png',
    starts_at: '2026-09-25T21:00:00-03:00', ends_at: '2026-09-26T08:00:00-03:00',
    venue_name: 'Estádio do Canindé', address: 'Rua Comendador Nestor Pereira, 33, Canindé',
    city: 'São Paulo', state: 'SP', age_rating: null,
    lineup: ['WIU', 'MC Hariel', 'MC Lele JP'], matched_artists: ['WIU'],
  },
  {
    source_event_id: 'teto-uclub-novo-hamburgo-2026-09-25',
    official_url: 'https://baladapp.com.br/pt-BR/eventos/u-club-apresenta-teto/9357',
    supplier_name: 'BaladAPP by Ticketmaster', title: 'U Club Apresenta: TETO',
    description: 'TETO na U Club. Pista com acesso ao club; mezanino com vista superior, bar exclusivo e acesso à pista e ao club. Mezanino não inclui mesa.',
    image_url: 'https://www.instagram.com/p/DcTuJZxxOC1/media/?size=l',
    starts_at: '2026-09-25T22:00:00-03:00', ends_at: null,
    venue_name: 'U Club', address: 'RS-239', city: 'Novo Hamburgo', state: 'RS',
    age_rating: '16 anos', lineup: ['TETO'], matched_artists: ['Teto'],
  },
  {
    source_event_id: 'wiu-recife-2026-09-26',
    official_url: 'https://www.sympla.com.br/evento/swagg-v1-2026/3551630',
    supplier_name: 'Sympla', title: 'Swagg v1.2026 — WIU',
    description: 'Full Open Bar. WIU, Mau Lopes, Khad e DaMata. Documento original com foto obrigatório.',
    image_url: 'https://images.sympla.com.br/6a8c544254427-lg.jpg',
    starts_at: '2026-09-26T23:00:00-03:00', ends_at: '2026-09-27T05:00:00-03:00',
    venue_name: 'Cachaçaria Carvalheira', address: 'Avenida Sul Governador Cid Sampaio, 4921, Imbiribeira',
    city: 'Recife', state: 'PE', age_rating: '18 anos', lineup: ['WIU', 'Mau Lopes', 'Khad', 'DaMata'], matched_artists: ['WIU'],
  },
];

function eventImage(event) {
  const image = safeUrl(event.image_url);
  if (image && /\/storage\/v1\/object\/public\/event-images\//.test(image)) return image;
  const official = String(event.official_url || '');
  const venue = normalizeText(`${event.venue_name || ''} ${event.city || ''}`);
  if (/21917168/.test(official) || (venue.includes('tuiuti') && venue.includes('cascavel'))) return MATUE_TUIUTI_COVER;
  if (!image) return null;
  try {
    const host = new URL(image).hostname.toLowerCase();
    if (IMAGE_PROXY_HOSTS.some(allowed => host === allowed || host.endsWith(`.${allowed}`))) {
      return `/event-image?url=${encodeURIComponent(image)}`;
    }
  } catch { return null; }
  return image;
}
const APP_ICON_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAACAAElEQVR42uz9eZxdV3Uljq997huqXs2SqjRag+UJ27KNAdvYGAOGYAabKQESCNCdJjQZIAmBBPgSMid0d0gngfwSIEN3pwM0kO4AgQDGNhgPGDwbz4MsayypVHPVG+456/vHnc4599xXsk0S+vP9CWRJNby6795z9tl77bXXEvzo/BLr73ySX9/vF5/k98sJ/vzstcV7Pf4b3Rc5wff9o/pLnsSz+9dYXyf6mifyTFjxvv6l3/Oav6IfwUXAJ/n18hR+hgT+LU9hgcpTvO5/ifshP+SfKz/k1/zXvP5/ywAma6yVH6mgXfsRu4lP9eTvF93lSUbnE7m2H8XTlj+kTfR/+0Y80SD6ww7afAprgT8KN0fwf0e6KE/ha4n/7/2Sf4FF/W9xrfw3umd8GuvsyZaP+P8HgLUfhlTc8BO9bvkRuflyApnEj2CV9UNdwPIULm6tzOupYCQn8gz4LxBE5ClmCv+fCQDyZFbxzp2Qk08GdAysrgK9HjA0DDSbwNIScOgQcPw4sLoKah14CjUIRgCMA2gAOAnAFIBlALMADgHoAOgCOAYgTr95LP3dTD/fS1/4qPX3H0UcRURQawKMgTj+l3jmfJLP1t3ASglAwrDqdeVJfvyHmYHI03j/oeDP/5s23L/mdUiOTowC2AE0h4EzR4HtA8C6EUCSZYLWIACBdE0ELRE0aohMF02JUY+AXgx0OmCnA0RREiRggIUh4LEuQAHYhJhBABHACIBKr8IoUBss1YCOgLIILCqACsAggIHkexCnm34VwGfTwGH9qtfrmJyckqGhFkQEKysr6BiDXrOJhXodRgTodjGgNRoAVjsdmHodupbCM0NDkOFhsNsFHnoIWFoiogjYulUwPg4ZGgKPHQOOHk3fIJIb1OkkC4x1SSLcQvLmRjYDrXWAagOzjwHtJf4LB4ETX2PjmwSt0eRedlaAlUME9Fobfa0M74R+vhKBAZKF1T+4PN1g6GcBP4zuxFM+xP/tA8AOAD0IzgHwfAiGQNwIYAXAC4GJV0BecR2w4yCg54G5w8DRfcCRu4H7F4HjaMBgc7pzBcAigBkieZw/TKCMPyJBlk8zbf1Rbhf+qJRrP6zrfzqbm0/x5/L/hgCQ/NzLAVwN4G4AOyEYAZUBpAfoWUA2gfwisO33gPknoM5/1Xhjy9nrmuMbGs2B4dqAaqpBUdJQkTRAaRqiKUpqSiGCIKJBzcSISIEwgomhtBEBlQgVdFeiODYRlDKRqvdMT2hiKBMbMBYo1IRGaaEygILRIrpD1euYSGsRgWgFZaih4i6VgtJK1WKjAR1TQAENI2oINJTRIAmjY4I6+TyMQCACiggBbYyhIUmATB8mBUJhksMn94+kooZJ/sqIoACggjKgUEQigMoknzAgJYkcAqUUASiTpNrJf5P/kEwCZxQpEUgUxzEI0SqKYiavleVBAgghSK+SioASQIHJtUAYawMDkkopKlEm+XrWBKwToDE0NAYiIhAomuQIFiUQpbRSkVYiJKlIo4whSLIWRSCgSApENARaQSgCGEJARiQUaSKAQkCD0MlLixBi0h9vQBCk0qRAIEqUEhEKRCdnK2FIMvnZEAUIRIuIBtBVUbREcInarHS1Xl5eXlx+/JFH2kcO7jMIc0VOdLPyhxwASpnCv12fVwH4aWDsvwBjbcjwDLD8KLjtoSHuu35Zvennz2tt2ja2eXAo2jk4oHYYo3e1e3p7z3Cd1hyFwUisORhrUzNaIqNZ0zHq2iAioWCotIH0eoTuArqnYHqAjiFGC2gEJhaJe1A6FppYDLsCExNGG5hYRBiJicUwFpKA0RDTo8Q9KmoQFNIQMCImJkAxSDYgaABjCBpAKBBCtCZokGzuZGkkmyfZRgISxpDJ9k9WMpFuO0DAdP+nd5Im+const TARGET_ARTISTS = [
  { canonical: 'Matuê', aliases: ['matue', 'matuê'] },
  { canonical: 'Teto', aliases: ['teto'] },
  { canonical: 'WIU', aliases: ['wiu'] },
  { canonical: 'Brandão85', aliases: ['brandao', 'brandão', 'brandao85', 'brandão85'] },
];

export function serviceFeeCents(priceCents) {
  if (!Number.isFinite(priceCents) || priceCents < 0) throw new Error('Preço inválido');
  if (priceCents <= 5000) return 700;
  return Math.ceil(priceCents / 5000) * 500;
}

export function normalizeText(value = '') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function matchedArtists(...values) {
  const haystack = normalizeText(values.flat().filter(Boolean).join(' | '));
  return TARGET_ARTISTS.filter(a => a.aliases.some(x => {
    const alias = normalizeText(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${alias}([^a-z0-9]|$)`, 'i').test(haystack);
  })).map(a => a.canonical);
}

const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
});

const errorResponse = (message, status = 400, code = 'request_error') => json({ error: message, code }, status);

function requiredEnv(env) {
  const keys = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missing = keys.filter(k => !env[k]);
  if (!env.SUPABASE_SECRET_KEY && !env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push('SUPABASE_SECRET_KEY');
  }
  if (missing.length) throw new Error(`Configuração ausente: ${missing.join(', ')}`);
}

async function requestJson(request) {
  const type = request.headers.get('content-type') || '';
  if (!type.includes('application/json')) throw new Response('Use application/json', { status: 415 });
  return request.json();
}

async function supabase(env, path, options = {}) {
  requiredEnv(env);
  const admin = options.admin !== false;
  const key = admin
    ? (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY)
    : env.SUPABASE_ANON_KEY;
  const headers = new Headers(options.headers || {});
  headers.set('apikey', key);
  // As chaves novas sb_secret_/sb_publishable_ não são JWTs. A autorização
  // Bearer só é necessária para manter compatibilidade com as chaves antigas.
  if (key.startsWith('eyJ')) headers.set('authorization', `Bearer ${key}`);
  if (options.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
  const res = await fetch(`${env.SUPABASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Supabase ${res.status}: ${detail.slice(0, 600)}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

let septemberSeedPromise;

async function seedSeptemberEvents(env) {
  const now = new Date().toISOString();
  const events = SEPTEMBER_EVENT_SEEDS.map(event => ({
    source: 'guiche_agenda_confirmada', review_status: 'aprovado', paused: false,
    description: '', image_url: null, ends_at: null, venue_name: '', address: '',
    city: '', state: '', age_rating: null, lineup: [], matched_artists: [],
    last_verified_at: now, ...event,
  }));
  await supabase(env, '/rest/v1/events?on_conflict=source,source_event_id', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify(events),
  });

  const [recife, festaDoChefe, tetoUClub] = await Promise.all([
    supabase(env, '/rest/v1/events?source=eq.guiche_agenda_confirmada&source_event_id=eq.wiu-recife-2026-09-26&select=id'),
    supabase(env, '/rest/v1/events?source=eq.guiche_agenda_confirmada&source_event_id=eq.festa-do-chefe-sao-paulo-2026-09-25&select=id'),
    supabase(env, '/rest/v1/events?source=eq.guiche_agenda_confirmada&source_event_id=eq.teto-uclub-novo-hamburgo-2026-09-25&select=id'),
  ]);
  if (recife?.[0]?.id) await supabase(env, '/rest/v1/ticket_options?on_conflict=event_id,name,category', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify([
      {
        event_id: recife[0].id, name: '4º lote — feminino', category: 'open bar',
        supplier_price_cents: 26000, supplier_fee_cents: 2600, sale_status: 'disponivel',
        benefit_requirements: 'Evento para maiores de 18 anos. Documento original com foto obrigatório.', last_verified_at: now,
      },
      {
        event_id: recife[0].id, name: '5º lote — masculino', category: 'open bar',
        supplier_price_cents: 34000, supplier_fee_cents: 3400, sale_status: 'disponivel',
        benefit_requirements: 'Evento para maiores de 18 anos. Documento original com foto obrigatório.', last_verified_at: now,
      },
    ]),
  });
  if (festaDoChefe?.[0]?.id) await supabase(env, '/rest/v1/ticket_options?on_conflict=event_id,name,category', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify([{
      event_id: festaDoChefe[0].id, name: 'Área VIP Open Bar Premium — 5º lote', category: 'open bar',
      supplier_price_cents: 25000, supplier_fee_cents: 3500, sale_status: 'disponivel',
      benefit_requirements: 'Área VIP Open Bar Premium. É necessário levar um ecocopo ou adquirir um no local.',
      last_verified_at: now,
    }]),
  });
  if (tetoUClub?.[0]?.id) await supabase(env, '/rest/v1/ticket_options?on_conflict=event_id,name,category', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify([
      {
        event_id: tetoUClub[0].id, name: 'Pista — 2º lote', category: 'inteira',
        supplier_price_cents: 7000, supplier_fee_cents: 840, sale_status: 'disponivel',
        benefit_requirements: 'Acesso à pista principal e ao Club. Classificação: 16 anos; menores de 18 anos somente acompanhados dos pais ou responsável legal/tutor, ou emancipados, com a documentação exigida.',
        last_verified_at: now,
      },
      {
        event_id: tetoUClub[0].id, name: 'Mezanino — 2º lote', category: 'inteira',
        supplier_price_cents: 12500, supplier_fee_cents: 1500, sale_status: 'disponivel',
        benefit_requirements: 'Vista superior junto aos camarotes, bar exclusivo e acesso à pista e ao Club. Não inclui mesa. Classificação: 16 anos; menores de 18 anos somente acompanhados dos pais ou responsável legal/tutor, ou emancipados, com a documentação exigida.',
        last_verified_at: now,
      },
    ]),
  });
}

async function ensureSeptemberEvents(env) {
  if (!septemberSeedPromise) {
    septemberSeedPromise = seedSeptemberEvents(env).catch(error => {
      septemberSeedPromise = null;
      throw error;
    });
  }
  return septemberSeedPromise;
}

async function getUser(request, env) {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) throw new Response('Entre na sua conta.', { status: 401 });
  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: env.SUPABASE_ANON_KEY, authorization },
  });
  if (!res.ok) throw new Response('Sessão inválida ou expirada.', { status: 401 });
  return res.json();
}

async function requireAdmin(request, env) {
  const user = await getUser(request, env);
  const rows = await supabase(env, `/rest/v1/profiles?id=eq.${user.id}&select=id,is_admin,full_name`);
  if (!rows?.[0]?.is_admin) throw new Response('Acesso restrito ao administrador.', { status: 403 });
  return { user, profile: rows[0] };
}

async function audit(env, actorId, action, entityType, entityId, metadata = {}) {
  await supabase(env, '/rest/v1/audit_log', {
    method: 'POST', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ actor_id: actorId, action, entity_type: entityType, entity_id: entityId, metadata }),
  });
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.toString() : null;
  } catch { return null; }
}

async function sendBrevo(env, { to, subject, html, attachment }) {
  if (!env.BREVO_API_KEY || !env.BREVO_SENDER_EMAIL) throw new Error('Brevo ainda não configurado');
  const body = {
    sender: { name: env.APP_NAME || 'Guichê da 30', email: env.BREVO_SENDER_EMAIL },
    to: [{ email: to }], subject, htmlContent: html,
  };
  if (attachment) body.attachment = [attachment];
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST', headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

const money = cents => (Number(cents || 0) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

async function emailOrder(env, userEmail, order, kind, ticketUrl) {
  const name = env.APP_NAME || 'Guichê da 30';
  const content = {
    paid: [`Pagamento confirmado — ${name}`, `Seu pagamento do pedido <b>${order.id}</b> foi aprovado. Estamos comprando seu ingresso. O envio acontecerá em até 1 hora.`],
    preparing: [`Estamos preparando seu ingresso`, `Seu pedido <b>${order.id}</b> está sendo comprado no fornecedor oficial.`],
    delivered: [`Seu ingresso chegou — ${name}`, `Seu ingresso do pedido <b>${order.id}</b> está disponível. ${ticketUrl ? `<p><a href="${ticketUrl}">Abrir ingresso com segurança</a></p>` : ''}<p>Ele também ficará em <b>Meus ingressos</b>.</p>`],
  }[kind];
  if (!content) return;
  await sendBrevo(env, { to: userEmail, subject: content[0], html: `<div style="font-family:Arial;max-width:600px"><h1>${name}</h1><p>${content[1]}</p><p>Valor: <b>${money(order.total_cents)}</b></p></div>` });
}

async function routePublic(request, env, url) {
  if (url.pathname === '/api/config') return json({
    appName: env.APP_NAME || 'Guichê da 30',
    supabaseUrl: env.SUPABASE_URL || '', supabaseAnonKey: env.SUPABASE_ANON_KEY || '', version: APP_VERSION,
  });

  if (url.pathname === '/api/events' && request.method === 'GET') {
    try { await ensureSeptemberEvents(env); }
    catch (error) { console.error('Falha ao cadastrar agenda de setembro:', error); }
    const search = normalizeText(url.searchParams.get('q') || '');
    const state = (url.searchParams.get('state') || '').toUpperCase();
    let path = '/rest/v1/events?select=*,ticket_options(*)&review_status=eq.aprovado&paused=eq.false&starts_at=gt.now()&order=starts_at.asc';
    if (state) path += `&state=eq.${encodeURIComponent(state)}`;
    const rows = await supabase(env, path);
    const filtered = search ? rows.filter(e => normalizeText([e.title, e.city, e.venue_name, ...(e.lineup || [])].join(' ')).includes(search)) : rows;
    const events = filtered.map(event => ({ ...event, image_url: eventImage(event) }));
    return json({ events }, 200, { 'cache-control': 'public, max-age=60' });
  }

  if (url.pathname === '/api/me' && request.method === 'GET') {
    const user = await getUser(request, env);
    const [profiles, orders, tickets] = await Promise.all([
      supabase(env, `/rest/v1/profiles?id=eq.${user.id}&select=id,full_name,cpf,phone,address,is_admin`),
      supabase(env, `/rest/v1/orders?user_id=eq.${user.id}&select=*,events(title,starts_at,city,state,image_url),ticket_options(name,category)&order=created_at.desc`),
      supabase(env, `/rest/v1/tickets?user_id=eq.${user.id}&select=*,orders(events(title,starts_at))&order=created_at.desc`),
    ]);
    return json({ user: { id: user.id, email: user.email }, profile: profiles[0], orders, tickets });
  }

  if (url.pathname.startsWith('/api/tickets/') && request.method === 'GET') {
    const user = await getUser(request, env);
    const id = url.pathname.split('/').pop();
    const rows = await supabase(env, `/rest/v1/tickets?id=eq.${id}&user_id=eq.${user.id}&select=*`);
    const ticket = rows[0];
    if (!ticket) return errorResponse('Ingresso não encontrado.', 404);
    if (ticket.external_url) return json({ url: ticket.external_url });
    const signed = await supabase(env, `/storage/v1/object/sign/tickets/${ticket.storage_path}`, {
      method: 'POST', body: JSON.stringify({ expiresIn: 300 }),
    });
    return json({ url: `${env.SUPABASE_URL}/storage/v1${signed.signedURL}` });
  }

  if (url.pathname === '/api/profile' && request.method === 'PATCH') {
    const user = await getUser(request, env);
    const body = await requestJson(request);
    const update = {
      full_name: String(body.full_name || '').trim().slice(0, 120),
      cpf: String(body.cpf || '').replace(/\D/g, '').slice(0, 11),
      phone: String(body.phone || '').replace(/\D/g, '').slice(0, 14),
      address: body.address && typeof body.address === 'object' ? body.address : {},
    };
    await supabase(env, `/rest/v1/profiles?id=eq.${user.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(update) });
    return json({ ok: true });
  }

  if (url.pathname === '/api/checkout' && request.method === 'POST') {
    if (!env.MERCADO_PAGO_ACCESS_TOKEN) return errorResponse('Pagamento ainda não configurado.', 503);
    const user = await getUser(request, env);
    const body = await requestJson(request);
    const quantity = Math.min(6, Math.max(1, Number(body.quantity || 1)));
    const optionRows = await supabase(env, `/rest/v1/ticket_options?id=eq.${body.ticket_option_id}&select=*,events(*)`);
    const option = optionRows[0];
    if (!option || option.sale_status !== 'disponivel' || option.events?.paused || option.events?.review_status !== 'aprovado') {
      return errorResponse('Este ingresso não está disponível no momento.', 409, 'not_available');
    }
    if (option.available_quantity != null && option.available_quantity < quantity) return errorResponse('Quantidade indisponível.', 409);
    const unitTicket = option.displayed_price_cents;
    const unitFee = serviceFeeCents(unitTicket);
    const ticketTotal = unitTicket * quantity;
    const serviceTotal = unitFee * quantity;
    const total = ticketTotal + serviceTotal;
    const attendeeData = {
      benefit_type: String(body.benefit_type || option.category).slice(0, 80),
      benefit_document: String(body.benefit_document || '').slice(0, 160),
      attendees: Array.isArray(body.attendees) ? body.attendees.slice(0, 6).map(x => ({
        name: String(x.name || '').slice(0, 120), cpf: String(x.cpf || '').replace(/\D/g, '').slice(0, 11),
      })) : [],
    };
    const orderRows = await supabase(env, '/rest/v1/orders?select=*', {
      method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({
        user_id: user.id, event_id: option.event_id, ticket_option_id: option.id, quantity,
        attendee_data: attendeeData, unit_ticket_cents: unitTicket, unit_service_fee_cents: unitFee,
        ticket_total_cents: ticketTotal, service_fee_total_cents: serviceTotal, total_cents: total,
        estimated_profit_cents: serviceTotal,
      }),
    });
    const order = orderRows[0];
    const preferenceRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST', headers: { authorization: `Bearer ${env.MERCADO_PAGO_ACCESS_TOKEN}`, 'content-type': 'application/json', 'x-idempotency-key': order.id },
      body: JSON.stringify({
        external_reference: order.id,
        items: [
          { id: option.id, title: `${option.events.title} — ${option.name}`, quantity, currency_id: 'BRL', unit_price: unitTicket / 100 },
          { id: `service-${order.id}`, title: 'Taxa de serviço', quantity, currency_id: 'BRL', unit_price: unitFee / 100 },
        ],
        payer: { email: user.email },
        back_urls: { success: `${env.APP_URL}/?payment=success`, pending: `${env.APP_URL}/?payment=pending`, failure: `${env.APP_URL}/?payment=failure` },
        auto_return: 'approved',
        notification_url: `${env.APP_URL}/webhooks/mercadopago`,
        statement_descriptor: 'GUICHE DA 30',
      }),
    });
    if (!preferenceRes.ok) {
      await supabase(env, `/rest/v1/orders?id=eq.${order.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'cancelado', payment_status: 'preference_error' }) });
      return errorResponse('Não foi possível iniciar o pagamento.', 502, 'payment_provider_error');
    }
    const preference = await preferenceRes.json();
    await supabase(env, `/rest/v1/orders?id=eq.${order.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ mercado_pago_preference_id: preference.id }) });
    return json({ order_id: order.id, checkout_url: preference.init_point });
  }
  return null;
}

async function routeAdmin(request, env, url) {
  if (!url.pathname.startsWith('/api/admin/')) return null;
  const { user } = await requireAdmin(request, env);

  if (url.pathname === '/api/admin/catalog/run' && request.method === 'POST') {
    const imported = await runCatalog(env);
    await audit(env, user.id, 'catalog_run', 'catalog', null, { imported });
    return json({ imported });
  }

  if (url.pathname === '/api/admin/dashboard' && request.method === 'GET') {
    const [orders, events] = await Promise.all([
      supabase(env, '/rest/v1/orders?select=*,profiles(full_name,cpf,phone),events(title,starts_at,official_url,supplier_name),ticket_options(name,category)&order=created_at.desc&limit=200'),
      supabase(env, '/rest/v1/events?select=*,ticket_options(*)&order=starts_at.asc'),
    ]);
    const paid = orders.filter(o => !['aguardando_pagamento','cancelado','reembolsado'].includes(o.status));
    const financial = paid.reduce((a, o) => ({
      sold: a.sold + o.total_cents, tickets: a.tickets + o.ticket_total_cents,
      fees: a.fees + o.service_fee_total_cents, mp: a.mp + o.mercado_pago_fee_cents,
      profit: a.profit + (o.service_fee_total_cents - o.mercado_pago_fee_cents),
    }), { sold: 0, tickets: 0, fees: 0, mp: 0, profit: 0 });
    return json({ orders, events, financial });
  }

  if (url.pathname === '/api/admin/events' && request.method === 'POST') {
    const body = await requestJson(request);
    const event = {
      source: body.source || 'manual', source_event_id: body.source_event_id || crypto.randomUUID(),
      official_url: safeUrl(body.official_url), supplier_name: String(body.supplier_name || ''),
      title: String(body.title || ''), description: String(body.description || ''), image_url: safeUrl(body.image_url),
      starts_at: body.starts_at, ends_at: body.ends_at || null, venue_name: String(body.venue_name || ''),
      address: String(body.address || ''), city: String(body.city || ''), state: String(body.state || '').toUpperCase().slice(0, 2),
      age_rating: String(body.age_rating || ''), lineup: body.lineup || [], matched_artists: matchedArtists(body.title, body.description, ...(body.lineup || [])),
      review_status: body.review_status || 'aprovado', paused: Boolean(body.paused), last_verified_at: new Date().toISOString(),
    };
    if (!event.official_url || !event.title || !event.starts_at || !event.matched_artists.length) return errorResponse('Evento incompleto ou sem artista da lista.');
    const rows = await supabase(env, '/rest/v1/events?select=*', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(event) });
    await audit(env, user.id, 'event_created', 'event', rows[0].id);
    return json({ event: rows[0] }, 201);
  }

  const eventImageUploadMatch = url.pathname.match(/^\/api\/admin\/events\/([0-9a-f-]+)\/image-upload-url$/);
  if (eventImageUploadMatch && request.method === 'POST') {
    const body = await requestJson(request);
    const mime = String(body.content_type || '').toLowerCase();
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(mime)) return errorResponse('Use uma imagem JPG, PNG ou WEBP.');
    const extension = mime === 'image/png' ? 'png' : (mime === 'image/webp' ? 'webp' : 'jpg');
    const path = `${eventImageUploadMatch[1]}/${crypto.randomUUID()}.${extension}`;
    try {
      await supabase(env, '/storage/v1/bucket', {
        method: 'POST', body: JSON.stringify({
          id: 'event-images', name: 'event-images', public: true,
          file_size_limit: 5242880, allowed_mime_types: allowedTypes,
        }),
      });
    } catch (error) {
      if (!/already exists|duplicate/i.test(String(error?.message || error))) throw error;
    }
    const signed = await supabase(env, `/storage/v1/object/upload/sign/event-images/${path}`, { method: 'POST', body: '{}' });
    return json({
      upload_url: `${env.SUPABASE_URL}/storage/v1/object/upload/sign/event-images/${path}?token=${encodeURIComponent(signed.token)}`,
      public_url: `${env.SUPABASE_URL}/storage/v1/object/public/event-images/${path}`,
    });
  }

  const eventMatch = url.pathname.match(/^\/api\/admin\/events\/([0-9a-f-]+)$/);
  if (eventMatch && request.method === 'PATCH') {
    const body = await requestJson(request);
    const allowed = ['title','description','image_url','starts_at','ends_at','venue_name','address','city','state','age_rating','lineup','review_status','paused','official_url','supplier_name','verification_error'];
    const update = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
    if (update.official_url && !safeUrl(update.official_url)) return errorResponse('Link oficial inválido.');
    await supabase(env, `/rest/v1/events?id=eq.${eventMatch[1]}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(update) });
    await audit(env, user.id, 'event_updated', 'event', eventMatch[1], update);
    return json({ ok: true });
  }

  const optionMatch = url.pathname.match(/^\/api\/admin\/ticket-options\/([0-9a-f-]+)$/);
  if (optionMatch && request.method === 'PATCH') {
    const body = await requestJson(request);
    const allowed = ['name','category','supplier_price_cents','supplier_fee_cents','available_quantity','sale_status','benefit_requirements'];
    const update = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
    await supabase(env, `/rest/v1/ticket_options?id=eq.${optionMatch[1]}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(update) });
    await audit(env, user.id, 'ticket_option_updated', 'ticket_option', optionMatch[1], update);
    return json({ ok: true });
  }

  if (url.pathname === '/api/admin/ticket-options' && request.method === 'POST') {
    const body = await requestJson(request);
    const rows = await supabase(env, '/rest/v1/ticket_options?select=*', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({
      event_id: body.event_id, name: String(body.name || ''), category: String(body.category || 'inteira'),
      supplier_price_cents: Number(body.supplier_price_cents), supplier_fee_cents: Number(body.supplier_fee_cents || 0),
      available_quantity: body.available_quantity == null ? null : Number(body.available_quantity),
      sale_status: body.sale_status || 'disponivel', benefit_requirements: body.benefit_requirements || null,
      last_verified_at: new Date().toISOString(),
    }) });
    await audit(env, user.id, 'ticket_option_created', 'ticket_option', rows[0].id);
    return json({ option: rows[0] }, 201);
  }

  const orderMatch = url.pathname.match(/^\/api\/admin\/orders\/([0-9a-f-]+)$/);
  if (orderMatch && request.method === 'PATCH') {
    const body = await requestJson(request);
    const allowedStatus = ['pagamento_aprovado','comprando_ingresso','ingresso_disponivel','ingresso_entregue','cancelado','reembolsado'];
    if (!allowedStatus.includes(body.status)) return errorResponse('Status inválido.');
    const update = { status: body.status };
    if (body.status === 'comprando_ingresso') update.purchase_started_at = new Date().toISOString();
    if (body.status === 'ingresso_entregue') update.delivered_at = new Date().toISOString();
    await supabase(env, `/rest/v1/orders?id=eq.${orderMatch[1]}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(update) });
    if (body.status === 'comprando_ingresso') {
      const orders = await supabase(env, `/rest/v1/orders?id=eq.${orderMatch[1]}&select=*`);
      const account = await supabase(env, `/auth/v1/admin/users/${orders[0].user_id}`);
      await emailOrder(env, account.email, { ...orders[0], ...update }, 'preparing');
    }
    await audit(env, user.id, 'order_status_updated', 'order', orderMatch[1], update);
    return json({ ok: true });
  }

  const refundMatch = url.pathname.match(/^\/api\/admin\/orders\/([0-9a-f-]+)\/refund$/);
  if (refundMatch && request.method === 'POST') {
    if (!env.MERCADO_PAGO_ACCESS_TOKEN) return errorResponse('Mercado Pago não configurado.', 503);
    const orders = await supabase(env, `/rest/v1/orders?id=eq.${refundMatch[1]}&select=*`);
    const order = orders[0];
    if (!order?.mercado_pago_payment_id) return errorResponse('Este pedido não possui pagamento confirmado.', 409);
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${order.mercado_pago_payment_id}/refunds`, {
      method: 'POST', headers: { authorization: `Bearer ${env.MERCADO_PAGO_ACCESS_TOKEN}`, 'content-type': 'application/json', 'x-idempotency-key': `refund-${order.id}` }, body: '{}',
    });
    if (!res.ok) return errorResponse('O Mercado Pago não aceitou o reembolso.', 502);
    await supabase(env, `/rest/v1/orders?id=eq.${order.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'reembolsado', payment_status: 'refunded' }) });
    await audit(env, user.id, 'order_refunded', 'order', order.id);
    return json({ ok: true });
  }

  if (url.pathname === '/api/admin/tickets/upload-url' && request.method === 'POST') {
    const body = await requestJson(request);
    const filename = String(body.filename || 'ingresso.pdf').replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100);
    const path = `${body.order_id}/${crypto.randomUUID()}-${filename}`;
    const signed = await supabase(env, `/storage/v1/object/upload/sign/tickets/${path}`, { method: 'POST', body: '{}' });
    return json({ path, token: signed.token, upload_url: `${env.SUPABASE_URL}/storage/v1/object/upload/sign/tickets/${path}?token=${encodeURIComponent(signed.token)}` });
  }

  if (url.pathname === '/api/admin/tickets/finalize' && request.method === 'POST') {
    const body = await requestJson(request);
    const orders = await supabase(env, `/rest/v1/orders?id=eq.${body.order_id}&select=*`);
    const order = orders[0];
    if (!order) return errorResponse('Pedido não encontrado.', 404);
    const external = body.kind === 'link' ? safeUrl(body.external_url) : null;
    if (body.kind === 'link' && !external) return errorResponse('Link inválido.');
    const rows = await supabase(env, '/rest/v1/tickets?select=*', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify({
      order_id: order.id, user_id: order.user_id, kind: body.kind === 'link' ? 'link' : (body.kind === 'image' ? 'image' : 'file'),
      storage_path: body.storage_path || null, external_url: external, original_filename: body.original_filename || null,
    }) });
    await supabase(env, `/rest/v1/orders?id=eq.${order.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'ingresso_entregue', ticket_added_at: new Date().toISOString(), delivered_at: new Date().toISOString() }) });
    const userData = await supabase(env, `/auth/v1/admin/users/${order.user_id}`);
    let ticketUrl = external;
    if (!ticketUrl && body.storage_path) {
      const signed = await supabase(env, `/storage/v1/object/sign/tickets/${body.storage_path}`, { method: 'POST', body: JSON.stringify({ expiresIn: 604800 }) });
      ticketUrl = `${env.SUPABASE_URL}/storage/v1${signed.signedURL}`;
    }
    await emailOrder(env, userData.email, order, 'delivered', ticketUrl);
    await audit(env, user.id, 'ticket_delivered', 'order', order.id, { ticket_id: rows[0].id });
    return json({ ticket: rows[0], delivered: true });
  }

  if (url.pathname === '/api/admin/tickets/resend' && request.method === 'POST') {
    const body = await requestJson(request);
    const rows = await supabase(env, `/rest/v1/tickets?id=eq.${body.ticket_id}&select=*,orders(*)`);
    const ticket = rows[0];
    if (!ticket) return errorResponse('Ingresso não encontrado.', 404);
    const userData = await supabase(env, `/auth/v1/admin/users/${ticket.user_id}`);
    let ticketUrl = ticket.external_url;
    if (!ticketUrl && ticket.storage_path) {
      const signed = await supabase(env, `/storage/v1/object/sign/tickets/${ticket.storage_path}`, { method: 'POST', body: JSON.stringify({ expiresIn: 604800 }) });
      ticketUrl = `${env.SUPABASE_URL}/storage/v1${signed.signedURL}`;
    }
    await emailOrder(env, userData.email, ticket.orders, 'delivered', ticketUrl);
    await audit(env, user.id, 'ticket_resent', 'ticket', ticket.id);
    return json({ ok: true });
  }
  return errorResponse('Rota administrativa não encontrada.', 404);
}

async function verifyMercadoPagoSignature(request, env, dataId) {
  if (!env.MERCADO_PAGO_WEBHOOK_SECRET) return false;
  const signature = request.headers.get('x-signature') || '';
  const requestId = request.headers.get('x-request-id') || '';
  const parts = Object.fromEntries(signature.split(',').map(p => p.split('=').map(x => x.trim())));
  if (!parts.ts || !parts.v1) return false;
  const manifest = `id:${dataId};request-id:${requestId};ts:${parts.ts};`;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.MERCADO_PAGO_WEBHOOK_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(manifest));
  const hex = [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  return hex.length === parts.v1.length && crypto.subtle.timingSafeEqual
    ? crypto.subtle.timingSafeEqual(new TextEncoder().encode(hex), new TextEncoder().encode(parts.v1))
    : hex === parts.v1;
}

async function handleMercadoPago(request, env, url) {
  const body = await request.json().catch(() => ({}));
  const dataId = String(body?.data?.id || url.searchParams.get('data.id') || '');
  if (!dataId || !(await verifyMercadoPagoSignature(request, env, dataId))) return errorResponse('Assinatura inválida.', 401);
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(dataId)}`, { headers: { authorization: `Bearer ${env.MERCADO_PAGO_ACCESS_TOKEN}` } });
  if (!res.ok) return errorResponse('Pagamento não localizado.', 502);
  const payment = await res.json();
  const orderId = payment.external_reference;
  if (!orderId) return json({ ok: true });
  const orders = await supabase(env, `/rest/v1/orders?id=eq.${orderId}&select=*`);
  const order = orders[0];
  if (!order) return json({ ok: true });
  const mpFee = Math.round((payment.fee_details || []).reduce((sum, x) => sum + Number(x.amount || 0), 0) * 100);
  const update = { payment_status: payment.status, mercado_pago_payment_id: String(payment.id), mercado_pago_fee_cents: mpFee, estimated_profit_cents: order.service_fee_total_cents - mpFee };
  if (payment.status === 'approved' && order.status === 'aguardando_pagamento') {
    Object.assign(update, { status: 'pagamento_aprovado', paid_at: payment.date_approved || new Date().toISOString() });
  } else if (payment.status === 'refunded') update.status = 'reembolsado';
  else if (['cancelled','rejected','charged_back'].includes(payment.status)) update.status = 'cancelado';
  await supabase(env, `/rest/v1/orders?id=eq.${order.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(update) });
  if (payment.status === 'approved' && order.status === 'aguardando_pagamento') {
    const userData = await supabase(env, `/auth/v1/admin/users/${order.user_id}`);
    await emailOrder(env, userData.email, { ...order, ...update }, 'paid');
  }
  await audit(env, null, 'payment_updated', 'order', order.id, { payment_id: dataId, status: payment.status, fee_cents: mpFee });
  return json({ ok: true });
}

export function parseJsonLdEvents(html, sourceUrl, supplierName) {
  const out = [];
  const scripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of scripts) {
    try {
      const data = JSON.parse(match[1].replace(/&quot;/g, '"'));
      const roots = Array.isArray(data) ? data : data['@graph'] || [data];
      const nodes = roots.flatMap(root => {
        const subEvents = Array.isArray(root.subEvent) ? root.subEvent : root.subEvent ? [root.subEvent] : [];
        return [root, ...subEvents.map(event => ({
          ...event,
          description: event.description || root.description,
          image: event.image || root.image,
        }))];
      });
      for (const item of nodes) {
        if (!String(item['@type'] || '').toLowerCase().includes('event')) continue;
        const performers = Array.isArray(item.performer) ? item.performer : item.performer ? [item.performer] : [];
        const offers = Array.isArray(item.offers) ? item.offers : item.offers ? [item.offers] : [];
        const officialUrl = safeUrl(item.url) || safeUrl(offers.find(offer => offer?.url)?.url) || sourceUrl;
        const artists = matchedArtists(item.name, item.description, ...performers.map(p => p?.name));
        if (!artists.length || !item.startDate) continue;
        const location = item.location || {};
        const address = location.address || {};
        out.push({
          source: new URL(sourceUrl).hostname, source_event_id: String(item.identifier || officialUrl || `${item.name}-${item.startDate}`),
          official_url: officialUrl, supplier_name: supplierName, title: item.name,
          description: String(item.description || '').replace(/<[^>]+>/g, ' ').trim(),
          image_url: safeUrl(Array.isArray(item.image) ? item.image[0] : item.image), starts_at: item.startDate, ends_at: item.endDate || null,
          venue_name: location.name || '', address: [address.streetAddress, address.addressLocality, address.addressRegion].filter(Boolean).join(', '),
          city: address.addressLocality || '', state: address.addressRegion || '', lineup: performers.map(p => p?.name).filter(Boolean),
          matched_artists: artists, review_status: 'pendente', last_verified_at: new Date().toISOString(),
        });
      }
    } catch { /* ignora JSON-LD inválido da origem */ }
  }
  return out;
}

async function fetchPageHtml(env, url) {
  const direct = await fetch(url, { headers: { 'user-agent': 'GuicheDa30/1.0 (+event catalog verifier)', accept: 'text/html' } });
  const html = direct.ok ? await direct.text() : '';
  if (html.includes('application/ld+json') || !env.CF_ACCOUNT_ID || !env.CF_BROWSER_API_TOKEN) return html;
  const rendered = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/browser-rendering/content`, {
    method: 'POST', headers: { authorization: `Bearer ${env.CF_BROWSER_API_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify({ url, gotoOptions: { waitUntil: 'networkidle0' } }),
  });
  return rendered.ok ? rendered.text() : html;
}

async function upsertEvent(env, event) {
  await supabase(env, '/rest/v1/events?on_conflict=source,source_event_id', {
    method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(event),
  });
}

async function importTicketmaster(env) {
  if (!env.TICKETMASTER_API_KEY) return 0;
  let count = 0;
  for (const artist of TARGET_ARTISTS) {
    const api = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
    api.searchParams.set('apikey', env.TICKETMASTER_API_KEY); api.searchParams.set('keyword', artist.canonical);
    api.searchParams.set('countryCode', 'BR'); api.searchParams.set('classificationName', 'music'); api.searchParams.set('size', '50');
    api.searchParams.set('sort', 'date,asc');
    const res = await fetch(api);
    if (!res.ok) continue;
    const data = await res.json();
    for (const item of data?._embedded?.events || []) {
      const venue = item?._embedded?.venues?.[0] || {};
      const artists = matchedArtists(item.name, ...(item?._embedded?.attractions || []).map(a => a.name));
      if (!artists.length) continue;
      await upsertEvent(env, {
        source: 'ticketmaster', source_event_id: item.id, official_url: item.url, supplier_name: 'Ticketmaster', title: item.name,
        description: item.info || item.pleaseNote || '', image_url: [...(item.images || [])].sort((a,b) => (b.width || 0) - (a.width || 0))[0]?.url || null,
        starts_at: item.dates?.start?.dateTime || `${item.dates?.start?.localDate}T${item.dates?.start?.localTime || '12:00:00'}-03:00`,
        venue_name: venue.name || '', address: venue.address?.line1 || '', city: venue.city?.name || '', state: venue.state?.stateCode || '',
        lineup: (item?._embedded?.attractions || []).map(a => a.name), matched_artists: artists, review_status: 'pendente',
        last_verified_at: new Date().toISOString(),
      }); count++;
    }
  }
  return count;
}

async function runCatalog(env) {
  let imported = await importTicketmaster(env);
  const watches = await supabase(env, '/rest/v1/source_watch?active=eq.true&select=*');
  for (const watch of watches) {
    try {
      const html = await fetchPageHtml(env, watch.url);
      const events = parseJsonLdEvents(html, watch.url, watch.supplier_name);
      for (const event of events) { await upsertEvent(env, event); imported++; }
      await supabase(env, `/rest/v1/source_watch?id=eq.${watch.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ last_checked_at: new Date().toISOString(), last_error: null }) });
    } catch (error) {
      await supabase(env, `/rest/v1/source_watch?id=eq.${watch.id}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ last_checked_at: new Date().toISOString(), last_error: String(error.message).slice(0, 500) }) });
    }
  }
  return imported;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    try {
      if (url.pathname === '/health') return json({ ok: true, version: APP_VERSION });
      if (url.pathname === '/app-icon.png') {
        const bytes = Uint8Array.from(atob(APP_ICON_BASE64), c => c.charCodeAt(0));
        return new Response(bytes, { headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=31536000, immutable' } });
      }
      if (url.pathname === '/event-image') {
        const source = safeUrl(url.searchParams.get('url'));
        if (!source) return errorResponse('Imagem inválida.', 400);
        const host = new URL(source).hostname.toLowerCase();
        if (!IMAGE_PROXY_HOSTS.some(allowed => host === allowed || host.endsWith(`.${allowed}`))) return errorResponse('Origem de imagem não permitida.', 403);
        const image = await fetch(source, { headers: { 'user-agent': 'Mozilla/5.0 GuicheDa30/1.1', accept: 'image/avif,image/webp,image/png,image/jpeg,*/*', referer: `https://${host}/` } });
        if (!image.ok) return errorResponse('Imagem indisponível.', 502);
        return new Response(image.body, { headers: { 'content-type': image.headers.get('content-type') || 'image/jpeg', 'cache-control': 'public, max-age=86400' } });
      }
      if (url.pathname === '/manifest.webmanifest') return json({
        id: '/', name: env.APP_NAME || 'Guichê da 30', short_name: 'Guichê 30', start_url: '/', scope: '/', display: 'standalone',
        background_color: '#080909', theme_color: '#c8ff35',
        icons: [{ src: '/app-icon.png', sizes: '256x256', type: 'image/png', purpose: 'any maskable' }],
      }, 200, { 'cache-control': 'public, max-age=86400' });
      if (url.pathname === '/admin-manifest.webmanifest') return json({
        id: '/admin', name: 'Painel administrativo — Guichê da 30', short_name: 'Painel 30', start_url: '/admin', scope: '/admin', display: 'standalone',
        background_color: '#f1f3f6', theme_color: '#0b0d0d',
        icons: [{ src: '/app-icon.png', sizes: '256x256', type: 'image/png', purpose: 'any maskable' }],
      }, 200, { 'cache-control': 'public, max-age=300' });
      if (url.pathname === '/webhooks/mercadopago' && request.method === 'POST') return handleMercadoPago(request, env, url);
      const admin = await routeAdmin(request, env, url); if (admin) return admin;
      const pub = await routePublic(request, env, url); if (pub) return pub;
      if (url.pathname.startsWith('/api/')) return errorResponse('Rota não encontrada.', 404);
      const isAdminPage = /^\/admin(?:\/|$)/.test(url.pathname);
      const pageHtml = isAdminPage
        ? APP_HTML.replace('<title>Guichê da 30 — Ingressos</title>', '<title>Painel administrativo — Guichê da 30</title>').replace('href="/manifest.webmanifest"', 'href="/admin-manifest.webmanifest"')
        : APP_HTML;
      return new Response(pageHtml, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'no-store, max-age=0', 'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data:; frame-src https://www.mercadopago.com.br" } });
    } catch (error) {
      if (error instanceof Response) return error;
      console.error(error);
      return errorResponse('Ocorreu um erro interno. Tente novamente.', 500, 'internal_error');
    }
  },
  async scheduled(_controller, env, ctx) { ctx.waitUntil(runCatalog(env)); },
};

const APP_HTML = String.raw`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Guich&#234; da 30 &#8212; Ingressos</title><meta name="description" content="Ingressos para shows de Matu&#234;, Teto, WIU e Brand&#227;o85."><meta name="theme-color" content="#c8ff35"><link rel="icon" type="image/png" href="/app-icon.png"><link rel="apple-touch-icon" href="/app-icon.png"><link rel="manifest" href="/manifest.webmanifest">
<style>
:root{--bg:#080909;--card:#121414;--line:#262a28;--text:#f5f7f5;--muted:#9ba39d;--brand:#c8ff35;--brand2:#81a800;--danger:#ff5b57;--warn:#ffbd2e;--ok:#35d07f;--radius:20px}*{box-sizing:border-box}html{background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}body{margin:0;min-height:100vh;background:radial-gradient(circle at 80% -10%,#23300d 0,transparent 28%),var(--bg)}button,input,select,textarea{font:inherit}button{cursor:pointer}.wrap{width:min(1180px,calc(100% - 28px));margin:auto}header{position:sticky;top:0;z-index:20;background:#080909e8;backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}nav{height:72px;display:flex;align-items:center;gap:18px}.logo{font-weight:950;font-size:22px;letter-spacing:-1px;display:flex;align-items:center;gap:10px}.logo i{font-style:normal;color:var(--brand)}.brand-icon{width:40px;height:40px;border-radius:12px;object-fit:cover}.spacer{flex:1}.navbtn,.btn{border:0;border-radius:999px;padding:11px 16px;background:#1b1e1c;color:var(--text);font-weight:750}.btn.primary{background:var(--brand);color:#111}.btn.danger{background:#3b1818;color:#ffb2af}.hero{padding:54px 0 30px}.eyebrow{color:var(--brand);font-weight:850;text-transform:uppercase;letter-spacing:2px;font-size:12px}.hero h1{font-size:clamp(40px,7vw,82px);line-height:.91;letter-spacing:-4px;margin:14px 0;max-width:820px}.hero p{color:var(--muted);font-size:18px;max-width:600px}.filters{display:grid;grid-template-columns:1fr 150px 160px;gap:10px;margin:28px 0}.field{width:100%;border:1px solid var(--line);background:#111312;color:var(--text);padding:14px 16px;border-radius:14px;outline:none}.field:focus{border-color:var(--brand)}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding-bottom:70px}.card{overflow:hidden;border:1px solid var(--line);border-radius:var(--radius);background:var(--card);transition:.2s}.card:hover{transform:translateY(-3px);border-color:#4b5730}.cover{aspect-ratio:16/10;width:100%;object-fit:cover;background:#20231f}.cardbody{padding:17px}.tag{display:inline-flex;border:1px solid #3b4725;color:var(--brand);border-radius:999px;padding:6px 9px;font-size:11px;font-weight:800;text-transform:uppercase}.card h3{font-size:21px;line-height:1.05;margin:12px 0 8px}.meta{color:var(--muted);font-size:14px}.price{font-size:18px;font-weight:850;margin-top:15px}.empty{grid-column:1/-1;color:var(--muted);padding:60px 0;text-align:center}.modal{position:fixed;inset:0;z-index:50;background:#000b;display:none;align-items:flex-end;justify-content:center}.modal.on{display:flex}.sheet{width:min(760px,100%);max-height:94vh;overflow:auto;background:#101211;border:1px solid var(--line);border-radius:28px 28px 0 0;padding:24px}.sheethead{display:flex;gap:15px;align-items:center}.close{margin-left:auto;background:#292d2a;border:0;color:#fff;width:38px;height:38px;border-radius:50%}.option{border:1px solid var(--line);border-radius:16px;padding:15px;margin:10px 0;display:grid;grid-template-columns:1fr auto;gap:8px}.option.off{opacity:.55}.option strong{font-size:17px}.status{font-size:12px;color:var(--muted)}.notice{border-left:3px solid var(--brand);background:#1a1e16;padding:13px;border-radius:8px;color:#d9ddd8;margin:16px 0}.authbox{display:grid;gap:10px}.tabs{display:flex;gap:8px;margin-bottom:14px}.tabs button.active{background:var(--brand);color:#111}.ticket-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0 16px}.ticket-tabs .btn{border:1px solid var(--line);border-radius:14px}.ticket-tabs .btn.active{background:var(--brand);border-color:var(--brand);color:#111}.account{padding:30px 0 70px}.order{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px;margin:12px 0}.orderline{display:flex;justify-content:space-between;gap:14px;align-items:center}.pill{font-size:11px;font-weight:850;text-transform:uppercase;padding:7px 9px;border-radius:999px;background:#252925}.pill.ok{color:var(--ok)}.pill.warn{color:var(--warn)}.admin-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.metric{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px}.metric b{display:block;font-size:22px}.metric span{color:var(--muted);font-size:12px}.hidden{display:none!important}.toast{position:fixed;right:14px;bottom:20px;z-index:100;background:#232724;border:1px solid #3a403c;padding:14px 17px;border-radius:13px;max-width:330px;box-shadow:0 12px 40px #0008}.admin-order{display:grid;grid-template-columns:1.3fr 1fr auto;gap:12px;align-items:center}.small{font-size:12px;color:var(--muted)}footer{border-top:1px solid var(--line);padding:30px 0;color:var(--muted);font-size:13px}
.public-home{position:relative;overflow-x:hidden;overflow-y:visible;min-height:100%;touch-action:pan-y}.public-home:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.13;background-image:linear-gradient(#baff2420 1px,transparent 1px),linear-gradient(90deg,#baff2420 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(to bottom,#000,transparent 75%)}header{border-bottom-color:#baff2426}nav{height:68px}.hero{padding:68px 0 24px}.hero-row{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(260px,.8fr);gap:32px;align-items:end}.hero h1{max-width:720px;margin:10px 0 0;font-size:clamp(52px,7vw,92px);text-transform:uppercase;line-height:.82;letter-spacing:-5px}.hero h1 span{color:var(--brand);text-shadow:0 0 34px #baff2438}.hero p{margin:0 0 6px;max-width:420px;font-size:17px;line-height:1.55}.filters{grid-template-columns:minmax(0,1fr) 180px;margin:30px 0 18px}.field{min-height:50px;background:#0e100f;border-color:#2c312e}.events-head{display:flex;align-items:end;justify-content:space-between;margin:24px 0 16px}.events-head h2{margin:0;font-size:24px;letter-spacing:-.8px}.event-count{font-size:12px;color:var(--muted);font-weight:800;text-transform:uppercase;letter-spacing:1px}.grid{gap:20px}.card{position:relative;background:linear-gradient(145deg,#151816,#0d0f0e);border-color:#2a2f2c;box-shadow:0 18px 50px #0004}.poster{position:relative;overflow:hidden}.cover{display:block;aspect-ratio:16/10;transition:transform .35s ease}.event-placeholder{display:flex;align-items:flex-end;justify-content:flex-start;padding:20px;background:radial-gradient(circle at 80% 20%,#c8ff3540,transparent 32%),linear-gradient(145deg,#25320f,#090b09);color:#fff;font-weight:950;text-transform:uppercase;letter-spacing:-1px}.event-placeholder span{max-width:85%;font-size:clamp(20px,4vw,34px);line-height:.92}.event-thumb.event-placeholder{padding:10px}.event-thumb.event-placeholder span{font-size:15px}.card:hover .cover{transform:scale(1.025)}.date-chip{position:absolute;left:12px;top:12px;width:54px;padding:8px 5px;border-radius:14px;background:#070908e8;border:1px solid #ffffff20;text-align:center;backdrop-filter:blur(12px)}.date-chip b{display:block;color:var(--brand);font-size:20px;line-height:1}.date-chip span{display:block;margin-top:3px;color:#fff;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:1px}.cardbody{padding:18px}.card h3{font-size:25px;letter-spacing:-.7px;margin:10px 0 8px}.card .price{display:flex;align-items:center;justify-content:space-between}.card .price:after{content:"Ver ingressos \2192 ";color:var(--brand);font-size:12px}.modal{background:#000d;backdrop-filter:blur(6px);overscroll-behavior:contain}.sheet{width:min(720px,100%);max-height:min(94vh,calc(100dvh - env(safe-area-inset-top)));overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y;background:#0d0f0e;border-color:#343a36;box-shadow:0 -28px 90px #000c}.event-top{display:grid;grid-template-columns:118px 1fr;gap:16px;align-items:center;margin-bottom:18px;flex:1;min-width:0}.event-thumb{width:118px;aspect-ratio:16/10;object-fit:cover;border-radius:14px;border:1px solid var(--line)}.event-top h2{font-size:30px;line-height:1;margin:6px 0}.ticket-tabs{position:sticky;top:-24px;z-index:3;background:#0d0f0ef2;padding:10px 0}.ticket-tabs .btn{min-height:46px}.option{align-items:center;background:#111412;border-color:#2b302d;margin:8px 0;padding:14px}.option strong{font-size:16px}.option-price{text-align:right;white-space:nowrap}.option-price b{font-size:17px}.option .small{max-width:440px;margin-top:5px;line-height:1.35}.compact-note{display:flex;gap:9px;align-items:flex-start;color:#c7cec9;font-size:13px;margin:14px 0}.compact-note b{color:var(--brand)}.cart-summary{border:1px solid var(--line);border-radius:16px;padding:14px;background:#111412}.cart-row{display:flex;justify-content:space-between;gap:14px;padding:7px 0}.cart-row.total{border-top:1px solid var(--line);margin-top:6px;padding-top:13px;font-size:18px;font-weight:900}.admin-event-image{width:100%;max-height:220px;object-fit:cover;border-radius:16px;border:1px solid var(--line);background:#e8ece9}footer{padding:22px 0}.footer-row{display:flex;justify-content:space-between;gap:16px;align-items:center}.footer-row p{margin:0}.footer-dot{color:var(--brand)}
body.admin-mode{--bg:#f1f3f6;--card:#fff;--line:#dfe3e8;--text:#15191f;--muted:#59636f;--brand:#91c900;background:#f1f3f6;color:var(--text)}body.admin-mode header{background:#0b0d0d;border-bottom:3px solid #c8ff35}body.admin-mode .logo{color:#fff}body.admin-mode .navbtn{background:#232726;color:#fff}body.admin-mode .btn{background:#e9edf1;color:#15191f;border:1px solid #d4dae1}body.admin-mode .btn.primary{background:var(--brand);color:#111;border-color:var(--brand)}body.admin-mode .btn.danger{background:#fde2e1;color:#8f2420;border-color:#f4c2c0}body.admin-mode .option .btn{background:#20252a;color:#fff;border-color:#20252a}body.admin-mode footer{display:none}body.admin-mode #admin{padding-top:38px}body.admin-mode .metric{box-shadow:0 6px 20px #2631400b;border:0;border-top:4px solid #c8ff35}body.admin-mode .metric b{font-size:26px}body.admin-mode .order{box-shadow:0 4px 18px #2631400a}body.admin-mode .field{background:#fff;color:#15191f}body.admin-mode .notice{background:#edf5d9;color:#344119}body.admin-mode .sheet{background:#fff;color:#15191f}body.admin-mode .eyebrow,body.admin-mode a{color:#537500!important}body.admin-mode .pill{background:#e9eee7;color:#263128}body.admin-mode .toast{color:#fff}body.admin-mode .admin-login{max-width:460px;margin:60px auto;border:0;padding:28px;box-shadow:0 18px 60px #2631401c}body.admin-mode .admin-login-icon{width:84px;height:84px;border-radius:22px;display:block;margin-bottom:18px}body.admin-mode h1{letter-spacing:-1.5px}
@media(max-width:850px){.grid{grid-template-columns:repeat(2,1fr)}.admin-grid{grid-template-columns:repeat(2,1fr)}.admin-order{grid-template-columns:1fr}.hero-row{grid-template-columns:1fr}.hero p{max-width:560px}.hero h1{letter-spacing:-3px}.filters{grid-template-columns:1fr 150px}}@media(max-width:540px){nav{height:62px}.navbtn{padding:9px 12px;font-size:13px}.brand-icon{width:36px;height:36px}.hero{padding:42px 0 12px}.hero h1{font-size:50px;letter-spacing:-2.5px}.hero p{font-size:15px}.grid{grid-template-columns:1fr}.filters{grid-template-columns:1fr}.sheet{padding:18px}.event-top{grid-template-columns:88px 1fr}.event-thumb{width:88px}.event-top h2{font-size:24px}.admin-grid{grid-template-columns:1fr 1fr}.footer-row{align-items:flex-start;flex-direction:column}.card h3{font-size:23px}}
</style></head><body class="public-home">
<header><nav class="wrap"><div class="logo"><img class="brand-icon" src="/app-icon.png" alt=""><span id="brandText">GUICH&#202; DA <i>30</i></span></div><div class="spacer"></div><button class="navbtn" id="homeBtn">Eventos</button><button class="navbtn" id="accountBtn">Minha conta</button></nav></header>
<main id="home"><section class="hero wrap"><div class="eyebrow">Trap ao vivo &#8226; ingressos verificados</div><div class="hero-row"><h1>Seu show.<br><span>No corre.</span></h1><p>Escolha o evento, pague online e acompanhe tudo pela sua conta.</p></div><div class="filters"><input class="field" id="search" placeholder="Buscar artista, cidade ou casa de show"><select class="field" id="state"><option value="">Todo o Brasil</option></select></div></section><section class="wrap"><div class="events-head"><h2>Pr&#243;ximos shows</h2><span class="event-count" id="eventCount"></span></div><div class="grid" id="events"><div class="empty">Carregando eventos&#8230;</div></div></section></main>
<main id="account" class="wrap account hidden"></main><main id="admin" class="wrap account hidden"></main>
<footer><div class="wrap footer-row"><b>Guich&#234; da 30 <span class="footer-dot">&#8226;</span> Trap ao vivo</b><p>Compra acompanhada do pagamento &#224; entrega.</p></div></footer>
<div class="modal" id="modal"><div class="sheet" id="sheet"></div></div><div id="toast" class="toast hidden"></div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>
const IS_ADMIN_PATH=/^\/admin(?:\/|$)/.test(location.pathname);const S={events:[],session:null,client:null,current:null};const $=s=>document.querySelector(s);const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brl=c=>(Number(c||0)/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});const fmt=d=>new Date(d).toLocaleString('pt-BR',{dateStyle:'medium',timeStyle:'short'});const toast=m=>{const e=$('#toast');e.textContent=m;e.classList.remove('hidden');setTimeout(()=>e.classList.add('hidden'),3500)};
const serviceFeeUi=c=>Number(c)<=5000?700:Math.ceil(Number(c)/5000)*500;
const cleanText=value=>String(value??'');
async function api(path,opt={}){const h=new Headers(opt.headers||{});if(S.session)h.set('authorization','Bearer '+S.session.access_token);if(opt.body&&typeof opt.body!=='string') {h.set('content-type','application/json');opt.body=JSON.stringify(opt.body)}const r=await fetch(path,{...opt,headers:h});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Erro na solicita\u00E7\u00E3o');return d}
function show(view){['home','account','admin'].forEach(x=>$('#'+x).classList.toggle('hidden',x!==view));scrollTo(0,0)}
async function init(){if(IS_ADMIN_PATH){document.body.classList.remove('public-home');document.body.classList.add('admin-mode');document.title='Painel administrativo \u2014 Guich\u00EA da 30';$('#brandText').innerHTML='PAINEL <i>30</i>'}const c=await api('/api/config');S.client=supabase.createClient(c.supabaseUrl.trim(),c.supabaseAnonKey);const {data}=await S.client.auth.getSession();S.session=data.session;S.client.auth.onAuthStateChange((_e,s)=>{S.session=s});bind();if(IS_ADMIN_PATH){if(S.session)await openAdmin();else showAdminLogin()}else await loadEvents()}
function bind(){if(IS_ADMIN_PATH){$('#homeBtn').textContent='Ver site';$('#homeBtn').onclick=()=>location.href='/';$('#accountBtn').textContent='Sair';$('#accountBtn').onclick=async()=>{await S.client.auth.signOut();S.session=null;showAdminLogin()}}else{$('#homeBtn').onclick=()=>show('home');$('#accountBtn').onclick=()=>openAccount();['search','state'].forEach(id=>$('#'+id).addEventListener('input',renderEvents))}$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()}}
async function loadEvents(){try{S.events=(await api('/api/events')).events;const states=[...new Set(S.events.map(x=>x.state).filter(Boolean))].sort();$('#state').innerHTML='<option value="">Todo o Brasil</option>'+states.map(x=>'<option>'+esc(x)+'</option>').join('');renderEvents()}catch(e){$('#events').innerHTML='<div class="empty">'+esc(e.message)+'</div>'}}
function eventTitle(e){return (e.matched_artists||[]).length?(e.matched_artists||[]).join(' + '):String(e.title||'Evento').replace(/\s+/g,' ').trim()}
function eventMedia(e,className){return e.image_url?'<img class="'+className+'" src="'+esc(e.image_url)+'" alt="Arte oficial de '+esc(eventTitle(e))+'">':'<div class="'+className+' event-placeholder"><span>'+esc(eventTitle(e))+'</span></div>'}
function eventDate(e){return String(e.description||'').includes('[horario_a_confirmar]')?new Date(e.starts_at).toLocaleDateString('pt-BR',{dateStyle:'medium'})+' \u2022 hor\u00E1rio a confirmar':fmt(e.starts_at)}
function dateParts(value){const d=new Date(value);return {day:String(d.getDate()).padStart(2,'0'),month:d.toLocaleDateString('pt-BR',{month:'short'}).replace('.','')}}
function renderEvents(){const q=$('#search').value.toLowerCase(),st=$('#state').value;const rows=S.events.filter(e=>(!q||[e.title,e.city,e.venue_name,...(e.lineup||[])].join(' ').toLowerCase().includes(q))&&(!st||e.state===st));$('#eventCount').textContent=rows.length+' '+(rows.length===1?'evento':'eventos');$('#events').innerHTML=rows.length?rows.map(e=>{const available=(e.ticket_options||[]).filter(o=>o.sale_status==='disponivel');const min=available.length?Math.min(...available.map(o=>o.displayed_price_cents)):null;const d=dateParts(e.starts_at);return '<article class="card" data-id="'+e.id+'"><div class="poster">'+eventMedia(e,'cover')+'<div class="date-chip"><b>'+d.day+'</b><span>'+esc(d.month)+'</span></div></div><div class="cardbody"><span class="tag">'+esc((e.matched_artists||[]).join(' \u2022 '))+'</span><h3>'+esc(eventTitle(e))+'</h3><div class="meta">'+esc(e.venue_name)+'<br>'+esc(e.city)+' / '+esc(e.state)+'</div><div class="price"><span>'+(min!=null?'A partir de '+brl(min):'Ver disponibilidade')+'</span></div></div></article>'}).join(''):'<div class="empty">Nenhum show encontrado.</div>';document.querySelectorAll('.card').forEach(c=>c.onclick=()=>openEvent(c.dataset.id))}
function closeModal(){$('#modal').classList.remove('on')}
function optionName(o){return cleanText(o.name||'Ingresso').replace(/\s*\u2014\s*Dia do Cliente\s*/i,' \u2014 ').replace(/\s+/g,' ').trim()}
function ticketOptionHtml(o){return '<div class="option '+(o.sale_status!=='disponivel'?'off':'')+'"><div><strong>'+esc(optionName(o))+'</strong>'+(o.sale_status!=='disponivel'?'<div class="status">Indispon\u00EDvel</div>':'')+(o.benefit_requirements?'<div class="small">'+esc(o.benefit_requirements)+'</div>':'')+'</div><div class="option-price"><b>'+brl(o.displayed_price_cents)+'</b><br>'+(o.sale_status==='disponivel'?'<button class="btn primary" onclick="checkoutStart(\''+o.id+'\')">Comprar</button>':'')+'</div></div>'}
function isClientDay(o){return o.category==='promocional'||String(o.name||'').toLowerCase().includes('dia do cliente')}
function setTicketTab(kind){const options=(S.current?.ticket_options||[]).filter(o=>kind==='promo'?isClientDay(o):!isClientDay(o));$('#ticketList').innerHTML=options.length?options.map(ticketOptionHtml).join(''):'<div class="empty">Nenhum ingresso nesta modalidade.</div>';document.querySelectorAll('[data-ticket-tab]').forEach(b=>b.classList.toggle('active',b.dataset.ticketTab===kind))}
function openEvent(id){const e=S.events.find(x=>x.id===id);S.current=e;const options=e.ticket_options||[],hasPromo=options.some(isClientDay),hasRegular=options.some(o=>!isClientDay(o)),initial=hasPromo?'promo':'regular';$('#sheet').innerHTML='<div class="sheethead"><div class="event-top">'+eventMedia(e,'event-thumb')+'<div><div class="eyebrow">'+esc(e.supplier_name)+'</div><h2>'+esc(eventTitle(e))+'</h2><div class="meta">'+eventDate(e)+'<br>'+esc(e.venue_name)+' \u2022 '+esc(e.city)+'/'+esc(e.state)+'</div></div></div><button class="close" onclick="closeModal()">\u00D7</button></div><div class="compact-note"><b>\u2713</b><span>Pagamento online e entrega por e-mail e em Meus ingressos.</span></div><h3>Escolha seu ingresso</h3>'+((hasPromo&&hasRegular)?'<div class="ticket-tabs"><button class="btn" data-ticket-tab="promo" onclick="setTicketTab(\'promo\')">Dia do Cliente</button><button class="btn" data-ticket-tab="regular" onclick="setTicketTab(\'regular\')">Venda geral</button></div>':'')+'<div id="ticketList"></div>';$('#modal').classList.add('on');setTicketTab(initial)}
async function checkoutStart(optionId){if(!S.session){toast('Entre na sua conta para comprar.');return openAuth()}const o=S.current.ticket_options.find(x=>x.id===optionId);const unitFee=serviceFeeUi(o.displayed_price_cents);$('#sheet').innerHTML='<div class="sheethead"><h2>Finalizar pedido</h2><button class="close" onclick="closeModal()">\u00D7</button></div><div class="option"><div><b>'+esc(optionName(o))+'</b><div class="small">'+esc(o.category)+'</div></div><b>'+brl(o.displayed_price_cents)+'</b></div><div class="authbox"><label>Quantidade<input id="qty" class="field" type="number" min="1" max="6" value="1"></label><div class="cart-summary"><div class="cart-row"><span>Ingresso</span><b id="cartTicket"></b></div><div class="cart-row"><span>Taxa de servi\u00E7o</span><b id="cartFee"></b></div><div class="cart-row total"><span>Total</span><b id="cartTotal"></b></div></div><label>Documento do benef\u00EDcio (quando exigido)<input id="benefitDoc" class="field" placeholder="N\u00FAmero da carteira ou documento"></label><label>Nome completo do participante<input id="attendee" class="field" autocomplete="name"></label><label>CPF do participante<input id="attendeeCpf" class="field" inputmode="numeric"></label><button class="btn primary" id="pay">Ir para o pagamento</button></div>';const updateSummary=()=>{const q=Math.min(6,Math.max(1,Number($('#qty').value||1)));$('#cartTicket').textContent=brl(o.displayed_price_cents*q);$('#cartFee').textContent=brl(unitFee*q);$('#cartTotal').textContent=brl((o.displayed_price_cents+unitFee)*q)};$('#qty').oninput=updateSummary;updateSummary();$('#pay').onclick=async()=>{try{$('#pay').disabled=true;const d=await api('/api/checkout',{method:'POST',body:{ticket_option_id:o.id,quantity:Number($('#qty').value),benefit_type:o.category,benefit_document:$('#benefitDoc').value,attendees:[{name:$('#attendee').value,cpf:$('#attendeeCpf').value}]}});location.href=d.checkout_url}catch(e){toast(e.message);$('#pay').disabled=false}}}
function openAuth(){$('#sheet').innerHTML='<div class="sheethead"><h2>Entrar ou criar conta</h2><button class="close" onclick="closeModal()">\u00D7</button></div><div class="tabs"><button class="btn active" id="loginTab">Entrar</button><button class="btn" id="signupTab">Criar conta</button></div><div class="authbox"><input class="field hidden" id="fullName" placeholder="Nome completo"><input class="field" id="email" type="email" placeholder="E-mail"><input class="field" id="password" type="password" placeholder="Senha (m\u00EDnimo 8 caracteres)"><button class="btn primary" id="authSubmit">Entrar</button></div>';$('#modal').classList.add('on');let signup=false;$('#loginTab').onclick=()=>set(false);$('#signupTab').onclick=()=>set(true);function set(v){signup=v;$('#fullName').classList.toggle('hidden',!v);$('#authSubmit').textContent=v?'Criar conta':'Entrar';$('#loginTab').classList.toggle('active',!v);$('#signupTab').classList.toggle('active',v)}$('#authSubmit').onclick=async()=>{const email=$('#email').value,password=$('#password').value;const r=signup?await S.client.auth.signUp({email,password,options:{data:{full_name:$('#fullName').value}}}):await S.client.auth.signInWithPassword({email,password});if(r.error)return toast(r.error.message);S.session=r.data.session;toast(signup&&!S.session?'Confira seu e-mail para confirmar a conta.':'Conta conectada.');closeModal()}}
async function openTicket(id){try{const d=await api('/api/tickets/'+id);open(d.url,'_blank','noopener')}catch(e){toast(e.message)}}
async function openAccount(){if(!S.session){openAuth();return}show('account');$('#account').innerHTML='<div class="empty">Carregando sua conta\u2026</div>';try{const d=await api('/api/me');$('#account').innerHTML='<div class="orderline"><h1>Minha conta</h1><button class="btn" id="logout">Sair</button></div><h2>Meus ingressos</h2>'+(d.tickets.length?d.tickets.map(t=>'<div class="order"><div class="orderline"><div><b>'+esc(t.orders?.events?.title||'Ingresso')+'</b><div class="small">'+fmt(t.created_at)+'</div></div><button class="btn primary" onclick="openTicket(\''+t.id+'\')">Abrir ingresso</button></div></div>').join(''):'<p class="meta">Voc\u00EA ainda n\u00E3o recebeu ingressos.</p>')+'<h2>Meus pedidos</h2>'+d.orders.map(o=>'<div class="order"><div class="orderline"><div><b>'+esc(o.events.title)+'</b><div class="small">'+esc(o.ticket_options.name)+' \u2022 '+o.quantity+' ingresso(s)</div></div><span class="pill '+(o.status.includes('entregue')?'ok':'warn')+'">'+esc(o.status.replaceAll('_',' '))+'</span></div><div class="orderline"><span class="small">'+fmt(o.created_at)+'</span><b>'+brl(o.total_cents)+'</b></div></div>').join('');$('#logout').onclick=async()=>{await S.client.auth.signOut();S.session=null;show('home')}}catch(e){toast(e.message)}}
async function openAdmin(){show('admin');$('#accountBtn').classList.remove('hidden');$('#admin').innerHTML='<div class="empty">Carregando painel\u2026</div>';try{const d=await api('/api/admin/dashboard');S.admin=d;const f=d.financial;const orderButtons=o=>'<div style="display:flex;gap:6px;flex-wrap:wrap">'+(o.status==='pagamento_aprovado'?'<button class="btn" onclick="setOrderStatus(\''+o.id+'\',\'comprando_ingresso\')">Iniciar compra</button>':'')+(!['aguardando_pagamento','cancelado','reembolsado'].includes(o.status)?'<button class="btn primary" onclick="deliver(\''+o.id+'\')">Enviar ingresso</button>':'')+(o.mercado_pago_payment_id&&!['reembolsado'].includes(o.status)?'<button class="btn danger" onclick="refundOrder(\''+o.id+'\')">Reembolsar</button>':'')+'</div>';$('#admin').innerHTML='<div class="orderline"><h1>Painel administrativo</h1><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary" id="newEvent">Novo evento</button><button class="btn" id="sync">Buscar shows</button></div></div><div class="admin-grid"><div class="metric"><b>'+brl(f.sold)+'</b><span>Total vendido</span></div><div class="metric"><b>'+brl(f.tickets)+'</b><span>Valor dos ingressos</span></div><div class="metric"><b>'+brl(f.fees)+'</b><span>Taxas de servi\u00E7o</span></div><div class="metric"><b>'+brl(f.mp)+'</b><span>Mercado Pago</span></div><div class="metric"><b>'+brl(f.profit)+'</b><span>Lucro l\u00EDquido</span></div></div><h2>Pedidos</h2><div id="adminOrders">'+d.orders.map(o=>'<div class="order admin-order"><div><b>'+esc(o.events.title)+'</b><div class="small">'+esc(o.profiles?.full_name||'Cliente')+' \u2022 '+esc(o.ticket_options.name)+' \u2022 '+o.quantity+' un.</div><div class="small">'+esc(o.profiles?.cpf||'CPF n\u00E3o informado')+' \u2022 '+esc(o.profiles?.phone||'Telefone n\u00E3o informado')+'</div></div><div><span class="pill">'+esc(o.status.replaceAll('_',' '))+'</span><div><a target="_blank" style="color:var(--brand)" href="'+esc(o.events.official_url)+'">Comprar no fornecedor oficial</a></div></div>'+orderButtons(o)+'</div>').join('')+'</div><h2>Eventos</h2>'+d.events.map(e=>'<div class="order"><div class="orderline"><div><b>'+esc(e.title)+'</b><div class="small">'+fmt(e.starts_at)+' \u2022 '+esc(e.supplier_name)+' \u2022 '+esc(e.review_status)+'</div></div><div style="display:flex;gap:6px">'+(e.review_status==='pendente'?'<button class="btn primary" onclick="approveEvent(\''+e.id+'\')">Aprovar</button>':'')+'<button class="btn" onclick="manageEvent(\''+e.id+'\')">Editar evento</button></div></div></div>').join('');$('#newEvent').onclick=newEvent;$('#sync').onclick=async()=>{try{toast('Busca iniciada\u2026');const x=await api('/api/admin/catalog/run',{method:'POST'});toast(x.imported+' evento(s) encontrado(s).');openAdmin()}catch(e){toast(e.message)}}}catch(e){toast(e.message);IS_ADMIN_PATH?showAdminLogin(e.message):show('home')}}
function newEvent(){$('#sheet').innerHTML='<div class="sheethead"><div><div class="eyebrow">Cadastro manual</div><h2>Novo evento</h2></div><button class="close" onclick="closeModal()">\u00D7</button></div><div class="authbox"><input class="field" id="newTitle" placeholder="Nome do evento e artista"><input class="field" id="newStarts" type="datetime-local"><input class="field" id="newVenue" placeholder="Local"><div style="display:grid;grid-template-columns:1fr 90px;gap:8px"><input class="field" id="newCity" placeholder="Cidade"><input class="field" id="newState" maxlength="2" placeholder="UF"></div><input class="field" id="newSupplier" placeholder="Fornecedor oficial"><input class="field" id="newOfficial" type="url" placeholder="Link oficial do evento"><input class="field" id="newImage" type="url" placeholder="Link da foto oficial"><textarea class="field" id="newDescription" placeholder="Descri\u00E7\u00E3o e informa\u00E7\u00F5es confirmadas"></textarea><button class="btn primary" id="createEventButton" onclick="submitNewEvent()">Cadastrar evento</button></div>';$('#modal').classList.add('on')}
async function submitNewEvent(){const button=$('#createEventButton');try{button.disabled=true;const body={title:$('#newTitle').value,starts_at:new Date($('#newStarts').value).toISOString(),venue_name:$('#newVenue').value,city:$('#newCity').value,state:$('#newState').value,supplier_name:$('#newSupplier').value,official_url:$('#newOfficial').value,image_url:$('#newImage').value,description:$('#newDescription').value,lineup:[$('#newTitle').value],review_status:'aprovado'};await api('/api/admin/events',{method:'POST',body});toast('Evento cadastrado. Agora adicione os ingressos.');closeModal();openAdmin()}catch(e){toast(e.message);button.disabled=false}}
async function approveEvent(id){try{await api('/api/admin/events/'+id,{method:'PATCH',body:{review_status:'aprovado'}});toast('Evento aprovado. Cadastre os setores e pre\u00E7os.');openAdmin()}catch(e){toast(e.message)}}
async function setOrderStatus(id,status){try{await api('/api/admin/orders/'+id,{method:'PATCH',body:{status}});toast('Pedido atualizado.');openAdmin()}catch(e){toast(e.message)}}
async function refundOrder(id){if(!confirm('Reembolsar este pagamento integralmente?'))return;try{await api('/api/admin/orders/'+id+'/refund',{method:'POST'});toast('Pagamento reembolsado.');openAdmin()}catch(e){toast(e.message)}}
function manageEvent(id){const e=S.admin.events.find(x=>x.id===id);$('#sheet').innerHTML='<div class="sheethead"><div><div class="eyebrow">Editar evento</div><h2>'+esc(e.title)+'</h2></div><button class="close" onclick="closeModal()">\u00D7</button></div><h3>Foto do evento</h3>'+(e.image_url?'<div style="position:relative"><img class="admin-event-image" src="'+esc(e.image_url)+'" alt="Foto atual do evento"><button class="close" style="position:absolute;top:8px;right:8px;margin:0;background:#171a18;color:#fff;border:1px solid #ffffff55" title="Remover capa" aria-label="Remover capa" onclick="removeEventImage(\''+e.id+'\')">\u00D7</button></div>':'<div class="notice">Este evento ainda est\u00E1 sem foto.</div>')+'<div class="authbox"><input class="field" id="eventImageFile" type="file" accept="image/jpeg,image/png,image/webp"><button class="btn primary" onclick="uploadEventImage(\''+e.id+'\')">Enviar foto do aparelho</button><input class="field" id="eventImageUrl" type="url" value="'+esc(e.image_url||'')+'" placeholder="Ou cole o link da foto"><button class="btn" onclick="saveEventImageUrl(\''+e.id+'\')">Salvar link da foto</button></div><p><button class="btn '+(e.paused?'primary':'danger')+'" onclick="toggleEvent(\''+e.id+'\','+(!e.paused)+')">'+(e.paused?'Reativar evento':'Pausar evento inteiro')+'</button></p><h3>Setores e categorias</h3>'+(e.ticket_options||[]).map(o=>'<div class="option"><div><b>'+esc(optionName(o))+'</b><div class="small">'+esc(o.category)+' \u2022 '+brl(o.displayed_price_cents)+' \u2022 '+esc(o.sale_status)+'</div></div><button class="btn" onclick="toggleOption(\''+o.id+'\',\''+(o.sale_status==='disponivel'?'pausado_manual':'disponivel')+'\')">'+(o.sale_status==='disponivel'?'Pausar':'Ativar')+'</button></div>').join('')+'<h3>Adicionar setor/categoria</h3><div class="authbox"><input class="field" id="opName" placeholder="Ex.: Pista Premium"><select class="field" id="opCat"><option>inteira</option><option>meia estudante</option><option>meia idoso</option><option>meia PCD</option><option>social/solid\u00E1rio</option><option>promocional</option><option>VIP</option><option>camarote</option><option>open bar</option></select><input class="field" id="opPrice" type="number" step="0.01" placeholder="Pre\u00E7o do ingresso (R$)"><input class="field" id="opSupplierFee" type="number" step="0.01" placeholder="Taxa obrigat\u00F3ria do fornecedor (R$)"><textarea class="field" id="opReq" placeholder="Documentos ou condi\u00E7\u00F5es exigidas"></textarea><button class="btn primary" onclick="addOption(\''+e.id+'\')">Adicionar e liberar</button></div>';$('#modal').classList.add('on')}
async function removeEventImage(eventId){if(!confirm('Remover a capa atual deste evento?'))return;try{await api('/api/admin/events/'+eventId,{method:'PATCH',body:{image_url:null}});toast('Capa removida.');closeModal();await openAdmin();await loadEvents()}catch(e){toast(e.message)}}
async function saveEventImageUrl(eventId){try{const image_url=$('#eventImageUrl').value.trim();if(!image_url)throw new Error('Cole o link da foto.');await api('/api/admin/events/'+eventId,{method:'PATCH',body:{image_url}});toast('Foto atualizada.');closeModal();await openAdmin();await loadEvents()}catch(e){toast(e.message)}}
async function uploadEventImage(eventId){try{const f=$('#eventImageFile').files[0];if(!f)throw new Error('Escolha uma foto.');if(f.size>5242880)throw new Error('A foto pode ter no m\u00E1ximo 5 MB.');const s=await api('/api/admin/events/'+eventId+'/image-upload-url',{method:'POST',body:{filename:f.name,content_type:f.type}});const up=await fetch(s.upload_url,{method:'PUT',headers:{'content-type':f.type},body:f});if(!up.ok)throw new Error('Falha ao enviar a foto.');await api('/api/admin/events/'+eventId,{method:'PATCH',body:{image_url:s.public_url}});toast('Foto enviada e publicada.');closeModal();await openAdmin();await loadEvents()}catch(e){toast(e.message)}}
async function addOption(eventId){try{await api('/api/admin/ticket-options',{method:'POST',body:{event_id:eventId,name:$('#opName').value,category:$('#opCat').value,supplier_price_cents:Math.round(Number($('#opPrice').value)*100),supplier_fee_cents:Math.round(Number($('#opSupplierFee').value||0)*100),sale_status:'disponivel',benefit_requirements:$('#opReq').value}});toast('Setor adicionado.');closeModal();openAdmin();loadEvents()}catch(e){toast(e.message)}}
async function toggleEvent(id,paused){try{await api('/api/admin/events/'+id,{method:'PATCH',body:{paused}});closeModal();openAdmin();loadEvents()}catch(e){toast(e.message)}}
async function toggleOption(id,sale_status){try{await api('/api/admin/ticket-options/'+id,{method:'PATCH',body:{sale_status}});closeModal();openAdmin();loadEvents()}catch(e){toast(e.message)}}
async function deliver(orderId){$('#sheet').innerHTML='<div class="sheethead"><h2>Enviar ingresso</h2><button class="close" onclick="closeModal()">\u00D7</button></div><div class="tabs"><button class="btn active" id="fileTab">PDF ou imagem</button><button class="btn" id="linkTab">Link</button></div><div class="authbox"><input class="field" id="ticketFile" type="file" accept="application/pdf,image/png,image/jpeg,image/webp"><input class="field hidden" id="ticketLink" placeholder="https://link-do-ingresso"><button class="btn primary" id="sendTicket">Enviar ao cliente</button></div>';$('#modal').classList.add('on');let link=false;$('#fileTab').onclick=()=>set(false);$('#linkTab').onclick=()=>set(true);function set(v){link=v;$('#ticketFile').classList.toggle('hidden',v);$('#ticketLink').classList.toggle('hidden',!v);$('#fileTab').classList.toggle('active',!v);$('#linkTab').classList.toggle('active',v)}$('#sendTicket').onclick=async()=>{try{$('#sendTicket').disabled=true;if(link){await api('/api/admin/tickets/finalize',{method:'POST',body:{order_id:orderId,kind:'link',external_url:$('#ticketLink').value}})}else{const f=$('#ticketFile').files[0];if(!f)throw new Error('Escolha o arquivo.');const s=await api('/api/admin/tickets/upload-url',{method:'POST',body:{order_id:orderId,filename:f.name}});const up=await fetch(s.upload_url,{method:'PUT',headers:{'content-type':f.type},body:f});if(!up.ok)throw new Error('Falha ao enviar o arquivo.');await api('/api/admin/tickets/finalize',{method:'POST',body:{order_id:orderId,kind:f.type.startsWith('image/')?'image':'file',storage_path:s.path,original_filename:f.name}})}toast('Ingresso enviado ao cliente.');closeModal();openAdmin()}catch(e){toast(e.message);$('#sendTicket').disabled=false}}}
function showAdminLogin(message=''){show('admin');$('#accountBtn').classList.add('hidden');$('#admin').innerHTML='<div class="order admin-login"><img class="admin-login-icon" src="/app-icon.png" alt="Guich\u00EA da 30"><div class="eyebrow">Central de opera\u00E7\u00E3o</div><h1>Painel administrativo</h1><p class="meta">Acesso exclusivo da equipe do Guich\u00EA da 30.</p>'+(message?'<div class="notice">'+esc(message)+'</div>':'')+'<div class="authbox"><input class="field" id="adminEmail" type="email" placeholder="E-mail do administrador"><input class="field" id="adminPassword" type="password" placeholder="Senha"><button class="btn primary" id="adminLogin">Entrar no painel</button></div></div>';$('#adminLogin').onclick=async()=>{const r=await S.client.auth.signInWithPassword({email:$('#adminEmail').value,password:$('#adminPassword').value});if(r.error)return toast(r.error.message);S.session=r.data.session;$('#accountBtn').classList.remove('hidden');openAdmin()}}
window.closeModal=closeModal;window.checkoutStart=checkoutStart;window.setTicketTab=setTicketTab;window.approveEvent=approveEvent;window.deliver=deliver;window.openTicket=openTicket;window.setOrderStatus=setOrderStatus;window.refundOrder=refundOrder;window.manageEvent=manageEvent;window.newEvent=newEvent;window.submitNewEvent=submitNewEvent;window.saveEventImageUrl=saveEventImageUrl;window.removeEventImage=removeEventImage;window.uploadEventImage=uploadEventImage;window.addOption=addOption;window.toggleEvent=toggleEvent;window.toggleOption=toggleOption;init();
</script></body></html>`;
