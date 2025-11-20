import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiAcademicCap, HiBookOpen, HiUserGroup, HiPlay, HiCheckCircle,
  HiArrowRight, HiMenu, HiX, HiStar, HiShieldCheck, HiDesktopComputer,
  HiLightBulb, HiChatAlt2, HiMail, HiPhone, HiLocationMarker, HiGlobeAlt
} from "react-icons/hi";
import "./LandingPage.css";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="landing-wrapper">

      {/* NAVBAR */}
      <header className="landing-header">
        <div className="landing-container">
          <Link to="/" className="logo">
            <HiAcademicCap className="logo-icon" />
            <span>eduNova</span>
          </Link>

          <nav className="nav-desktop">
            <button onClick={() => scrollTo("features")} className="nav-link">Fonctionnalités</button>
            <button onClick={() => scrollTo("about")} className="nav-link">Pourquoi nous</button>
            <button onClick={() => scrollTo("cta")} className="nav-link">Commencer</button>
            <Link to="/login" className="btn-login-desktop">Se connecter</Link>
          </nav>

          <div className="header-actions">
            <Link to="/login" className="btn-signup">Commencer gratuitement</Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="mobile-menu-btn">
              {mobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <button onClick={() => scrollTo("features")} className="mobile-nav-link">Fonctionnalités</button>
          <button onClick={() => scrollTo("about")} className="mobile-nav-link">Pourquoi nous</button>
          <button onClick={() => scrollTo("cta")} className="mobile-nav-link">Commencer</button>
          <Link to="/login" className="mobile-nav-link">Se connecter</Link>
          <Link to="/login" className="btn-signup-mobile">Commencer gratuitement</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Apprenez <span className="highlight">sans limites</span><br />avec eduNova</h1>
              <p className="hero-subtitle">
                Des milliers de cours en ligne par les meilleurs professeurs.<br />
                Commencez gratuitement dès aujourd'hui.
              </p>

              <div className="hero-buttons">
                <Link to="/login" className="btn-primary">Commencer gratuitement <HiArrowRight /></Link>
                <button className="btn-secondary"><HiPlay /> Voir la démo</button>
              </div>

              <div className="trust-bar">
                <div className="avatars-stack">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="avatar-circle" style={{ "--i": i }} />
                  ))}
                  <span className="plus">+25k</span>
                </div>
                <p><strong>+ 25 000 étudiants</strong> nous font déjà confiance</p>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Étudiants heureux" 
                className="hero-image" 
              />
              <div className="rating-badge">
                <HiStar className="star-icon" />
                <div>
                  <div className="rating-score">4.9/5</div>
                  <div className="rating-text">Note moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Nos fonctionnalités phares</h2>
            <p className="section-desc">Tout ce dont vous avez besoin pour réussir</p>
          </div>

          <div className="features-grid">
            {[
              { icon: HiBookOpen, title: "Cours de qualité", desc: "Créés par des experts reconnus" },
              { icon: HiDesktopComputer, title: "Accès illimité", desc: "Sur tous vos appareils, partout" },
              { icon: HiShieldCheck, title: "Certificats officiels", desc: "Reconnus par les entreprises" },
              { icon: HiUserGroup, title: "Communauté active", desc: "Échangez avec des milliers d’apprenants" },
              { icon: HiLightBulb, title: "Projets pratiques", desc: "Apprentissage par la pratique" },
              { icon: HiChatAlt2, title: "Support 24/7", desc: "Réponse en moins de 2h" },
            ].map((item, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon-wrapper"><item.icon /></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À PROPOS - SECTION CORRIGÉE (image visible) */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>Pourquoi eduNova est différent</h2>
              <p className="about-subtitle">
                Nous croyons que l’éducation doit être accessible, engageante et adaptée à chaque apprenant.
              </p>
              <ul className="about-list">
                <li><HiCheckCircle /> Apprentissage personnalisé avec IA</li>
                <li><HiCheckCircle /> Contenu mis à jour chaque mois</li>
                <li><HiCheckCircle /> Mentors disponibles 24/7</li>
                <li><HiCheckCircle /> Parcours certifiants reconnus</li>
                <li><HiCheckCircle /> Communauté bienveillante et motivante</li>
              </ul>
              <Link to="/login" className="btn-primary about-btn">
                Rejoindre la communauté <HiArrowRight />
              </Link>
            </div>
            <div className="about-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Apprentissage moderne" 
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta" className="cta-section">
        <div className="cta-container">
          <h2>Prêt à transformer votre avenir ?</h2>
          <p className="cta-desc">Rejoignez les milliers d’étudiants qui progressent chaque jour.</p>
          <Link to="/login" className="btn-cta-large">
            Commencer gratuitement → Aucune carte requise
          </Link>
          <div className="cta-benefits">
            <span><HiCheckCircle /> Accès immédiat</span>
            <span><HiCheckCircle /> Annulation à tout moment</span>
            <span><HiCheckCircle /> Support prioritaire inclus</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-main">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <HiAcademicCap className="logo-icon" />
                <span>eduNova</span>
              </Link>
              <p>La plateforme d’apprentissage nouvelle génération.</p>
            </div>
            <div className="footer-col">
              <h4>Produit</h4>
              <a onClick={() => scrollTo("features")}>Fonctionnalités</a>
              <a href="#">Tarifs</a>
              <a href="#">Sécurité</a>
            </div>
            <div className="footer-col">
              <h4>Entreprise</h4>
              <a onClick={() => scrollTo("about")}>À propos</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <div className="contact-item"><HiMail /> hello@edunova.com</div>
              <div className="contact-item"><HiPhone /> +33 1 76 45 89 00</div>
              <div className="contact-item"><HiLocationMarker /> Paris, France</div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 eduNova. Tous droits réservés.</p>
            <div className="social-links">
              <a href="#"><HiGlobeAlt /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}