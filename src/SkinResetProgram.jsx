import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap');

  :root {
    --crimson: #C8101A;
    --crimson-dark: #9A0C14;
    --crimson-deep: #6B0810;
    --gold: #D4A017;
    --gold-light: #F0C842;
    --gold-pale: #FAE58A;
    --cream: #FFF8EE;
    --dark: #1A0608;
    --white: #FFFFFF;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: var(--white);
    overflow-x: hidden;
  }

  .hero {
    min-height: 100vh;
    background: radial-gradient(ellipse at 30% 50%, #9A0C14 0%, #C8101A 40%, #6B0810 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 80px 20px 60px;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(212,160,23,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 10% 80%, rgba(212,160,23,0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  .noise-overlay {
    position: absolute;
    inset: 0;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--gold-light);
    animation: float-particle linear infinite;
    opacity: 0;
  }

  @keyframes float-particle {
    0% { transform: translateY(100vh) translateX(0); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.6; }
    100% { transform: translateY(-20px) translateX(40px); opacity: 0; }
  }

  .hero-badge {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold-light);
    border: 1px solid rgba(212,160,23,0.4);
    padding: 8px 20px;
    border-radius: 20px;
    margin-bottom: 28px;
    backdrop-filter: blur(8px);
    background: rgba(212,160,23,0.08);
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.2s;
  }

  .hero-eyebrow {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 12vw, 120px);
    letter-spacing: 6px;
    text-align: center;
    line-height: 0.9;
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.4s;
  }

  .hero-eyebrow span {
    display: block;
    background: linear-gradient(135deg, var(--gold-pale) 0%, var(--gold) 50%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 20px rgba(212,160,23,0.5));
  }

  .hero-subtitle {
    font-family: 'Playfair Display', serif;
    font-size: clamp(14px, 3vw, 22px);
    font-style: italic;
    color: rgba(255,255,255,0.85);
    text-align: center;
    margin-top: 16px;
    letter-spacing: 1px;
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.6s;
  }

  .hero-brand {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-top: 12px;
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
    animation-delay: 0.7s;
  }

  .hero-scroll {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: fadeSlideDown 0.8s ease forwards;
    opacity: 0;
    animation-delay: 1s;
    cursor: pointer;
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scroll-pulse 2s ease-in-out infinite;
  }

  @keyframes scroll-pulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.2); }
  }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .section {
    padding: 100px 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-full {
    padding: 100px 20px;
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  .gold-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    margin: 0 auto 20px;
    border-radius: 2px;
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    text-align: center;
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 5vw, 52px);
    font-weight: 700;
    text-align: center;
    line-height: 1.2;
    color: var(--white);
    margin-bottom: 20px;
  }

  .section-title em {
    font-style: italic;
    color: var(--gold-light);
  }

  .problem-section {
    background: linear-gradient(180deg, var(--dark) 0%, #2A0408 50%, var(--dark) 100%);
  }

  .problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-top: 60px;
  }

  .problem-card {
    background: linear-gradient(135deg, rgba(200,16,26,0.15) 0%, rgba(26,6,8,0.8) 100%);
    border: 1px solid rgba(200,16,26,0.3);
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .problem-card:hover {
    transform: translateY(-6px);
    border-color: rgba(212,160,23,0.4);
    box-shadow: 0 20px 40px rgba(200,16,26,0.3);
  }

  .problem-icon {
    font-size: 36px;
    margin-bottom: 16px;
  }

  .problem-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--white);
  }

  .problem-card p {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
  }

  .solution-section {
    background: var(--dark);
  }

  .method-steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 60px;
    position: relative;
  }

  .method-steps::before {
    content: '';
    position: absolute;
    left: 32px;
    top: 20px;
    bottom: 20px;
    width: 1px;
    background: linear-gradient(to bottom, var(--gold), transparent);
  }

  .method-step {
    display: flex;
    gap: 28px;
    align-items: flex-start;
    padding: 28px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: opacity 0.3s;
  }

  .step-num {
    width: 64px;
    height: 64px;
    min-width: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    position: relative;
    z-index: 1;
  }

  .step-num.hydrate {
    background: linear-gradient(135deg, #1A6B8A, #0E4A60);
    border: 1px solid rgba(100,200,240,0.3);
    box-shadow: 0 0 20px rgba(30,120,160,0.4);
  }

  .step-num.repair {
    background: linear-gradient(135deg, var(--crimson), var(--crimson-dark));
    border: 1px solid rgba(212,160,23,0.3);
    box-shadow: 0 0 20px rgba(200,16,26,0.4);
  }

  .step-num.protect {
    background: linear-gradient(135deg, var(--gold), #9A7010);
    border: 1px solid rgba(240,200,66,0.3);
    box-shadow: 0 0 20px rgba(212,160,23,0.4);
  }

  .step-content h3 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    margin-bottom: 6px;
    color: var(--white);
  }

  .step-content p {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.7;
  }

  .step-tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(212,160,23,0.3);
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 8px;
  }

  .programs-section {
    background: linear-gradient(180deg, var(--dark) 0%, #1A0204 100%);
  }

  .programs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 28px;
    margin-top: 60px;
  }

  .program-card {
    background: linear-gradient(160deg, #200608 0%, #100204 100%);
    border: 1px solid rgba(200,16,26,0.25);
    border-radius: 20px;
    padding: 40px 32px;
    position: relative;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  }

  .program-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--crimson), var(--gold), var(--crimson));
    transform: scaleX(0);
    transition: transform 0.4s ease;
    transform-origin: left;
  }

  .program-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px rgba(200,16,26,0.3), 0 0 40px rgba(212,160,23,0.1);
    border-color: rgba(212,160,23,0.4);
  }

  .program-card:hover::before { transform: scaleX(1); }

  .program-duration {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }

  .program-name {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .program-desc {
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    margin-bottom: 24px;
    line-height: 1.7;
    padding: 14px;
    background: rgba(200,16,26,0.1);
    border-radius: 10px;
    border-left: 2px solid var(--crimson);
  }

  .program-features {
    list-style: none;
    margin-bottom: 28px;
  }

  .program-features li {
    font-size: 14px;
    color: rgba(255,255,255,0.75);
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .program-features li::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--gold);
    flex-shrink: 0;
  }

  .pricing-section {
    background: radial-gradient(ellipse at 50% 0%, rgba(200,16,26,0.2) 0%, var(--dark) 60%);
    padding: 100px 20px;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
    margin-top: 60px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .pricing-card {
    border-radius: 24px;
    padding: 48px 36px;
    position: relative;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }

  .pricing-card.standard {
    background: linear-gradient(160deg, #1C0406 0%, #120204 100%);
    border: 1px solid rgba(200,16,26,0.3);
  }

  .pricing-card.recommended {
    background: linear-gradient(160deg, #3D1002 0%, #1C0608 100%);
    border: 2px solid var(--gold);
    box-shadow: 0 0 40px rgba(212,160,23,0.2), 0 20px 60px rgba(200,16,26,0.3);
    transform: scale(1.02);
  }

  .pricing-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 30px 70px rgba(200,16,26,0.4);
  }

  .pricing-card.recommended:hover { transform: translateY(-6px) scale(1.04); }

  .recommended-badge {
    position: absolute;
    top: 20px; right: 20px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--dark);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 20px;
  }

  .pricing-plan-label {
    font-size: 11px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }

  .pricing-plan-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 24px;
    line-height: 1.3;
  }

  .pricing-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 68px;
    line-height: 1;
    background: linear-gradient(135deg, var(--gold-pale), var(--gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 4px;
  }

  .pricing-currency {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
    -webkit-text-fill-color: var(--gold-light);
  }

  .pricing-session {
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1px;
    margin-bottom: 28px;
  }

  .pricing-features {
    list-style: none;
    margin-bottom: 36px;
  }

  .pricing-features li {
    font-size: 14px;
    color: rgba(255,255,255,0.7);
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.4;
  }

  .check-icon {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 10px;
    color: var(--dark);
    font-weight: 700;
  }

  /* ── Buy Button (replaces WhatsApp CTA) */
  .btn-primary {
    width: 100%;
    padding: 18px 28px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary.gold {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
    color: var(--dark);
    box-shadow: 0 8px 24px rgba(212,160,23,0.4);
  }

  .btn-primary.gold:hover {
    box-shadow: 0 12px 36px rgba(212,160,23,0.6);
    transform: translateY(-2px);
    background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-pale) 50%, var(--gold-light) 100%);
  }

  .btn-primary.outline {
    background: transparent;
    color: var(--gold-light);
    border: 1px solid rgba(212,160,23,0.5);
  }

  .btn-primary.outline:hover {
    background: rgba(212,160,23,0.1);
    border-color: var(--gold);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  .btn-secure-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 10px;
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.5px;
  }

  .stats-strip {
    background: linear-gradient(90deg, #9A0C14, #C8101A, #9A0C14);
    padding: 40px 20px;
  }

  .stats-inner {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    text-align: center;
  }

  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    background: linear-gradient(to bottom, var(--gold-pale), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    color: rgba(255,255,255,0.6);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .gold-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 0;
    opacity: 0.3;
  }

  .final-cta {
    background: radial-gradient(ellipse at 50% 100%, rgba(200,16,26,0.4) 0%, var(--dark) 70%);
    padding: 120px 20px 80px;
    text-align: center;
  }

  .final-cta h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 8vw, 90px);
    letter-spacing: 4px;
    line-height: 1;
    margin-bottom: 20px;
    color: var(--white);
  }

  .final-cta h2 span {
    background: linear-gradient(135deg, var(--gold-pale), var(--gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cta-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .cta-btn-large {
    padding: 20px 48px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
  }

  .cta-btn-large.primary {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: var(--dark);
    box-shadow: 0 10px 30px rgba(212,160,23,0.5);
  }

  .cta-btn-large.primary:hover {
    box-shadow: 0 16px 48px rgba(212,160,23,0.7);
    transform: translateY(-3px);
  }

  .cta-btn-large.secondary {
    background: transparent;
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.25);
  }

  .cta-btn-large.secondary:hover {
    border-color: rgba(255,255,255,0.6);
    background: rgba(255,255,255,0.05);
  }

  .footer-note {
    margin-top: 28px;
    font-size: 12px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 1px;
  }

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.3s ease;
  }

  .nav.scrolled {
    background: rgba(26,6,8,0.95);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(212,160,23,0.1);
    padding: 14px 40px;
  }

  .nav-brand {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 3px;
    background: linear-gradient(to right, var(--gold-pale), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-cta {
    padding: 10px 24px;
    border-radius: 50px;
    border: 1px solid rgba(212,160,23,0.5);
    background: transparent;
    color: var(--gold-light);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
  }

  .nav-cta:hover {
    background: rgba(212,160,23,0.15);
    border-color: var(--gold);
  }

  .trust-section {
    background: var(--dark);
    padding: 80px 20px;
    border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  .trust-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
    max-width: 900px;
    margin: 48px auto 0;
    text-align: center;
  }

  .trust-item {
    padding: 28px 20px;
    border-radius: 16px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    transition: all 0.3s ease;
  }

  .trust-item:hover {
    background: rgba(212,160,23,0.05);
    border-color: rgba(212,160,23,0.2);
  }

  .trust-item-icon { font-size: 28px; margin-bottom: 12px; }

  .trust-item-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    color: var(--white);
    margin-bottom: 6px;
  }

  .trust-item-desc {
    font-size: 12px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
  }

  .full-program-section {
    background: var(--crimson);
    padding: 80px 20px;
  }

  .full-program-header { text-align: center; margin-bottom: 16px; }

  .full-program-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--dark);
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 5vw, 36px);
    font-weight: 700;
    padding: 16px 60px;
    border-radius: 0 0 40px 40px;
    margin-bottom: 32px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }

  .full-program-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 700;
    color: var(--white);
    margin-bottom: 8px;
  }

  .full-program-subtitle {
    font-size: 14px;
    color: var(--gold-light);
    font-style: italic;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 700px;
    margin: 40px auto 0;
  }

  .product-card {
    background: linear-gradient(160deg, rgba(180,120,100,0.3) 0%, rgba(160,100,80,0.4) 100%);
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(212,160,23,0.2);
  }

  .product-image-container {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .product-image {
    max-height: 120px;
    max-width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
  }

  .product-info-box {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border-radius: 12px;
    padding: 16px;
    position: relative;
    z-index: 1;
  }

  .product-name {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 12px;
    line-height: 1.3;
  }

  .product-pricing { text-align: center; font-size: 12px; color: var(--dark); }

  .product-pricing-row {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 4px;
  }

  .product-pricing-row span { color: rgba(26,6,8,0.7); }
  .product-pricing-row strong { color: var(--crimson); font-weight: 700; }

  .product-profit {
    font-weight: 700;
    color: var(--dark);
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(26,6,8,0.2);
  }

  /* ── HitPay modal overlay */
  .hp-overlay {
    position: fixed;
    inset: 0;
    background: rgba(10, 1, 2, 0.88);
    backdrop-filter: blur(12px);
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .hp-modal {
    background: linear-gradient(160deg, #220406, #140203);
    border: 1px solid rgba(212,160,23,0.25);
    border-radius: 20px;
    padding: 48px 44px;
    width: 100%;
    max-width: 480px;
    position: relative;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hp-modal-close {
    position: absolute;
    top: 18px; right: 20px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
    width: 32px; height: 32px;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .hp-modal-close:hover {
    background: rgba(255,255,255,0.12);
    color: #fff;
  }

  .hp-modal-kicker {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
  }

  .hp-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .hp-modal-price {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    line-height: 1;
    background: linear-gradient(135deg, var(--gold-pale), var(--gold-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 28px;
  }

  .hp-modal-price span {
    font-size: 20px;
    -webkit-text-fill-color: var(--gold-light);
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
  }

  .hp-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,160,23,0.2), transparent);
    margin-bottom: 24px;
  }

  .hp-field-group {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 24px;
  }

  .hp-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .hp-field label {
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .hp-field input {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 13px 16px;
    color: #fff;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }

  .hp-field input:focus {
    border-color: rgba(212,160,23,0.5);
    background: rgba(255,255,255,0.07);
  }

  .hp-field input::placeholder { color: rgba(255,255,255,0.22); }

  .hp-field input.error { border-color: rgba(200,16,26,0.7); }

  .hp-error-msg {
    font-size: 12px;
    color: #F87171;
    margin-top: 2px;
  }

  .hp-submit {
    width: 100%;
    padding: 18px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
    color: var(--dark);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(212,160,23,0.35);
    position: relative;
    overflow: hidden;
  }

  .hp-submit:hover:not(:disabled) {
    box-shadow: 0 12px 36px rgba(212,160,23,0.55);
    transform: translateY(-2px);
  }

  .hp-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  .hp-submit-spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(26,6,8,0.3);
    border-top-color: var(--dark);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .hp-secure {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 11px;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.5px;
  }

  /* ── Success / Error states */
  .hp-status {
    text-align: center;
    padding: 20px 0;
  }

  .hp-status-icon { font-size: 52px; margin-bottom: 16px; }

  .hp-status-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
  }

  .hp-status-body {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    margin-bottom: 28px;
  }

  @media (max-width: 600px) {
    .nav { padding: 16px 20px; }
    .nav.scrolled { padding: 12px 20px; }
    .products-grid { grid-template-columns: 1fr; max-width: 320px; }
    .stats-inner { grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .stat-num { font-size: 32px; }
    .pricing-card.recommended { transform: scale(1); }
    .method-steps::before { display: none; }
    .hp-modal { padding: 36px 24px; }
  }
`;

/* ── HitPay config (insert your API key in the constant below) */
const HITPAY_API_KEY = "YOUR_HITPAY_API_KEY_HERE";
const HITPAY_API_URL = "https://api.hit-pay.com/v1/payment-requests"; // live
// const HITPAY_API_URL = "https://api.sandbox.hit-pay.com/v1/payment-requests"; // sandbox

const PRODUCTS_DATA = [
  { id: "pro", name: "Professional Skin Program",            price: 3000, currency: "MYR" },
  { id: "complete", name: "Complete Skin Barrier Repair Program", price: 6000, currency: "MYR" },
];

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 10}s`,
  size: `${1 + Math.random() * 3}px`,
}));

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return scrolled;
}

/* ── HitPay Checkout Modal ──────────────────────────────────────────── */
function CheckoutModal({ product, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Nama diperlukan";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email tidak sah";
    if (!form.phone.trim()) e.phone = "Nombor telefon diperlukan";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");

    try {
      const body = new URLSearchParams({
        amount:           String(product.price),
        currency:         product.currency,
        purpose:          product.name,
        name:             form.name.trim(),
        email:            form.email.trim(),
        phone:            form.phone.trim(),
        send_email:       "true",
        // redirect_url: "https://yoursite.com/thank-you",   // optional — uncomment & set
      });

      const res = await fetch(HITPAY_API_URL, {
        method:  "POST",
        headers: {
          "X-BUSINESS-API-KEY": HITPAY_API_KEY,
          "Content-Type":       "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Payment request failed");

      /* Redirect customer to HitPay's hosted payment page */
      if (data.url) {
        window.location.href = data.url;
      } else {
        setStatus("success");
      }
    } catch (err) {
      setErrorMsg(err.message || "Terdapat masalah. Sila cuba lagi.");
      setStatus("error");
    }
  };

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <div className="hp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="hp-modal">
        <button className="hp-modal-close" onClick={onClose}>✕</button>

        {status === "success" ? (
          <div className="hp-status">
            <div className="hp-status-icon">✅</div>
            <div className="hp-status-title">Pembayaran Berjaya!</div>
            <div className="hp-status-body">
              Terima kasih, <strong>{form.name}</strong>. Kami akan menghubungi anda di <strong>{form.email}</strong> untuk langkah seterusnya.
            </div>
            <button className="hp-submit" onClick={onClose}>Tutup</button>
          </div>
        ) : status === "error" ? (
          <div className="hp-status">
            <div className="hp-status-icon">❌</div>
            <div className="hp-status-title">Pembayaran Gagal</div>
            <div className="hp-status-body">{errorMsg}</div>
            <button className="hp-submit" onClick={() => setStatus("idle")}>Cuba Semula</button>
          </div>
        ) : (
          <>
            <div className="hp-modal-kicker">Secure Checkout · HitPay</div>
            <div className="hp-modal-title">{product.name}</div>
            <div className="hp-modal-price">
              <span>RM </span>{product.price.toLocaleString()}
            </div>

            <div className="hp-divider" />

            <div className="hp-field-group">
              <div className="hp-field">
                <label>Nama Penuh</label>
                <input
                  type="text"
                  placeholder="Nama anda"
                  value={form.name}
                  onChange={set("name")}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && <span className="hp-error-msg">{errors.name}</span>}
              </div>

              <div className="hp-field">
                <label>Alamat Email</label>
                <input
                  type="email"
                  placeholder="email@anda.com"
                  value={form.email}
                  onChange={set("email")}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && <span className="hp-error-msg">{errors.email}</span>}
              </div>

              <div className="hp-field">
                <label>Nombor Telefon</label>
                <input
                  type="tel"
                  placeholder="+601X-XXXXXXX"
                  value={form.phone}
                  onChange={set("phone")}
                  className={errors.phone ? "error" : ""}
                />
                {errors.phone && <span className="hp-error-msg">{errors.phone}</span>}
              </div>
            </div>

            <button
              className="hp-submit"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <><span className="hp-submit-spinner" />Memproses...</>
              ) : (
                `Bayar RM${product.price.toLocaleString()} →`
              )}
            </button>

            <div className="hp-secure">
              🔒 &nbsp;Pembayaran selamat diproses oleh HitPay
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────────── */
export default function SkinResetProgram() {
  useScrollReveal();
  const scrolled = useNavScroll();
  const [checkout, setCheckout] = useState(null); // null | product object

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const buy = (id) => {
    const p = PRODUCTS_DATA.find((x) => x.id === id);
    if (p) setCheckout(p);
  };

  return (
    <>
      <style>{style}</style>

      {/* ── Checkout Modal */}
      {checkout && (
        <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />
      )}

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-brand">SKIN RESET</div>
        <button className="nav-cta" onClick={() => scrollToSection("pricing")}>
          Daftar Sekarang
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="noise-overlay" />
        <div className="particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{ left: p.left, bottom: 0, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.duration }}
            />
          ))}
        </div>
        <div className="hero-badge">Exclusive Batch · Rimbunan Healing Centre</div>
        <div className="hero-eyebrow">
          <span>SKIN RESET</span>
          PROGRAM
        </div>
        <div className="hero-subtitle">Skin Barrier Recovery Treatment</div>
        <div className="hero-brand">by Rimbunan Healing Centre</div>
        <div className="hero-scroll" onClick={() => scrollToSection("problem")}>
          <div className="scroll-line" />
          <span style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="stats-inner">
          <div><div className="stat-num">2</div><div className="stat-label">Program Utama</div></div>
          <div><div className="stat-num">RM180</div><div className="stat-label">Bermula dari</div></div>
          <div><div className="stat-num">5–7</div><div className="stat-label">Hari ROI</div></div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem-section section-full" id="problem">
        <div className="section" style={{ padding: "0 20px" }}>
          <div className="reveal">
            <div className="gold-line" />
            <div className="section-label">Realiti Pasaran</div>
            <h2 className="section-title">Kenapa Customer Dah Tak Puas<br /><em>Dengan Facial Biasa?</em></h2>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
              Customer sekarang bukan macam dulu. Mereka dah banyak exposure, dah cuba macam-macam treatment — dan mereka mula sedar sesuatu yang penting.
            </p>
          </div>
          <div className="problem-grid">
            {[
              { icon: "😔", title: "Hasil Tidak Kekal",       text: "Kulit nampak baik sekejap, kemudian masalah datang semula berulang kali." },
              { icon: "🔴", title: "Sensitivity Makin Teruk", text: "Redness dan sensitivity makin kerap berlaku selepas setiap rawatan." },
              { icon: "💸", title: "Rasa Tak Berbaloi",       text: "Customer mula rasa treatment tidak memberikan hasil yang setimpal dengan wang." },
              { icon: "❌", title: "Jerawat Tak Pulih",       text: "Jerawat tidak pulih sepenuhnya — masalah akar tidak diselesaikan." },
            ].map((item, i) => (
              <div key={i} className={`problem-card reveal reveal-delay-${i + 1}`}>
                <div className="problem-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: 48, padding: "28px 32px", background: "linear-gradient(135deg, rgba(200,16,26,0.15), rgba(26,6,8,0.9))", borderRadius: 16, border: "1px solid rgba(212,160,23,0.2)", textAlign: "center" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
              "Customer bukan berhenti buat facial. Mereka cuma berhenti datang ke tempat yang tak bagi hasil yang konsisten."
            </p>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* SOLUTION */}
      <section className="solution-section section-full" id="solution">
        <div className="section" style={{ padding: "0 20px" }}>
          <div className="reveal">
            <div className="gold-line" />
            <div className="section-label">Pendekatan Rawatan</div>
            <h2 className="section-title">Cara Nak <em>Selesaikan</em> Masalah Ini</h2>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
              Skin Barrier Repair Program membantu spa bagi rawatan yang lebih ter-arah & konsisten dengan fokus kepada pemulihan kulit sebenar.
            </p>
          </div>
          <div className="method-steps">
            {[
              { step: "01", tag: "Langkah 1", title: "Hydrate dengan Hyaluronic Acid", text: "Lapisan pertahanan kulit dipulihkan dengan hidrasi mendalam. Kulit yang terhydrate menjadi asas untuk semua rawatan seterusnya.", cls: "hydrate" },
              { step: "02", tag: "Langkah 2", title: "Repair dengan PDRN",              text: "Teknologi PDRN membaiki sel kulit yang rosak dari dalam, mempercepatkan proses regenerasi dan mengurangkan keradangan.", cls: "repair" },
              { step: "03", tag: "Langkah 3", title: "Kunci dengan Barrier Strengthening", text: "Lapisan perlindungan dikunci untuk memastikan hasil kekal lama, sensitivity berkurang dan kulit lebih stabil.", cls: "protect" },
            ].map((s, i) => (
              <div key={i} className={`method-step reveal reveal-delay-${i + 1}`}>
                <div className={`step-num ${s.cls}`}>{s.step}</div>
                <div className="step-content">
                  <span className="step-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* PROGRAMS */}
      <section className="programs-section section-full" id="programs">
        <div className="section" style={{ padding: "0 20px" }}>
          <div className="reveal">
            <div className="gold-line" />
            <div className="section-label">Program Kami</div>
            <h2 className="section-title">Dua Program,<br /><em>Satu Matlamat</em></h2>
          </div>
          <div className="programs-grid">
            <div className="program-card reveal reveal-delay-1">
              <div className="program-duration">⏱ 2 Jam Rawatan</div>
              <div className="program-name">K-Deep Skin Barrier Repair</div>
              <div className="program-desc">Advanced Treatment focused on deep skin barrier repair & long-term skin recovery</div>
              <ul className="program-features">
                <li>Repair skin barrier secara mendalam</li>
                <li>Reduce acne & inflammation</li>
                <li>Restore healthy skin condition</li>
                <li>Termasuk Repair & Supply Kit (5 hari)</li>
              </ul>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Harga bermula</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, paddingTop: "15px", lineHeight: 1.5, background: "linear-gradient(135deg, #FAE58A, #F0C842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 20 }}>
                RM 300 <span style={{ fontSize: 18, WebkitTextFillColor: "rgba(255,255,255,0.4)", fontFamily: "DM Sans" }}>/ sesi</span>
              </div>
              <button className="btn-primary outline" onClick={() => scrollToSection("pricing")}>Pilih Program Ini</button>
            </div>
            <div className="program-card reveal reveal-delay-2">
              <div className="program-duration">⏱ 1 Jam Rawatan</div>
              <div className="program-name">K-Polish Skin Therapy</div>
              <div className="program-desc">Suitable for first time clients & maintenance care — sesuai untuk permulaan & penjagaan berterusan</div>
              <ul className="program-features">
                <li>Light Skin Barrier Repair</li>
                <li>Hydration & Skin Balancing</li>
                <li>Smooth & Refined Skin</li>
                <li>Termasuk Repair & Supply Kit (5 hari)</li>
              </ul>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Harga bermula</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 44, background: "linear-gradient(135deg, #FAE58A, #F0C842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 20 }}>
                RM 180 <span style={{ fontSize: 18, WebkitTextFillColor: "rgba(255,255,255,0.4)", fontFamily: "DM Sans" }}>/ sesi</span>
              </div>
              <button className="btn-primary outline" onClick={() => scrollToSection("pricing")}>Pilih Program Ini</button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust-section">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="gold-line" />
            <div className="section-label">Apa Yang Berbeza</div>
            <h2 className="section-title">Bukan Sekadar Facial Biasa</h2>
          </div>
          <div className="trust-grid">
            {[
              { icon: "🎯", title: "Ada Flow & Tujuan",   desc: "Rawatan yang ada tujuan jelas, bukan sekadar facial biasa." },
              { icon: "🔬", title: "Fokus Repair Dahulu", desc: "Fokus kepada repair skin barrier sebelum rawatan lain." },
              { icon: "📈", title: "Hasil Konsisten",     desc: "Kulit lebih stabil, sensitivity berkurang, result tahan lama." },
              { icon: "💰", title: "ROI Pantas",          desc: "Modal boleh cover dalam 5 hingga 7 hari sahaja." },
            ].map((item, i) => (
              <div key={i} className={`trust-item reveal reveal-delay-${i + 1}`}>
                <div className="trust-item-icon">{item.icon}</div>
                <div className="trust-item-title">{item.title}</div>
                <div className="trust-item-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="pricing">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="gold-line" />
            <div className="section-label">Full Program · Exclusive Batch</div>
            <h2 className="section-title">Pilih Program<br /><em>Yang Sesuai Untuk Anda</em></h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginTop: 12 }}>
              Untuk Spa yang ingin jalankan rawatan sendiri
            </p>
          </div>
          <div className="pricing-grid">
            {/* Professional RM3,000 */}
            <div className="pricing-card standard reveal reveal-delay-1">
              <div className="pricing-plan-label">Full Program</div>
              <div className="pricing-plan-name">Professional Skin Program</div>
              <div style={{ marginBottom: 8 }}>
                <span className="pricing-currency">RM</span>
                <span className="pricing-price">3,000</span>
              </div>
              <div className="pricing-session">Exclusive Batch · Tawaran Terhad</div>
              <ul className="pricing-features">
                <li><span className="check-icon">✓</span>2 hari training intensif</li>
                <li><span className="check-icon">✓</span>Hands-on support sehingga 1 bulan</li>
                <li><span className="check-icon">✓</span>Spa jalankan rawatan sendiri</li>
                <li><span className="check-icon">✓</span>Produk 100% milik spa</li>
                <li><span className="check-icon">✓</span>Hasil lebih konsisten</li>
              </ul>
              <button className="btn-primary outline" onClick={() => buy("pro")}>
                Beli Sekarang — RM3,000
              </button>
              <div className="btn-secure-note">🔒 Secure checkout via HitPay</div>
            </div>

            {/* Complete RM6,000 — Recommended */}
            <div className="pricing-card recommended reveal reveal-delay-2">
              <div className="recommended-badge">⭐ Disyorkan</div>
              <div className="pricing-plan-label">Full Program</div>
              <div className="pricing-plan-name">Complete Skin Barrier Repair Program</div>
              <div style={{ marginBottom: 8 }}>
                <span className="pricing-currency">RM</span>
                <span className="pricing-price">6,000</span>
              </div>
              <div className="pricing-session">Pakej Lengkap · Kolaborasi Penuh</div>
              <ul className="pricing-features">
                <li><span className="check-icon">✓</span>2 hari training intensif</li>
                <li><span className="check-icon">✓</span>Hands-on support sehingga 1 bulan</li>
                <li><span className="check-icon">✓</span>Team RH jalankan rawatan bersama</li>
                <li><span className="check-icon">✓</span>Spa sediakan tempat & customer</li>
                <li><span className="check-icon">✓</span>Spa menerima bahagian daripada setiap rawatan</li>
                <li><span className="check-icon">✓</span>60% Spa · 40% RH</li>
                <li><span className="check-icon">✓</span>Produk 100% milik spa</li>
              </ul>
              <button className="btn-primary gold" onClick={() => buy("complete")}>
                Beli Sekarang — RM6,000 →
              </button>
              <div className="btn-secure-note">🔒 Secure checkout via HitPay</div>
            </div>
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: 48, padding: "24px", borderRadius: 16, background: "rgba(212,160,23,0.05)", border: "1px solid rgba(212,160,23,0.15)" }}>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
              💡 Setiap rawatan individual: <strong style={{ color: "var(--gold-light)" }}>RM180 – RM300 / sesi</strong> &nbsp;·&nbsp; Modal cover dalam <strong style={{ color: "var(--gold-light)" }}>5–7 hari</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FULL PROGRAM — CORE PRODUCTS */}
      <section className="full-program-section" id="full-program">
        <div className="full-program-header reveal">
          <div className="full-program-badge">Full Program</div>
          <h2 className="full-program-title">Core Products for Treatment & Basic Retail</h2>
          <p className="full-program-subtitle">
            Exclusive Batch Pricing — Only 2 Slots Remaining<br />
            Next Batch Pricing will be revised
          </p>
        </div>

        <div className="products-grid">
          {[
            { label: "Hyal Ten Light Ampoule\n50ml - 10 units", cost: "RM80/unit", sell: "RM190", profitUnit: "RM110", profit10: "RM1000" },
            { label: "Hyal Plus Pro Cream\n50ml - 10 units",    cost: "RM90/unit", sell: "RM190", profitUnit: "RM100", profit10: "RM1000" },
            { label: "PDRN Silky Repair Ampoule\n50ml - 5 units", cost: "RM110/unit", sell: "RM200", profitUnit: "RM90",  profit10: "RM450" },
            { label: "Hyal Plus Pro Ampoule\n30ml - 5 units",    cost: "RM150/unit", sell: "RM350", profitUnit: "RM200", profit10: "RM1100" },
          ].map((p, i) => (
            <div key={i} className={`product-card reveal reveal-delay-${i + 1}`}>
              <div className="product-image-container">
                <div style={{ width: 70, height: 100, background: i === 0 ? "linear-gradient(135deg,#e8e4dc,#c8c0b0)" : i === 1 ? "linear-gradient(135deg,#f0ece4,#d8d0c0)" : i === 2 ? "linear-gradient(135deg,#8B4513,#D2691E)" : "linear-gradient(135deg,#f0f0f0,#d8d8d8)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: i === 2 ? "#fff" : "#666", textAlign: "center", padding: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}>
                  {p.label.split("\n")[0].split(" ").slice(0, 2).join("\n")}
                </div>
              </div>
              <div className="product-info-box">
                <div className="product-name">{p.label.replace("\n", "\n")}</div>
                <div className="product-pricing">
                  <div className="product-pricing-row"><span>Cost Price:</span><strong>{p.cost}</strong></div>
                  <div className="product-pricing-row"><span>Selling Price:</span><span>{p.sell}</span></div>
                  <div className="product-pricing-row"><span>Profit per unit:</span><strong>{p.profitUnit}</strong></div>
                  <div className="product-profit">Profit {i < 2 ? "10" : "5"} units: <strong>{p.profit10}</strong></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="reveal">
          <div className="gold-line" />
          <div className="section-label">Jangan Tunggu Lagi</div>
          <h2>TRANSFORM YOUR SPA<br /><span>TODAY</span></h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>
            Jadikan spa anda pusat Skin Barrier Repair yang customer percaya. Exclusive batch — tempat terhad.
          </p>
          <div className="cta-buttons">
            <button className="cta-btn-large primary" onClick={() => buy("complete")}>
              Beli Sekarang 🔥
            </button>
            <button className="cta-btn-large secondary" onClick={() => scrollToSection("programs")}>
              Lihat Program Lagi
            </button>
          </div>
          <div className="footer-note">
            Prepared by Rimbunan Healing Centre · Skin Barrier Repair Centre
          </div>
        </div>
      </section>
    </>
  );
}