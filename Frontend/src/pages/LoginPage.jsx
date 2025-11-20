import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { HiAcademicCap } from 'react-icons/hi'; // Même icône que la landing !
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../authGoogle';
import Swal from 'sweetalert2';

const LoginPage = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const redirectToDashboard = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'enseignant') navigate('/enseignant');
    else navigate('/etudiant');
  };

  const handleResendVerification = async () => {
    const email = document.querySelector('input[name="email"]').value;
    try {
      await axios.post('http://localhost:5000/api/auth/resend-verification', { email });
      setError('Email de vérification renvoyé ! Vérifiez votre boîte mail.');
    } catch (err) {
      setError("Erreur lors de l'envoi de l'email");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const googleData = {
        email: user.email,
        first_name: user.displayName?.split(" ")[0],
        last_name: user.displayName?.split(" ")[1] || "",
        uid: user.uid,
      };

      const res = await axios.post("http://localhost:5000/api/auth/google-login", googleData);
      const { token, user: userData } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate(`/${userData.role}`);
    } catch (error) {
      console.error("Erreur Google login:", error);
      setError("Erreur lors de la connexion avec Google.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const cred = {
      email: formData.get('email').trim(),
      password: formData.get('password'),
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', cred);
      const { token, user } = res.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setError('');
      redirectToDashboard(user.role);
    } catch (err) {
      if (err.response?.data?.needsVerification) {
        setError(
          <div>
            {err.response.data.error}
            <button
              type="button"
              style={{ marginLeft: '10px', textDecoration: 'underline', cursor: 'pointer', color: '#7c3aed' }}
              onClick={handleResendVerification}
            >
              Renvoyer l'email
            </button>
          </div>
        );
      } else {
        setError(err.response?.data?.error || 'Email ou mot de passe incorrect');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      first_name: formData.get('first_name').trim(),
      last_name: formData.get('last_name').trim(),
      email: formData.get('email').trim(),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    if (data.password !== formData.get('confirm_password')) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', data);
      setError('');
      Swal.fire('Succès', 'Inscription réussie ! Un email de vérification a été envoyé.', 'success');
      setIsSignUp(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur inscription');
    }
  };

  return (
    <div className="login-wrapper">
      <AnimatePresence mode="wait">
        {!isSignUp ? (
          /* ==================== LOGIN ==================== */
          <motion.div key="login" className="login-container"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            
            <motion.div className="form-card"
              initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="logo">
                <HiAcademicCap className="logo-icon" />
                <h1>eduNova</h1>
              </div>
              <h2>Bienvenue !</h2>
              <p className="subtitle">Connectez-vous pour continuer votre apprentissage</p>

              {error && <p className="error">{error}</p>}

              <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Mot de passe" required />
                <div className="options">
                  <label><input type="checkbox" /> Se souvenir de moi</label>
                  <Link to="/forget-password" className="link">Mot de passe oublié ?</Link>
                </div>
                <button type="submit" className="btn-primary">Se connecter</button>
              </form>

              <div className="divider">ou</div>
              <button onClick={handleGoogleLogin} className="btn-google">
                <FcGoogle size={22} /> Continuer avec Google
              </button>

              <p className="switch-text">
                Pas encore de compte ?{' '}
                <span onClick={() => { setIsSignUp(true); setError(''); }} className="switch-link">
                  S'inscrire gratuitement
                </span>
              </p>
            </motion.div>

            <motion.div className="hero-side"
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
              <div className="hero-content">
                <HiAcademicCap className="big-icon" />
                <h1>Reprenez là où vous vous êtes arrêté</h1>
                <p>Des milliers de cours, une communauté active, et un apprentissage sans limites.</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ==================== REGISTER ==================== */
          <motion.div key="signup" className="login-container"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            <motion.div className="hero-side"
              initial={{ x: -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}>
              <div className="hero-content">
                <HiAcademicCap className="big-icon" />
                <h1>Rejoignez eduNova aujourd'hui</h1>
                <p>Créez votre compte en 30 secondes et commencez à apprendre gratuitement.</p>
              </div>
            </motion.div>

            <motion.div className="form-card"
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}>
              <div className="logo">
                <HiAcademicCap className="logo-icon" />
                <h1>eduNova</h1>
              </div>
              <h2>Créer un compte</h2>

              {error && <p className="error">{error}</p>}

              <form onSubmit={handleRegister}>
                <div className="name-row">
                  <input type="text" name="first_name" placeholder="Prénom" required />
                  <input type="text" name="last_name" placeholder="Nom" required />
                </div>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Mot de passe" required />
                <input type="password" name="confirm_password" placeholder="Confirmer le mot de passe" required />
                <select name="role" required>
                  <option value="">Choisir votre rôle</option>
                  <option value="etudiant">Étudiant</option>
                  <option value="enseignant">Enseignant</option>
                </select>
                <button type="submit" className="btn-primary">S'inscrire</button>
              </form>

              <p className="switch-text">
                Déjà un compte ?{' '}
                <span onClick={() => { setIsSignUp(false); setError(''); }} className="switch-link">
                  Se connecter
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;