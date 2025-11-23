import React, { useState, useRef, useEffect } from 'react'

const profiles = {
  manuel: {
    name: 'Manuel',
    bio: 'Manhoso, chorão e o rei de tudo.',
    accent: '#FD8C0C',
    accentDark: '#c76906',
    img: 'manuel.png',
    imgPos: 'center 18%'
  },
  geraldinho: {
    name: 'Geraldinho',
    bio: 'Corajoso e destemido.',
    accent: '#7E4A25',
    accentDark: '#5b351b',
    img: 'geraldo.png',
    imgPos: 'center 22%'
  }
}

export default function App(){
  const [active, setActive] = useState('manuel')
  const p = profiles[active]

  const links = [
    { label: 'Contato', href: 'mailto:manueldaaventura@gmail.com' },
    { label: 'Loja - Mercado Livre', href: 'https://www.mercadolivre.com.br/social/nnzd' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@manuel.da.aventura' },
    { label: 'Instagram', href: 'https://www.instagram.com/manuel_geraldinho/' }
  ]

  const [toast, setToast] = useState(null)

  async function handleCopyEmail(e, href){
    e.preventDefault()
    try{
      const email = href.replace(/^mailto:/, '')
      await navigator.clipboard.writeText(email)
      setToast('Email copiado para a área de transferência')
      setTimeout(()=> setToast(null), 2600)
    }catch(err){
      setToast('Não foi possível copiar o email')
      setTimeout(()=> setToast(null), 2600)
    }
  }

  const coupons = [
    { title: 'Petz', code: 'NENEZUDO', discount: '10%', url: 'https://www.petz.com.br/' },
    { title: 'Tapz', code: 'NENEZUDO', discount: '10%', url: 'https://tapz.com.br/parceiro/manuelgeraldinho/' },
    { title: 'Aus Miaus', code: 'NENEZUDO', discount: '10%', url: 'https://www.ausmiaus.com.br/' }
  ]

  const couponsRef = useRef(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const el = couponsRef.current
    if(!el) return

    function update(){
      const isScrollable = el.scrollHeight > el.clientHeight + 1
      if(!isScrollable) return setShowMore(false)
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
      setShowMore(!atBottom)
    }

    // initial
    update()

    el.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [couponsRef])

  return (
    <main className="wrap">
      <section className="card" style={{ ['--accent']: p.accent, ['--accent-dark']: p.accentDark, ['--avatar-pos']: p.imgPos }}>
        <div className="profile-switcher" role="tablist" aria-label="Selecionar perfil">
          <button className={`switch ${active==='manuel' ? 'active' : ''}`} onClick={()=>setActive('manuel')} aria-selected={active==='manuel'}>
            <span className="dot" style={{ background: '#FD8C0C' }}></span>
            Manuel
          </button>
          <button className={`switch ${active==='geraldinho' ? 'active' : ''}`} onClick={()=>setActive('geraldinho')} aria-selected={active==='geraldinho'}>
            <span className="dot" style={{ background: '#7E4A25' }}></span>
            Geraldinho
          </button>
        </div>

        <div className="profile">
          <div className="avatar">
            <img src={`/${p.img}`} alt={`Foto de ${p.name}`} />
          </div>
          <h1 className="name">{p.name}</h1>
          <p className="bio">{p.bio}</p>
        </div>

        <div className="links">
          {links.map((l, i) => {
            const isMail = l.href && l.href.startsWith('mailto:')
            const key = `link-${i}`
            const Icon = ({type}) => {
              // simpler, more consistent icons (solid strokes) for better legibility
              switch(type){
                case 'mail': return (
                  <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><polyline points="21 7 12 13 3 7"/></svg>
                )
                case 'shop': return (
                  <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2l1.5 3h9L18 2H6z"/><path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
                )
                case 'tiktok': return (
                  <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9v6a3 3 0 1 0 3-3V6h3"/><circle cx="20" cy="6" r="1"/></svg>
                )
                case 'instagram': return (
                  <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r="0.5"/></svg>
                )
                default: return null
              }
            }

            if(isMail){
              return (
                <button key={key} className="btn btn-copy" onClick={(e)=>handleCopyEmail(e, l.href)} aria-label={`Copiar email ${l.href}`}>
                  <Icon type="mail" />
                  {l.label}
                </button>
              )
            }

            // choose icon by label
            let type = 'shop'
            if(/instagram/i.test(l.label)) type = 'instagram'
            if(/tiktok/i.test(l.label)) type = 'tiktok'
            if(/loja|mercado/i.test(l.label)) type = 'shop'

            return (
              <a className="btn" key={key} href={l.href} target="_blank" rel="noopener noreferrer">
                <Icon type={type} />
                {l.label}
              </a>
            )
          })}
        </div>

        <div className="coupons" ref={couponsRef}>
          <h3>Cupons</h3>
          {coupons.map((c, i) => (
            <div className="coupon" key={i}>
              <div className="coupon-info">
                <strong>{c.title}</strong>
                <div className="coupon-code">Código: <span className="code">{c.code}</span> — {c.discount}</div>
              </div>
              <a className="coupon-link" href={c.url} target="_blank" rel="noopener noreferrer">Abrir</a>
            </div>
          ))}
        </div>
        <div className={`more-indicator ${showMore ? 'visible' : ''}`} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 5v14" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
            <path d="M18 13l-6 6-6-6" fill="white" opacity="0.92"/>
          </svg>
        </div>
        {toast && (
          <div className={`toast show`} role="status" aria-live="polite">{toast}</div>
        )}

        <footer className="card-footer">Sem rolagem global — área de links rola internamente</footer>
      </section>
    </main>
  )
}
