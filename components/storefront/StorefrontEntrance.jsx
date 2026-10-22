import Link from 'next/link';
import styles from './entrance.module.css';

const links = [['Kreu','/'],['Koleksioni','/products-grid'],['Ide','/ideas'],['Rreth nesh','/about'],['Kontakt','/contact']];
export function StorefrontHeader() {
  return <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/" className={styles.brand} aria-label="Idea Furniture — Kreu"><img src="/assets/images/logo-idea-furniture.webp" alt="Idea Furniture" /><span>IDEA<span className={styles.brandSmall}>FURNITURE</span></span></Link>
      <div className={styles.desktopLinks}>{links.map(([name,href])=><Link key={href} href={href}>{name}</Link>)}</div>
      <a className={styles.phone} href="tel:0692090689">Flasim për shtëpinë tënde <span>↗</span></a>
      <details className={styles.mobileMenu}><summary>Menu <span>☰</span></summary><div>{links.map(([name,href])=><a key={href} href={href}>{name}</a>)}<a href="tel:0692090689">069 209 0689</a></div></details>
    </div>
    <div className={styles.categoryBar}><Link href="/category-kende">Kënde & divane</Link><Link href="/category-dhoma-gjumi">Dhoma gjumi</Link><Link href="/category-tavolina-karrige">Tavolina & karrige</Link><Link href="/category-kuzhina">Kuzhina</Link><Link href="/products-grid">Të gjitha kategoritë <span>↗</span></Link></div>
  </header>;
}

export function FurnitureHero() {
  return <section className={styles.hero} aria-label="Mobilje për shtëpinë tuaj">
    <div className={styles.copy}><p className={styles.eyebrow}>IDEA FURNITURE · TIRANË</p><h1>Një shtëpi.<br/>Mijëra mënyra<br/>për ta <em>dashur.</em></h1><p className={styles.description}>Nga këndi ku mblidheni bashkë, te dhoma ku nis çdo ditë. Zbuloni mobilje që i japin jetë hapësirës suaj.</p><div className={styles.actions}><Link className={styles.primary} href="/products-grid">Zbuloni koleksionin <span>↗</span></Link><Link className={styles.secondary} href="/contact">Vizitoni showroom-in</Link></div><div className={styles.location}><span>01 / MIRË SE ERDHËT NË SHTËPI</span><p>Rruga e Kavajës, përballë kompleksit Delijorgji</p></div></div>
    <div className={styles.visual}><img src="/assets/images/showroom-banner-01.jpg" alt="Sallon me kënd të kaltër, tavolinë mesi dhe mobilje druri nga Idea Furniture" fetchPriority="high"/></div>
    <div className={styles.exploreCard}><span className={styles.exploreEyebrow}>GJENI FRYMËZIMIN TUAJ</span><h2>Çdo ambient,<br/>një ide e re.</h2><p>Zgjidhni hapësirën që doni të transformoni.</p><Link href="/category-kende"><span><small>01</small> Salloni</span><span>↗</span></Link><Link href="/category-dhoma-gjumi"><span><small>02</small> Dhoma e gjumit</span><span>↗</span></Link><Link href="/category-kuzhina"><span><small>03</small> Kuzhina</span><span>↗</span></Link><Link href="/products-grid" className={styles.exploreAll}>Shiko të gjithë koleksionin <span>→</span></Link></div>
  </section>;
}
