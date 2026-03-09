import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Tora database...');
  const pw = await hash('demo1234', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tora.demo' }, update: {},
    create: { name: 'Admin User', email: 'admin@tora.demo', passwordHash: pw, role: 'ADMIN' },
  });
  const finance = await prisma.user.upsert({
    where: { email: 'finance@tora.demo' }, update: {},
    create: { name: 'Finance Officer', email: 'finance@tora.demo', passwordHash: pw, role: 'FINANCE_OFFICER' },
  });
  const field = await prisma.user.upsert({
    where: { email: 'field@tora.demo' }, update: {},
    create: { name: 'Field Officer', email: 'field@tora.demo', passwordHash: pw, role: 'FIELD_OFFICER' },
  });

  const p1 = await prisma.project.create({
    data: { name: 'Northern Region Health Campaign', location: 'Nairobi, Kenya', budget: 48500, startDate: new Date('2026-01-01'), endDate: new Date('2026-06-30'), createdById: admin.id },
  });
  const p2 = await prisma.project.create({
    data: { name: 'Rural Water Access Programme', location: 'Kisumu, Kenya', budget: 72000, startDate: new Date('2026-02-01'), endDate: new Date('2026-12-31'), createdById: admin.id },
  });

  await prisma.transaction.createMany({
    data: [
      { projectId: p1.id, amount: 320, category: 'TRANSPORT', description: 'Field transport – Nairobi site visit', date: new Date('2026-03-01'), status: 'APPROVED', createdById: field.id, approvedById: finance.id, approvedAt: new Date('2026-03-02') },
      { projectId: p1.id, amount: 850, category: 'SUPPLIES', description: 'Medical supplies – Site B', date: new Date('2026-03-03'), status: 'PENDING', createdById: field.id },
      { projectId: p1.id, amount: 200, category: 'ALLOWANCE', description: 'Field team allowance – Week 2', date: new Date('2026-03-05'), status: 'APPROVED', createdById: field.id, approvedById: finance.id, approvedAt: new Date('2026-03-06') },
      { projectId: p1.id, amount: 1100, category: 'ACCOMMODATION', description: 'Team accommodation – Week 4', date: new Date('2026-03-08'), status: 'REJECTED', note: 'Exceeds accommodation policy limit.', createdById: field.id, approvedById: finance.id, approvedAt: new Date('2026-03-09') },
      { projectId: p2.id, amount: 4500, category: 'SUPPLIES', description: 'Water pump equipment – Phase 1', date: new Date('2026-03-02'), status: 'APPROVED', createdById: field.id, approvedById: admin.id, approvedAt: new Date('2026-03-03') },
      { projectId: p2.id, amount: 750, category: 'TRANSPORT', description: 'Logistics – Site delivery', date: new Date('2026-03-04'), status: 'PENDING', createdById: field.id },
      { projectId: p2.id, amount: 2200, category: 'SUPPLIES', description: 'Piping materials – Phase 2', date: new Date('2026-03-06'), status: 'APPROVED', createdById: field.id, approvedById: finance.id, approvedAt: new Date('2026-03-07') },
      { projectId: p1.id, amount: 500, category: 'COMMUNICATION', description: 'Satellite phone airtime', date: new Date('2026-03-10'), status: 'PENDING', createdById: field.id },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: 'PROJECT_CREATED', entityType: 'Project', entityId: p1.id },
      { userId: admin.id, action: 'PROJECT_CREATED', entityType: 'Project', entityId: p2.id },
      { userId: field.id, action: 'TRANSACTION_CREATED', entityType: 'Transaction', entityId: 'seed-1' },
      { userId: finance.id, action: 'TRANSACTION_APPROVED', entityType: 'Transaction', entityId: 'seed-1' },
    ],
  });

  console.log('✅ Done!');
  console.log('   admin@tora.demo    / demo1234  (Admin)');
  console.log('   finance@tora.demo  / demo1234  (Finance Officer)');
  console.log('   field@tora.demo    / demo1234  (Field Officer)');
}

main().catch(console.error).finally(() => prisma.$disconnect());
