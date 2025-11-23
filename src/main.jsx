import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Analytics scaffold: loads GA4 or Plausible if environment variables are provided.
;(function initAnalytics(){
  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
  const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN

  if(GA_ID){
    // load GA4 gtag
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)

    window.dataLayer = window.dataLayer || []
    function gtag(){window.dataLayer.push(arguments)}
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_ID)
  }

  if(PLAUSIBLE_DOMAIN){
    const p = document.createElement('script')
    p.defer = true
    p.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
    p.src = 'https://plausible.io/js/plausible.js'
    document.head.appendChild(p)
    window.plausible = window.plausible || function(){ (window.plausible.q = window.plausible.q || []).push(arguments) }
  }
})()
