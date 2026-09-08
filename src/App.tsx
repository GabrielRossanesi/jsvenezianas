import { useEffect, useRef, useState } from 'react'
import { benefits, faq, problems, process, services, testimonials } from './data'
import { siteConfig, whatsappUrl } from './config'
import { galleryItems, homeGallery, type GalleryMediaItem } from './galleryData'
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Close, Play, Plus, Star, WhatsApp } from './icons'

const navItems = [
  ['Início', 'inicio'],
  ['Serviços', 'servicos'],
  ['Como funciona', 'como-funciona'],
  ['Trabalhos', 'trabalhos'],
  ['Galeria', '/galeria'],
  ['Depoimentos', 'depoimentos'],
  ['FAQ', 'faq'],
  ['Contato', 'contato'],
]

const navigationFor = (subpage: boolean) => navItems.map(([label, target]) => [
  label,
  target.startsWith('/') ? target : `${subpage ? '/' : ''}#${target}`,
])

function Logo({ inverted = false, href = '#inicio' }: { inverted?: boolean; href?: string }) {
  return (
    <a className={`logo ${inverted ? 'logo--inverted' : ''}`} href={href} aria-label="JS Venezianas — início">
      <svg className="logo__mark" viewBox="0 0 42 42" aria-hidden="true">
        <rect x="1" y="1" width="40" height="40" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 12h22M10 18h22M10 24h22M10 30h22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span><b>JS</b> Venezianas</span>
    </a>
  )
}

function Header({ subpage = false }: { subpage?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    scrollPositionRef.current = window.scrollY
    document.body.style.setProperty('--menu-scroll-offset', `-${scrollPositionRef.current}px`)
    document.body.classList.add('menu-open')

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    const closeAboveMobile = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    const desktopQuery = window.matchMedia('(min-width: 801px)')
    window.addEventListener('keydown', closeWithEscape)
    desktopQuery.addEventListener('change', closeAboveMobile)

    return () => {
      document.body.classList.remove('menu-open')
      document.body.style.removeProperty('--menu-scroll-offset')
      window.removeEventListener('keydown', closeWithEscape)
      desktopQuery.removeEventListener('change', closeAboveMobile)
      const previousScrollBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollPositionRef.current)
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [open])

  const navigation = navigationFor(subpage)

  return (
    <header className={`header ${subpage || scrolled || open ? 'header--solid' : ''}`}>
      <div className="header__inner shell">
        <Logo inverted={!subpage && !scrolled && !open} href={subpage ? '/#inicio' : '#inicio'} />
        <nav id="mobile-navigation" className={`nav ${open ? 'nav--open' : ''}`} aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} aria-current={subpage && href === '/galeria' ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a className="button button--small nav__cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            Solicitar orçamento <ArrowUpRight size={17} />
          </a>
        </nav>
        <button ref={menuButtonRef} className={`menu-toggle ${open ? 'menu-toggle--open' : ''}`} type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
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
            <a className="button button--accent" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsApp /> Solicitar orçamento</a>
            <a className="text-link text-link--light" href="#servicos">Conhecer serviços <ArrowRight /></a>
          </div>
          <ul className="trust-list" aria-label="Diferenciais do atendimento">
            <li><Check /> Curitiba e região metropolitana</li>
            <li><Check /> Residencial e comercial</li>
            <li><Check /> Orçamento sem compromisso</li>
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
          <p><strong>Nem sempre é preciso trocar tudo.</strong> Antes de trocar toda a esquadria, vale avaliar se a sua veneziana pode ser recuperada com um reparo especializado.</p>
          <a className="button button--dark" href={whatsappUrl('avaliação da minha veneziana')} target="_blank" rel="noopener noreferrer">Quero avaliar minha veneziana <ArrowUpRight /></a>
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
              <a className="text-link text-link--accent" href={whatsappUrl(services[active].title)} target="_blank" rel="noopener noreferrer">Pedir avaliação <ArrowUpRight /></a>
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

function MediaLightbox({ items, selected, setSelected, lastTriggerRef }: {
  items: GalleryMediaItem[]
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number | null>>
  lastTriggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const touchStartXRef = useRef<number | null>(null)
  const showPrevious = () => setSelected(current => current === null ? null : (current - 1 + items.length) % items.length)
  const showNext = () => setSelected(current => current === null ? null : (current + 1) % items.length)
  const closeLightbox = () => {
    setSelected(null)
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
        window.setTimeout(() => lastTriggerRef.current?.focus(), 0)
      }
      if (event.key === 'ArrowLeft') setSelected(current => current === null ? null : (current - 1 + items.length) % items.length)
      if (event.key === 'ArrowRight') setSelected(current => current === null ? null : (current + 1) % items.length)
      if (event.key === 'Tab') {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), video[controls]') ?? [])
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [items.length, lastTriggerRef, setSelected])

  const item = items[selected]

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-description"
      onClick={closeLightbox}
      onTouchStart={event => { touchStartXRef.current = event.touches[0]?.clientX ?? null }}
      onTouchEnd={event => {
        if (touchStartXRef.current === null) return
        const distance = (event.changedTouches[0]?.clientX ?? touchStartXRef.current) - touchStartXRef.current
        touchStartXRef.current = null
        if (Math.abs(distance) < 48) return
        if (distance > 0) showPrevious()
        else showNext()
      }}
    >
      <span className="lightbox__counter" aria-hidden="true">{String(selected + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
      <button ref={closeButtonRef} className="lightbox__close" type="button" onClick={event => { event.stopPropagation(); closeLightbox() }} aria-label="Fechar mídia"><Close /></button>
      <button className="lightbox__nav lightbox__nav--previous" type="button" onClick={event => { event.stopPropagation(); showPrevious() }} aria-label="Ver item anterior"><ChevronLeft /></button>
      <figure className={`lightbox__media ${item.type === 'video' ? 'lightbox__media--video' : ''}`} onClick={event => event.stopPropagation()}>
        {item.type === 'image' ? (
          <img src={item.src} alt={item.alt} width={item.width} height={item.height} draggable="false" />
        ) : (
          <video key={item.id} controls playsInline preload="metadata" poster={item.thumbnail} aria-label={item.alt}>
            <source src={item.src} type="video/mp4" />
            Seu navegador não oferece suporte à reprodução deste vídeo.
          </video>
        )}
        <figcaption aria-live="polite">
          <b id="lightbox-title">{item.title}</b>
          <span id="lightbox-description">{item.category}</span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" type="button" onClick={event => { event.stopPropagation(); showNext() }} aria-label="Ver próximo item"><ChevronRight /></button>
    </div>
  )
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <section className="gallery-section section" id="trabalhos">
      <div className="shell">
        <Reveal><SectionIntro eyebrow="Trabalhos" title="Precisão que aparece no resultado." text="Registros reais do cuidado da nossa equipe em cada instalação." /></Reveal>
        <div className="gallery-grid">
          {homeGallery.map((item, index) => (
            <Reveal className={`gallery-item gallery-item--${index + 1}`} key={item.id}>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Ampliar: ${item.title}`}
                onClick={event => {
                  lastTriggerRef.current = event.currentTarget
                  setSelected(index)
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  width={item.thumbnailWidth}
                  height={item.thumbnailHeight}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: item.position }}
                />
                <span className="gallery-item__index">0{index + 1}</span>
                <span className="gallery-item__caption"><b>{item.title}</b><small>{item.category}</small></span>
                <ArrowUpRight className="gallery-item__arrow" />
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal className="gallery-more">
          <a className="button button--dark" href="/galeria">Ver todos os trabalhos <ArrowRight /></a>
        </Reveal>
      </div>
      {selected !== null && <MediaLightbox items={homeGallery} selected={selected} setSelected={setSelected} lastTriggerRef={lastTriggerRef} />}
    </section>
  )
}

function useGallerySeo() {
  useEffect(() => {
    const title = 'Galeria de Trabalhos | JS Venezianas Curitiba'
    const description = 'Veja fotos e vídeos de trabalhos realizados pela JS Venezianas em Curitiba e região metropolitana: manutenção, automação e higienização.'
    document.title = title

    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.appendChild(element)
      }
      element.content = content
    }

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', window.location.href)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = new URL('/galeria', window.location.origin).href
  }, [])
}

function GalleryArchive() {
  const [selected, setSelected] = useState<number | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  return (
    <>
      <section className="gallery-page__hero" aria-labelledby="gallery-page-title">
        <div className="shell gallery-page__hero-inner">
          <div className="gallery-page__heading">
            <span className="eyebrow">Trabalhos realizados</span>
            <h1 id="gallery-page-title">Serviços que falam pelo resultado.</h1>
            <p>Conheça alguns dos trabalhos realizados pela JS Venezianas em manutenção, automação e higienização de venezianas.</p>
          </div>
          <div className="gallery-page__slats" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
        </div>
      </section>

      <section className="gallery-page__archive" aria-labelledby="gallery-archive-title">
        <div className="shell">
          <div className="gallery-page__summary">
            <h2 id="gallery-archive-title">Arquivo visual</h2>
            <p>11 fotos <span aria-hidden="true">·</span> 4 vídeos</p>
          </div>
          <p className="gallery-page__hint">Selecione um registro para ampliar ou reproduzir.</p>
          <div className="gallery-page__grid">
            {galleryItems.map((item, index) => (
              <button
                className="gallery-page__item"
                type="button"
                key={item.id}
                aria-haspopup="dialog"
                aria-label={`${item.type === 'video' ? 'Reproduzir vídeo' : 'Ampliar foto'}: ${item.title}`}
                onClick={event => {
                  lastTriggerRef.current = event.currentTarget
                  setSelected(index)
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  width={item.thumbnailWidth}
                  height={item.thumbnailHeight}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ objectPosition: item.position }}
                />
                <span className="gallery-page__overlay" aria-hidden="true" />
                {item.type === 'video' && <span className="gallery-page__play" aria-hidden="true"><Play size={22} /></span>}
              </button>
            ))}
          </div>
        </div>
      </section>
      {selected !== null && <MediaLightbox items={galleryItems} selected={selected} setSelected={setSelected} lastTriggerRef={lastTriggerRef} />}
    </>
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
  'Curitiba e região metropolitana', 'Comunicação rápida pelo WhatsApp',
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
        <Reveal className="faq-intro"><SectionIntro eyebrow="Dúvidas frequentes" title="Antes de chamar, talvez você queira saber." text="Se a sua dúvida não estiver aqui, envie uma mensagem. Uma foto ou vídeo ajuda na avaliação inicial." /><a className="text-link" href={whatsappUrl('tirar uma dúvida')} target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp <ArrowUpRight /></a></Reveal>
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
          <p>Não espere o problema piorar. Solicite seu orçamento sem compromisso e descubra a melhor solução para recuperar, modernizar ou higienizar sua veneziana.</p>
          <a className="button button--accent button--large" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsApp /> Solicitar orçamento agora <ArrowUpRight /></a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer({ subpage = false }: { subpage?: boolean }) {
  const footerLabels = new Set(['Início', 'Serviços', 'Trabalhos', 'Galeria', 'FAQ', 'Contato'])
  const navigation = navigationFor(subpage).filter(([label]) => footerLabels.has(label))

  return (
    <footer className="footer">
      <div className="shell footer__top">
        <div><Logo inverted href={subpage ? '/#inicio' : '#inicio'} /><p>Manutenção • Automação • Higienização<br />de venezianas.</p></div>
        <nav aria-label="Links do rodapé">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <div className="footer__contact"><span>Fale com a gente</span><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{siteConfig.whatsappDisplay} <ArrowUpRight /></a><a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">{siteConfig.instagramHandle} <ArrowUpRight /></a></div>
      </div>
      <div className="shell footer__bottom">
        <div className="footer__legal">
          <p>© {new Date().getFullYear()} JS Venezianas. Todos os direitos reservados.</p>
          <p>Atendimento residencial e comercial em Curitiba e região metropolitana.</p>
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
  return <a className="whatsapp-float" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento pelo WhatsApp"><WhatsApp /><span>Orçamento</span></a>
}

function HomePage() {
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

function GalleryPage() {
  useGallerySeo()

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header subpage />
      <main id="conteudo">
        <GalleryArchive />
      </main>
      <Footer subpage />
      <FloatingWhatsApp />
    </>
  )
}

export default function App() {
  const isGalleryPage = window.location.pathname.replace(/\/+$/, '').endsWith('/galeria')
  return isGalleryPage ? <GalleryPage /> : <HomePage />
}
