// src/components/StudentList/StudentList.jsx
import { useQuery } from '@tanstack/react-query';
import { studentService } from '../../api/studentService';

const StudentList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: studentService.getAllStudents
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="student-list">
      <h2>Bientot</h2>
      <ul>
        {data.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;