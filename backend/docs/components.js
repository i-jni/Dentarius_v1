/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - countryId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         firstName:
 *           type: string
 *           description: Prénom de l'étudiant
 *         lastName:
 *           type: string
 *           description: Nom de l'étudiant
 *         email:
 *           type: string
 *           format: email
 *           description: Email de l'étudiant
 *         password:
 *           type: string
 *           format: password
 *           description: Mot de passe (haché)
 *         countryId:
 *           type: integer
 *           description: ID du pays
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - levelId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         title:
 *           type: string
 *           description: Titre du cours
 *         description:
 *           type: string
 *           description: Description du cours
 *         levelId:
 *           type: integer
 *           description: ID du niveau
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour
 *     Topic:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         name:
 *           type: string
 *           description: Nom du thème
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour
 *     Level:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         name:
 *           type: string
 *           description: Nom du niveau
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour
 *     Country:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         name:
 *           type: string
 *           description: Nom du pays
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de mise à jour
 *     CourseTopic:
 *       type: object
 *       required:
 *         - courseId
 *         - topicId
 *       properties:
 *         courseId:
 *           type: integer
 *           description: ID du cours
 *         topicId:
 *           type: integer
 *           description: ID du thème
 *         assignedAt:
 *           type: string
 *           format: date-time
 *           description: Date d'assignation
 *     Auth:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *         user:
 *           $ref: '#/components/schemas/Student'
 */