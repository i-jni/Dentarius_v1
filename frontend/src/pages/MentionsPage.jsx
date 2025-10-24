// src/pages/MentionsPage.jsx
const MentionsPage = () => {
  return (
    <div  className="container py-5">
      <h1>Mentions légales</h1>

      <p>
        Le site <strong>Dentarius.org</strong> est édité par l’association <strong>Dentarius</strong>,
        à but non lucratif (loi 1901).
      </p>

      <p>
        <strong>Siège social :</strong> [dentarius boulevard] <br />
        <strong>Email :</strong> [mail@gmail.com] <br />
        <strong>Directeur de la publication :</strong> [Dentarius.org]
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Ocean Digital</strong>. <br />
        <strong>Nom de domaine et DNS :</strong> gérés par <strong>OVH</strong>.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le contenu du site (textes, images, logos, etc.) est la propriété exclusive de Dentarius,
        sauf mention contraire. Toute reproduction ou diffusion sans autorisation est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations fournies sur ce site le sont à titre informatif. Dentarius ne peut être tenue
        responsable des erreurs ou omissions, ni de l’utilisation faite des informations présentes sur le site.
      </p>

      <h2>Protection des données</h2>
      <p>
        Les données personnelles collectées sont utilisées uniquement pour le fonctionnement du site.
        Conformément au RGPD, vous pouvez exercer vos droits d’accès, de rectification ou de suppression
        en écrivant à : [adresse e-mail].
      </p>
    </div>
  );
};

export default MentionsPage;
