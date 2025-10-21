import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { studentService } from '../api/studentService';
import Avatar from '../components/Avatar/Avatar';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryId: ''
  });

  // FONCTION loadProfileData
  const loadProfileData = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        navigate('/login');
        return;
      }
      
      console.log('User from context:', user);
      
      // Essayer de récupérer l'ID utilisateur
      const userId = user.id || user.userId || user.studentId;
      
      if (userId) {
        console.log('Loading profile for user ID:', userId);
        const profileData = await studentService.getStudentById(userId);
        setProfile(profileData);
        setFormData({
          firstName: profileData.firstName || '',
          lastName: profileData.lastName || '',
          email: profileData.email || '',
          countryId: profileData.countryId || ''
        });
      } else {
        console.log('No user ID, using context data');
        setProfile(user);
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          countryId: user.countryId || ''
        });
      }

    } catch (error) {
      console.error('Erreur chargement profil:', error);
      setError('Erreur lors du chargement du profil');
      
      // Fallback sur les données du contexte
      if (user) {
        setProfile(user);
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          countryId: user.countryId || ''
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect pour l'auth
  useEffect(() => {
    if (authLoading) {
      return;
    }
    
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, authLoading]);

  // useEffect séparé pour charger le profil UNE SEULE FOIS
  useEffect(() => {
    if (user && !profile && !authLoading) {
      loadProfileData();
    }
  }, [user, authLoading]);

  // Si l'auth charge encore
  if (authLoading) {
    return (
      <div className="container">
        <div className={styles.loading}>Vérification de l'authentification...</div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // FONCTION POUR ACTIVER LE MODE ÉDITION
  const handleStartEdit = () => {
    console.log('Activation du mode édition');
    setIsEditing(true);
    setError('');
    setMessage('');
  };

  // FONCTION POUR SAUVEGARDER
  const handleSaveProfile = async () => {
    console.log('Sauvegarde du profil');
    try {
      setError('');
      const userId = user.id || user.userId || user.studentId;
      
      if (userId) {
        const updatedProfile = await studentService.updateStudent(userId, formData);
        setProfile(updatedProfile);
        
        // Mettre à jour le localStorage
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        // Mise à jour localStorage seulement
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setProfile(updatedUser);
      }
      
      setIsEditing(false);
      setMessage('Profil mis à jour avec succès !');
      setTimeout(() => setMessage(''), 5000);
      
    } catch (error) {
      console.error('Erreur mise à jour:', error);
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  // FONCTION POUR ANNULER
  const handleCancelEdit = () => {
    console.log('Annulation de l\'édition');
    setFormData({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      countryId: profile.countryId || ''
    });
    setIsEditing(false);
    setError('');
    setMessage('');
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt('Tapez "SUPPRIMER" pour confirmer la suppression de votre compte :');
    
    if (confirmation !== 'SUPPRIMER') {
      return;
    }

    try {
      const userId = user.id || user.userId || user.studentId;
      
      if (userId) {
        await studentService.deleteStudent(userId);
      }
      
      alert('Votre compte a été supprimé.');
      logout();
      navigate('/');
      
    } catch (error) {
      console.error('Erreur suppression:', error);
      logout();
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>Chargement du profil...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container">
        <div className={styles.error}>Impossible de charger le profil</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.profilePage}>
        
        {/* DEBUG - À SUPPRIMER APRÈS TEST
        <div style={{background: 'yellow', padding: '10px', marginBottom: '20px'}}>
          DEBUG: isEditing = {isEditing ? 'TRUE' : 'FALSE'}
        </div> */}
        
        {/* En-tête */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarSection}>
            <Avatar 
              firstName={profile.firstName}
              lastName={profile.lastName}
              size="xlarge"
            />
            <div className={styles.userInfo}>
              <h1>{profile.firstName} {profile.lastName}</h1>
              <p className={styles.email}>{profile.email}</p>
              {profile.country && (
                <p className={styles.country}>📍 {profile.country.name}</p>
              )}
              {profile.createdAt && (
                <p className={styles.joinDate}>
                  Membre depuis {new Date(profile.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </p>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            {!isEditing ? (
              <>
                <button 
                  onClick={handleStartEdit}
                  className="btn btn--primary"
                >
                  ✏️ Modifier le profil
                </button>
                <Link to="/courses" className="btn btn--outline">
                  📚 Mes cours
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={handleSaveProfile}
                  className="btn btn--primary"
                >
                  💾 Sauvegarder
                </button>
                <button 
                  onClick={handleCancelEdit}
                  className="btn btn--outline"
                >
                  ❌ Annuler
                </button>
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        {message && <div className={styles.success}>{message}</div>}
        {error && <div className={styles.error}>{error}</div>}

        {/* Contenu */}
        <div className={styles.profileContent}>
          
          {/* Informations personnelles */}
          <div className={styles.section}>
            <h2>Informations personnelles</h2>
            
            {!isEditing ? (
              // MODE AFFICHAGE
              <div className={styles.infoDisplay}>
                <div className={styles.infoItem}>
                  <label>Prénom :</label>
                  <span>{profile.firstName || 'Non renseigné'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Nom :</label>
                  <span>{profile.lastName || 'Non renseigné'}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Email :</label>
                  <span>{profile.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <label>Pays :</label>
                  <span>{profile.country?.name || 'Non renseigné'}</span>
                </div>
              </div>
            ) : (
              // MODE ÉDITION
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Votre prénom"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Votre nom"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="votre@email.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="countryId">Pays</label>
                  <select
                    id="countryId"
                    name="countryId"
                    value={formData.countryId}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="">Sélectionner un pays</option>
                    <option value="1">Belgique</option>
                    <option value="2">Suisse</option>
                    <option value="3">France</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Actions rapides */}
          <div className={styles.section}>
            <h2>Actions rapides</h2>
            <div className={styles.quickActions}>
              <Link to="/create-course" className="btn btn--primary">
                ➕ Créer un cours
              </Link>
              <Link to="/courses" className="btn btn--outline">
                📚 Voir les cours
              </Link>
              <Link to="/" className="btn btn--outline">
                🏠 Accueil
              </Link>
            </div>
          </div>

          {/* Zone de danger */}
          <div className={styles.section}>
            {/* <h2 className={styles.dangerTitle}>Zone de danger</h2> */}
            <div className={styles.dangerZone}>
              <div className={styles.dangerInfo}>
                <h3>Supprimer mon compte</h3>
                <p>Cette action supprimera définitivement votre compte et toutes vos données.</p>
              </div>
              <button 
                onClick={handleDeleteAccount}
                className="btn btn--danger"
              >
                🗑️ Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;