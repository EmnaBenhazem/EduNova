import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiAcademicCap, HiBookOpen, HiUserGroup, HiPlay, HiCheckCircle,
  HiArrowRight, HiMenu, HiX, HiStar, HiShieldCheck, HiDesktopComputer,
  HiLightBulb, HiChatAlt2, HiMail, HiPhone, HiLocationMarker, HiGlobeAlt,
  HiDocumentText, HiVideoCamera, HiQuestionMarkCircle, HiChartBar, HiCog, HiSparkles
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
      {/* NAVBAR AMÉLIORÉE */}
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
            <Link to="/login" className="nav-link login-link">Se connecter</Link>
          </nav>

          <div className="header-actions">
            <Link to="/login" className="btn-signup">Commencer </Link>
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
          <Link to="/login" className="btn-signup-mobile">Commencer </Link>
        </div>
      </header>

      {/* HERO - IMAGE CORRIGÉE */}
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
                <Link to="/login" className="btn-primary">Commencer  <HiArrowRight /></Link>
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
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Étudiants heureux apprenant ensemble"
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

      {/* FONCTIONNALITÉS - NOUVELLE VERSION (tes textes) */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Une plateforme complète pour enseigner et apprendre</h2>
            <p className="section-desc">Tout ce dont vous avez besoin, réuni dans une seule interface intuitive</p>
          </div>

          <div className="features-grid-2">
            {[
              { icon: HiCog, title: "Gestion des cours", desc: "Créez et organisez vos cours facilement avec des outils intuitifs", points: ["Création de cours structurés", "Ajout de ressources multimédias", "Organisation par modules"] },
              { icon: HiDocumentText, title: "Ressources pédagogiques", desc: "Partagez des contenus variés : PDF, vidéos, quiz et plus encore", points: ["Documents PDF interactifs", "Vidéos et contenus multimédias", "Quiz et évaluations"] },
              { icon: HiChartBar, title: "Suivi personnalisé", desc: "Suivez la progression de vos étudiants en temps réel", points: ["Tableau de bord détaillé", "Gestion des notes", "Statistiques de progression"] },
              { icon: HiChatAlt2, title: "Communication fluide", desc: "Échangez facilement entre enseignants et étudiants", points: ["Questions/Réponses intégrées", "Notifications en temps réel", "Forum de discussion"] },
              { icon: HiDesktopComputer, title: "Interface intuitive", desc: "Une expérience utilisateur fluide et agréable", points: ["Design moderne et épuré", "Navigation intuitive", "Responsive sur tous appareils"] },
              { icon: HiSparkles, title: "Intelligence Artificielle", desc: "Personnalisation de l'apprentissage grâce à l'IA", points: ["Recommandations personnalisées", "Analyse prédictive", "Assistant virtuel"] },
            ].map((item, i) => (
              <div key={i} className="feature-card-2">
                <div className="feature-icon-wrapper-2">
                  <item.icon />
                </div>
                <h3>{item.title}</h3>
                <p className="feature-desc-2">{item.desc}</p>
                <ul className="feature-points">
                  {item.points.map((point, idx) => (
                    <li key={idx}><HiCheckCircle className="check-icon" /> {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS - AMÉLIORÉ */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <h2>Pourquoi choisir eduNova ?</h2>
              <p className="about-subtitle">
                Nous révolutionnons l’éducation en ligne avec une approche centrée sur l’humain et boostée par l’intelligence artificielle.
              </p>
              <ul className="about-list">
                <li><HiCheckCircle /> Plateforme 100 % développée en France</li>
                <li><HiCheckCircle /> Accompagnement personnalisé à chaque étape</li>
                <li><HiCheckCircle /> IA qui s’adapte vraiment à votre rythme</li>
                <li><HiCheckCircle /> Certificats reconnus par les entreprises</li>
                <li><HiCheckCircle /> Communauté active de plus de 25 000 apprenants</li>
                <li><HiCheckCircle /> Mises à jour gratuites chaque mois</li>
              </ul>
              <Link to="/login" className="btn-primary about-btn">
                Rejoindre eduNova gratuitement <HiArrowRight />
              </Link>
            </div>
            <div className="about-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1509062579939-8dbf0da13deb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Apprentissage collaboratif moderne"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA & FOOTER (inchangés, déjà parfaits) */}
      <section id="cta" className="cta-section">
        <div className="cta-container">
          <h2>Prêt à transformer votre avenir ?</h2>
          <p className="cta-desc">Rejoignez les milliers d’étudiants qui progressent chaque jour.</p>
          <Link to="/login" className="btn-cta-large">
            Commencer 
          </Link>
          <div className="cta-benefits">
            <span><HiCheckCircle /> Accès immédiat</span>
            <span><HiCheckCircle /> Annulation à tout moment</span>
            <span><HiCheckCircle /> Support prioritaire inclus</span>
          </div>
        </div>
      </section>

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