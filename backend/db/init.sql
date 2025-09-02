-- Initialisation de la base de données Dentarius

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS dentarius;
USE dentarius;

-- Table des niveaux
CREATE TABLE IF NOT EXISTS level (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des pays
CREATE TABLE IF NOT EXISTS country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des étudiants
CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    countryId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (countryId) REFERENCES country(id)
);

-- Table des cours
CREATE TABLE IF NOT EXISTS course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    levelId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (levelId) REFERENCES level(id)
);

-- Table des sujets
CREATE TABLE IF NOT EXISTS topic (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table de relation cours-sujets
CREATE TABLE IF NOT EXISTS course_topic (
    id INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT,
    topicId INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (courseId) REFERENCES course(id),
    FOREIGN KEY (topicId) REFERENCES topic(id)
);

-- Insertion de données de test
-- Pays
INSERT INTO country (name, code) VALUES 
('France', 'FR'),
('États-Unis', 'US'),
('Royaume-Uni', 'GB'),
('Allemagne', 'DE'),
('Espagne', 'ES');

-- Niveaux
INSERT INTO level (name, description) VALUES 
('Débutant', 'Pour les nouveaux étudiants'),
('Intermédiaire', 'Pour les étudiants avec expérience'),
('Avancé', 'Pour les étudiants expérimentés');

-- Étudiants (mot de passe: password123)
INSERT INTO student (firstName, lastName, email, password, countryId) VALUES 
('Jean', 'Dupont', 'jean.dupont@example.com', '$2b$10$6Bnl2T.0iEYA1Uf8sBkHuOmQTlIwjLcIdpDT6HznGQ.QKT3jIvSAK', 1),
('Marie', 'Martin', 'marie.martin@example.com', '$2b$10$6Bnl2T.0iEYA1Uf8sBkHuOmQTlIwjLcIdpDT6HznGQ.QKT3jIvSAK', 1),
('John', 'Smith', 'john.smith@example.com', '$2b$10$6Bnl2T.0iEYA1Uf8sBkHuOmQTlIwjLcIdpDT6HznGQ.QKT3jIvSAK', 2);

-- Cours
INSERT INTO course (title, description, levelId) VALUES 
('Introduction à la dentisterie', 'Cours de base pour les nouveaux étudiants', 1),
('Techniques avancées de dentisterie', 'Techniques modernes pour les étudiants expérimentés', 3),
('Orthodontie fondamentale', 'Principes de base de l''orthodontie', 2);

-- Sujets
INSERT INTO topic (title, description) VALUES 
('Anatomie dentaire', 'Étude de la structure des dents'),
('Hygiène bucco-dentaire', 'Principes de l''hygiène bucco-dentaire'),
('Radiologie dentaire', 'Techniques de radiologie appliquées à la dentisterie'),
('Prothèses dentaires', 'Conception et fabrication de prothèses dentaires');

-- Relations cours-sujets
INSERT INTO course_topic (courseId, topicId) VALUES 
(1, 1), -- Introduction à la dentisterie - Anatomie dentaire
(1, 2), -- Introduction à la dentisterie - Hygiène bucco-dentaire
(2, 3), -- Techniques avancées - Radiologie dentaire
(2, 4), -- Techniques avancées - Prothèses dentaires
(3, 1), -- Orthodontie fondamentale - Anatomie dentaire
(3, 3); -- Orthodontie fondamentale - Radiologie dentaire