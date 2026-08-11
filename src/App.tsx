import { useEffect, useRef, useState } from 'react'
import { benefits, faq, gallery, problems, process, services, testimonials } from './data'
import { siteConfig, whatsappUrl } from './config'
import { ArrowRight, ArrowUpRight, Check, Close, Plus, Star, WhatsApp } from './icons'

const navItems = [
  ['Início', '#inicio'],
  ['Serviços', '#servicos'],
  ['Como funciona', '#como-funciona'],
  ['Trabalhos', '#trabalhos'],
  ['Depoimentos', '#depoimentos'],
  ['FAQ', '#faq'],
  ['Contato', '#contato'],
]

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a className={`logo ${inverted ? 'logo--inverted' : ''}`} href="#inicio" aria-label="JS Venezianas — início">
      <svg className="logo__mark" viewBox="0 0 42 42" aria-hidden="true">
        <rect x="1" y="1" width="40" height="40" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 12h22M10 18h22M10 24h22M10 30h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span><b>JS</b> Venezianas</span>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return (
    <header className={`header ${scrolled || open ? 'header--solid' : ''}`}>
      <div className="header__inner shell">
        <Logo inverted={!scrolled && !open} />
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Navegação principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="button button--small nav__cta" href={whatsappUrl()} target="_blank" rel="noreferrer">
            Solicitar orçamento <ArrowUpRight size={17} />
          </a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible')
        observer.unobserve(element)
      }
    }, { threshold: 0.12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className={`section-intro ${light ? 'section-intro--light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <img className="hero__image" src="/images/hero-veneziana.webp" alt="Veneziana moderna em um ambiente residencial iluminado" fetchPriority="high" />
      <div className="hero__shade" />
      <div className="hero__slats" aria-hidden="true" />
      <div className="hero__content shell">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light hero__eyebrow">Especialistas em venezianas</span>
          <h1 id="hero-title">Sua veneziana,<br /><em>como nova.</em></h1>
          <p>Manutenção, automação e higienização com atendimento profissional e cuidadoso para sua casa ou empresa.</p>
          <div className="hero__actions">
            <a className="button button--accent" href={whatsappUrl()} target="_blank" rel="noreferrer"><WhatsApp /> Solicitar orçamento</a>
            <a className="text-link text-link--light" href="#servicos">Conhecer serviços <ArrowRight /></a>
          </div>
          <ul className="trust-list" aria-label="Diferenciais do atendimento">
            <li><Check /> Atendimento especializado</li>
            <li><Check /> Residencial e comercial</li>
            <li><Check /> Orçamento rápido</li>
          </ul>
        </div>
        <p className="hero__caption">Controle de luz.<br />Conforto recuperado.</p>
      </div>
      <a className="hero__scroll" href="#problemas" aria-label="Rolar para a próxima seção"><span /> Role para descobrir</a>
    </section>
  )
}

function Problems() {
  return (
    <section className="problems section" id="problemas">
      <div className="shell">
        <Reveal><SectionIntro eyebrow="Diagnóstico" title="Sua veneziana apresenta algum desses problemas?" text="Pequenos sinais costumam indicar desgaste no mecanismo. Identificar cedo ajuda a evitar danos maiores." /></Reveal>
        <div className="problem-grid">
          {problems.map((problem, index) => (
            <Reveal className="problem" key={problem}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{problem}</p>
              <i aria-hidden="true" />
            </Reveal>
          ))}
        </div>
        <Reveal className="diagnosis-note">
          <p><strong>Nem sempre é preciso trocar tudo.</strong> Na maioria dos casos, um reparo especializado recupera o funcionamento e aumenta a vida útil da veneziana.</p>
          <a className="button button--dark" href={whatsappUrl('avaliação da minha veneziana')} target="_blank" rel="noreferrer">Quero avaliar minha veneziana <ArrowUpRight /></a>
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  const [active, setActive] = useState(0)
  return (
    <section className="services section" id="servicos">
      <div className="shell">
        <Reveal><SectionIntro eyebrow="Serviços" title="Cuidado completo, do mecanismo ao acabamento." text="Avaliamos o estado da sua veneziana e indicamos a solução compatível com o modelo, o ambiente e a sua necessidade." light /></Reveal>
        <div className="service-stage">
          <div className="service-stage__tabs" role="tablist" aria-label="Serviços disponíveis">
            {services.map((service, index) => (
              <button key={service.id} id={`tab-${service.id}`} type="button" role="tab" aria-selected={active === index} aria-controls={`panel-${service.id}`} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
                <span>0{index + 1}</span>
                <strong>{service.title}</strong>
                <Plus />
              </button>
            ))}
          </div>
          <article className="service-stage__panel" id={`panel-${services[active].id}`} role="tabpanel" aria-labelledby={`tab-${services[active].id}`}>
            <div className="service-stage__image-wrap">
              <img key={services[active].image} src={services[active].image} alt={services[active].alt} loading="lazy" />
              <span>{services[active].label}</span>
            </div>
            <div className="service-stage__body">
              <p>{services[active].text}</p>
              <ul>{services[active].benefits.map(item => <li key={item}><Check /> {item}</li>)}</ul>
              <a className="text-link text-link--accent" href={whatsappUrl(services[active].title)} target="_blank" rel="noreferrer">Pedir avaliação <ArrowUpRight /></a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section className="benefits-section section">
      <div className="shell benefits-layout">
        <div className="benefits-sticky">
          <Reveal><SectionIntro eyebrow="Conservar faz sentido" title="Por que cuidar da sua veneziana?" text="Uma manutenção bem indicada preserva o que já existe e devolve a função que o ambiente precisa." /></Reveal>
          <div className="slat-illustration" aria-hidden="true">{Array.from({ length: 8 }).map((_, i) => <i key={i} />)}</div>
        </div>
        <div className="benefit-list">
          {benefits.map(([title, text], index) => (
            <Reveal className="benefit-item" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="process-section section" id="como-funciona">
      <div className="shell">
        <Reveal><SectionIntro eyebrow="Como funciona" title="Resolver sua veneziana é simples." text="Do primeiro contato à entrega, você sabe o que acontece em cada etapa." /></Reveal>
        <div className="process-line">
          {process.map(([title, text], index) => (
            <Reveal className="process-step" key={title}>
              <div className="process-step__number">{index + 1}</div>
              <div><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}
        </div>
        <Reveal className="process-tip"><span>Para agilizar</span><p>Envie pelo WhatsApp uma foto da veneziana inteira e um vídeo curto mostrando o problema.</p></Reveal>
      </div>
    </section>
  )
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  useEffect(() => {
    if (selected === null) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])
  return (
    <section className="gallery-section section" id="trabalhos">
      <div className="shell">
        <Reveal><SectionIntro eyebrow="Trabalhos" title="Precisão que aparece no resultado." text="Galeria preparada para receber os registros reais de cada serviço." /></Reveal>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <Reveal className={`gallery-item gallery-item--${index + 1}`} key={`${item.title}-${index}`}>
              <button type="button" onClick={() => setSelected(index)} aria-label={`Ampliar: ${item.title}`}>
                <img src={item.src} alt={`${item.title} — ${item.category}`} loading="lazy" style={{ objectPosition: item.position }} />
                <span className="gallery-item__index">0{index + 1}</span>
                <span className="gallery-item__caption"><b>{item.title}</b><small>{item.category}</small></span>
                <ArrowUpRight className="gallery-item__arrow" />
              </button>
            </Reveal>
          ))}
        </div>
        <p className="placeholder-note">Imagens demonstrativas. Substitua pelos registros reais da JS Venezianas antes da publicação.</p>
      </div>
      {selected !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[selected].title} onClick={() => setSelected(null)}>
          <button type="button" onClick={() => setSelected(null)} aria-label="Fechar imagem"><Close /></button>
          <img src={gallery[selected].src} alt={`${gallery[selected].title} — ${gallery[selected].category}`} onClick={event => event.stopPropagation()} />
          <p>{gallery[selected].title} <span>{gallery[selected].category}</span></p>
        </div>
      )}
    </section>
  )
}

function Testimonials() {
  return (
    <section className="testimonials section" id="depoimentos">
      <div className="shell">
        <Reveal><SectionIntro eyebrow="Prova social" title="Quem contrata, recomenda." text="O cuidado no atendimento importa tanto quanto o resultado do serviço." light /></Reveal>
        <p className="demo-badge">Conteúdo demonstrativo — substituir por avaliações reais</p>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <Reveal className="testimonial" key={testimonial.name}>
              <div className="testimonial__person">
                <span className="testimonial__avatar" aria-hidden="true">{testimonial.name.charAt(0)}</span>
                <div>
                  <h3>{testimonial.name}</h3>
                  <div className="testimonial__stars" aria-label={`${testimonial.rating} de 5 estrelas`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} className={index < testimonial.rating ? '' : 'empty'} />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote>{testimonial.text}</blockquote>
              <p>{testimonial.type}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const differentials = [
  'Atendimento especializado', 'Diagnóstico cuidadoso', 'Serviço limpo e organizado',
  'Soluções para diferentes modelos', 'Três especialidades em um só lugar',
  'Atendimento residencial e comercial', 'Comunicação rápida pelo WhatsApp',
]

function Differentials() {
  return (
    <section className="differentials section">
      <div className="shell differentials__layout">
        <Reveal className="differentials__title"><SectionIntro eyebrow="Nosso jeito de trabalhar" title="Cuidado técnico, dentro do seu espaço." text="Cada atendimento começa entendendo o problema e termina com o ambiente organizado e a solução explicada." /></Reveal>
        <Reveal className="differentials__image"><img src="/images/manutencao.webp" alt="Detalhe de manutenção cuidadosa em uma veneziana" loading="lazy" /></Reveal>
        <div className="differentials__list">
          {differentials.map(item => <Reveal className="differential" key={item}><Check /><span>{item}</span></Reveal>)}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq-section section" id="faq">
      <div className="shell faq-layout">
        <Reveal className="faq-intro"><SectionIntro eyebrow="Dúvidas frequentes" title="Antes de chamar, talvez você queira saber." text="Se a sua dúvida não estiver aqui, envie uma mensagem. Uma foto ou vídeo ajuda na avaliação inicial." /><a className="text-link" href={whatsappUrl('tirar uma dúvida')} target="_blank" rel="noreferrer">Falar pelo WhatsApp <ArrowUpRight /></a></Reveal>
        <div className="accordion">
          {faq.map(([question, answer], index) => (
            <Reveal className={`accordion__item ${open === index ? 'open' : ''}`} key={question}>
              <h3><button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><Plus /></button></h3>
              <div className="accordion__answer" id={`faq-answer-${index}`}><p>{answer}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta" id="contato">
      <div className="final-cta__slats" aria-hidden="true" />
      <div className="shell final-cta__inner">
        <Reveal>
          <span className="eyebrow eyebrow--light">Seu próximo passo</span>
          <h2>Sua veneziana precisa de atenção?</h2>
          <p>Não espere o problema piorar. Descubra a melhor solução para recuperar, modernizar ou higienizar sua veneziana.</p>
          <a className="button button--accent button--large" href={whatsappUrl()} target="_blank" rel="noreferrer"><WhatsApp /> Solicitar orçamento agora <ArrowUpRight /></a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__top">
        <div><Logo inverted /><p>Manutenção • Automação • Higienização<br />de venezianas.</p></div>
        <nav aria-label="Links do rodapé">{navItems.filter((_, i) => [0, 1, 3, 5, 6].includes(i)).map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="footer__contact"><span>Fale com a gente</span><a href={whatsappUrl()} target="_blank" rel="noreferrer">{siteConfig.whatsappDisplay} <ArrowUpRight /></a><a href={siteConfig.instagramUrl}>{siteConfig.instagramHandle} <ArrowUpRight /></a></div>
      </div>
      <div className="shell footer__bottom">
        <div className="footer__legal">
          <p>© {new Date().getFullYear()} JS Venezianas. Todos os direitos reservados.</p>
          <p>Atendimento residencial e comercial.</p>
        </div>
        <p className="footer__credit">
          Desenvolvido por{' '}
          <a href="https://www.moralessolucoes.com.br/tecnologia/" target="_blank" rel="noopener noreferrer">Morales Soluções</a>
        </p>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Solicitar orçamento pelo WhatsApp"><WhatsApp /><span>Orçamento</span></a>
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero /><Problems /><Services /><Benefits /><Process /><Gallery /><Testimonials /><Differentials /><FAQ /><FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
