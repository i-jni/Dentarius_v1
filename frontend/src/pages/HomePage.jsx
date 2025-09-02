// src/pages/HomePage.jsx
import { TitleH1 } from '../atomes/titles/Titles';
import Button from '../atomes/buttons/Button';
import TextMedia from '../components/TextMedia/TextMedia';
import JoinUs from '../components/JoinUs/JoinUs';
import TitleAndImage from '../components/TitleAndImage/TitleAndImage';
import Accordion from '../components/Accordion/Accordion';
import Stats from '../components/Stats/Stats';
import Testimonials from '../components/Testimonials/Testimonials';
import styles from './HomePage.module.scss';

const HomePage = () => {
  // Données pour les statistiques
  const statsData = [
    { value: '1000+', label: 'Étudiants' },
    { value: '50+', label: 'Cours' },
    { value: '20+', label: 'Professeurs' },
    { value: '95%', label: 'Satisfaction' }
  ];
  
  // Données pour les témoignages
  const testimonials = [
    {
      quote: "Dentarius m'a permis de réviser efficacement pour mes examens. Les cours sont clairs et bien structurés.",
      author: "Sophie Martin",
      role: "Étudiante en 3ème année",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Une plateforme indispensable pour tout étudiant en dentaire. J'ai pu améliorer mes résultats grâce aux ressources disponibles.",
      author: "Thomas Dubois",
      role: "Étudiant en 4ème année",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Les cours sont à jour et suivent parfaitement le programme. Je recommande vivement !",
      author: "Emma Petit",
      role: "Étudiante en 2ème année",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg"
    }
  ];
  
  // Données pour la FAQ
  const faqItems = [
    {
      title: "Comment accéder aux cours ?",
      content: <p>Pour accéder aux cours, vous devez d'abord créer un compte sur notre plateforme. Une fois connecté, vous pourrez parcourir notre catalogue de cours et y accéder librement.</p>
    },
    {
      title: "Les cours sont-ils gratuits ?",
      content: <p>Oui, tous nos cours sont gratuits pour les étudiants en dentaire. Notre objectif est de rendre l'éducation accessible à tous.</p>
    },
    {
      title: "Puis-je télécharger les cours pour les consulter hors ligne ?",
      content: <p>Actuellement, cette fonctionnalité n'est pas disponible, mais nous travaillons à l'implémenter dans une future mise à jour.</p>
    },
    {
      title: "Comment signaler une erreur dans un cours ?",
      content: <p>Si vous trouvez une erreur dans un cours, vous pouvez utiliser le bouton "Signaler" présent sur chaque page de cours. Notre équipe pédagogique examinera votre signalement et apportera les corrections nécessaires.</p>
    }
  ];

  return (
    <div>
      <TitleAndImage
        title="Bienvenue sur Dentarius"
        subtitle="La plateforme d'apprentissage pour les étudiants en dentaire"
        backgroundImage="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        ctaText="Découvrir nos cours"
        ctaLink="/courses"
        height="large"
      />
      
      <div className="container">
        <Stats
          title="Dentarius en chiffres"
          stats={statsData}
          columns={4}
          variant="light"
        />
        
        <TextMedia
          title="Des cours adaptés à vos besoins"
          text="Nos cours sont conçus par des professionnels de la dentisterie pour vous aider à réussir vos études. Chaque cours est structuré de manière à faciliter l'apprentissage et la mémorisation des concepts clés."
          image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          ctaText="Voir les cours"
          ctaLink="/courses"
        />
        
        <TextMedia
          reverse
          title="Suivez votre progression"
          text="Grâce à notre système de suivi, vous pouvez facilement visualiser votre progression et identifier les domaines qui nécessitent plus d'attention. Des quiz réguliers vous permettent de tester vos connaissances."
          image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          ctaText="Créer un compte"
          ctaLink="/register"
        />
        
        <Testimonials
          title="Ce que nos utilisateurs disent"
          testimonials={testimonials}
        />
        
        <Accordion
          title="Questions fréquentes"
          items={faqItems}
        />
        
        <JoinUs
          title="Prêt à commencer ?"
          subtitle="Rejoignez notre communauté d'étudiants en dentaire et accédez à des ressources de qualité."
          primaryButtonText="S'inscrire gratuitement"
          primaryButtonLink="/register"
          secondaryButtonText="En savoir plus"
          secondaryButtonLink="/about"
          backgroundVariant="primary"
        />
      </div>
    </div>
  );
};

export default HomePage;