// src/pages/HomePage.jsx
import { TitleH1 } from '../atomes/titles/Titles';
import Button from '../atomes/buttons/Button';
import TextMedia from '../components/TextMedia/TextMedia';
import JoinUs from '../components/JoinUs/JoinUs';
import TitleAndImage from '../components/TitleAndImage/TitleAndImage';
import Accordion from '../components/Accordion/Accordion';
import Stats from '../components/Stats/Stats';
import Testimonials from '../components/Testimonials/Testimonials';
// import styles from './HomePage.module.scss';

const HomePage = () => {
  // Données pour les statistiques
  const statsData = [
    { value: '1000+', label: 'Étudiants' },
    { value: '50+', label: 'Cours' },
    { value: '20+', label: 'Lorem' },
    { value: '95%', label: 'Satisfaction' }
  ];
  
  // Données pour les témoignages
  const testimonials = [
    {
      quote: "Dentarius m'a permis d'aider les autres étudiants avec une simple action: le partage.",
      author: "Sarah Martin",
      role: "Étudiante en 3ème année",
      avatar: "/images/testimonial/dentarius2.jpg"
    },
    {
      quote: "Une plateforme indispensable pour tout étudiant en dentaire. J'ai pu améliorer mes résultats grâce aux ressources disponibles.",
      author: "Thomas Dubois",
      role: "Étudiant en 4ème année",
      avatar: "/images/testimonial/dentarius1.jpg"
    },
    {
      quote: "Les cours sont à jour et suivent parfaitement le programme. Je recommande vivement !",
      author: "Hawa Petit",
      role: "Étudiante en 2ème année",
      avatar: "/images/testimonial/dentarius4.jpg"
    }
  ];
  
  // Données pour la FAQ
  const faqItems = [
    {
      title: "Comment accéder aux cours ?",
      content: <p>Pour accéder aux cours, vous devez d'abord créer un compte sur notre plateforme. Une fois connecté, vous pourrez parcourir le catalogue de cours et y accéder librement, vous pouvez aussi contribuer en ajoutant vos cours.</p>
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
      content: <p>Fonctionnalité bientôt disponible.</p>
    }
  ];

  return (
    <div>
      <TitleAndImage
        title="Bienvenue sur Dentarius !"
        subtitle="La plateforme de partage de cours pour les étudiants en dentaire"
        backgroundImage= "/images/illustrations/banner.jpg"
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
          text="Nos cours de la dentisterie pour vous aider à réussir vos études. Chaque cours est structuré de manière à faciliter l'apprentissage et la mémorisation des concepts clés."
          image="/images/illustrations/livres.jpg"
          ctaText="Voir les cours"
          ctaLink="/courses"
        />
        
        <TextMedia
          reverse
          title="Partagez vos connaissances"
          text="Nos cours de la dentisterie pour vous aider à réussir vos études. Chaque cours est structuré de manière à faciliter l'apprentissage et la mémorisation des concepts clés.Nos cours de la dentisterie pour vous aider à réussir vos études. Chaque cours est structuré de manière à faciliter l'apprentissage et la mémorisation des concepts clés.Nos cours de la dentisterie pour vous aider à réussir vos études. Chaque cours est structuré de manière à faciliter l'apprentissage et la mémorisation des concepts clés."
          image= "images/illustrations/reussite.png"
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