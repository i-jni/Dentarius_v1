// src/pages/StudentDetailPage.jsx
import { useParams } from 'react-router-dom';

const StudentDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div className="container">
      <h1>Détails de l'étudiant</h1>
      <p>Cette page affichera les détails de l'étudiant avec l'ID: {id}</p>
    </div>
  );
};

export default StudentDetailPage;