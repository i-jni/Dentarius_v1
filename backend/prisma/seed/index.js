import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Seeding dental database...');

    // Nettoyer la base de données
    console.log('🧹 Cleaning database...');
    await prisma.courseTopic.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.topic.deleteMany({});
    await prisma.level.deleteMany({});
    await prisma.country.deleteMany({});

    // Seed des pays francophones (Europe)
    console.log('🌍 Creating countries...');
    const countries = await Promise.all([
      prisma.country.create({ data: { name: 'France' } }),
      prisma.country.create({ data: { name: 'Belgique' } }),
      prisma.country.create({ data: { name: 'Suisse' } })
    ]);

    // Seed des années d'études dentaires
    console.log('📊 Creating levels (years of study)...');
    const levels = await Promise.all([
      prisma.level.create({ data: { name: 'Année 1' } }),
      prisma.level.create({ data: { name: 'Année 2' } }),
      prisma.level.create({ data: { name: 'Année 3' } }),
      prisma.level.create({ data: { name: 'Année 4' } }),
      prisma.level.create({ data: { name: 'Année 5' } })
    ]);

    // Seed des étudiants en dentaire
    console.log('👩‍⚕️ Creating dental students...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const students = await Promise.all([
      prisma.student.create({
        data: {
          firstName: 'Alice',
          lastName: 'Martin',
          email: 'alice.martin@example.com',
          password: hashedPassword,
          countryId: countries[0].id // France
        }
      }),
      prisma.student.create({
        data: {
          firstName: 'Thomas',
          lastName: 'Dupont',
          email: 'thomas.dupont@example.com',
          password: hashedPassword,
          countryId: countries[1].id // Belgique
        }
      }),
      prisma.student.create({
        data: {
          firstName: 'Claire',
          lastName: 'Durand',
          email: 'claire.durand@example.com',
          password: hashedPassword,
          countryId: countries[2].id // Suisse
        }
      })
    ]);

    // Seed des spécialités dentaires
    console.log('🏷️ Creating dental topics...');
    const topics = await Promise.all([
      prisma.topic.create({ data: { name: 'Orthodontie' } }),
      prisma.topic.create({ data: { name: 'Endodontie' } }),
      prisma.topic.create({ data: { name: 'Implantologie' } }),
      prisma.topic.create({ data: { name: 'Parodontologie' } }),
      prisma.topic.create({ data: { name: 'Chirurgie orale' } })
    ]);

    // Seed des cours dentaires
    console.log('📚 Creating dental courses...');
    const courses = await Promise.all([
      prisma.course.create({
        data: {
          title: 'Introduction à l’orthodontie',
          description: 'Bases du diagnostic et premiers appareillages orthodontiques.',
          levelId: levels[1].id // Année 2
        }
      }),
      prisma.course.create({
        data: {
          title: 'Endodontie clinique',
          description: 'Traitement des canaux, instrumentation et obturation.',
          levelId: levels[2].id // Année 3
        }
      }),
      prisma.course.create({
        data: {
          title: 'Implantologie avancée',
          description: 'Chirurgie implantaire complexe et greffes osseuses.',
          levelId: levels[4].id // Année 5
        }
      }),
      prisma.course.create({
        data: {
          title: 'Parodontologie intermédiaire',
          description: 'Diagnostic et traitements des maladies parodontales.',
          levelId: levels[3].id // Année 4
        }
      })
    ]);

    // Seed des relations cours-spécialités
    console.log('🔄 Creating course-topic relationships...');
    await Promise.all([
      prisma.courseTopic.create({
        data: { courseId: courses[0].id, topicId: topics[0].id }
      }),
      prisma.courseTopic.create({
        data: { courseId: courses[1].id, topicId: topics[1].id }
      }),
      prisma.courseTopic.create({
        data: { courseId: courses[2].id, topicId: topics[2].id }
      }),
      prisma.courseTopic.create({
        data: { courseId: courses[3].id, topicId: topics[3].id }
      })
    ]);

    console.log('✅ Dental seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
