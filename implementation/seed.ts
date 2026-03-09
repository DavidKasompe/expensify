import { PrismaClient, Role, TransactionCategory, TransactionStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Tora demo database...');

  // ─── Users ───────────────────────────────────────
  const password = await hash('demo1234', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tora.demo' },
    update: {},
    create: { name: 'Admin User', email: 'admin@tora.demo', passwordHash: password, role: Role.ADMIN },
  });

  const finance = await prisma.user.upsert({
    where: { email: 'finance@tora.demo' },
    update: {},
    create: { name: 'Finance Officer', email: 'finance@tora.demo', passwordHash: password, role: Role.FINANCE_OFFICER },
  });

  const field = await prisma.user.upsert({
    where: { email: 'field@tora.demo' },
    update: {},
    create: { name: 'Field Officer', email: 'field@tora.demo', passwordHash: password, role: Role.FIELD_OFFICER },
  });

  console.log('✅ Users created');

  // ─── Projects ─────────────────────────────────────
  const project1 = await prisma.project.create({
    data: {
      name: 'Northern Region Health Campaign',
      location: 'Nairobi, Kenya',
      budget: 48500,
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-06-30'),
      createdById: admin.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Rural Water Access Programme',
      location: 'Kisumu, Kenya',
      budget: 72000,
      startDate: new Date('2026-02-01'),
      endDate: new Date('2026-12-31'),
      createdById: admin.id,
    },
  });

  console.log('✅ Projects created');

  // ─── Transactions ─────────────────────────────────
  await prisma.transaction.createMany({
    data: [
      {
        projectId: project1.id,
        amount: 320,
        category: TransactionCategory.TRANSPORT,
        description: 'Field transport – Nairobi site visit',
        date: new Date('2026-03-01'),
        status: TransactionStatus.APPROVED,
        createdById: field.id,
        approvedById: finance.id,
        approvedAt: new Date('2026-03-02'),
      },
      {
        projectId: project1.id,
        amount: 850,
        category: TransactionCategory.SUPPLIES,
        description: 'Medical supplies – Site B',
        date: new Date('2026-03-03'),
        status: TransactionStatus.PENDING,
        createdById: field.id,
      },
      {
        projectId: project1.id,
        amount: 200,
        category: TransactionCategory.ALLOWANCE,
        description: 'Field team allowance – Week 2',
        date: new Date('2026-03-05'),
        status: TransactionStatus.APPROVED,
        createdById: field.id,
        approvedById: finance.id,
        approvedAt: new Date('2026-03-06'),
      },
      {
        projectId: project1.id,
        amount: 1100,
        category: TransactionCategory.ACCOMMODATION,
        description: 'Team accommodation – Week 4',
        date: new Date('2026-03-08'),
        status: TransactionStatus.REJECTED,
        note: 'Exceeds accommodation policy limit. Resubmit with proper approval.',
        createdById: field.id,
        approvedById: finance.id,
        approvedAt: new Date('2026-03-09'),
      },
      {
        projectId: project2.id,
        amount: 4500,
        category: TransactionCategory.SUPPLIES,
        description: 'Water pump equipment – Phase 1',
        date: new Date('2026-03-02'),
        status: TransactionStatus.APPROVED,
        createdById: field.id,
        approvedById: admin.id,
        approvedAt: new Date('2026-03-03'),
      },
      {
        projectId: project2.id,
        amount: 750,
        category: TransactionCategory.TRANSPORT,
        description: 'Logistics – Site delivery',
        date: new Date('2026-03-04'),
        status: TransactionStatus.PENDING,
        createdById: field.id,
      },
    ],
  });

  console.log('✅ Transactions created');

  // ─── Audit Logs ────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: 'PROJECT_CREATED', entityType: 'Project', entityId: project1.id },
      { userId: admin.id, action: 'PROJECT_CREATED', entityType: 'Project', entityId: project2.id },
      { userId: field.id, action: 'TRANSACTION_CREATED', entityType: 'Transaction', entityId: 'seed-1' },
      { userId: finance.id, action: 'TRANSACTION_APPROVED', entityType: 'Transaction', entityId: 'seed-1' },
    ],
  });

  console.log('✅ Audit logs created');
  console.log('\n🎉 Database seeded successfully!');
  console.log('\nDemo users:');
  console.log('  Admin:           admin@tora.demo / demo1234');
  console.log('  Finance Officer: finance@tora.demo / demo1234');
  console.log('  Field Officer:   field@tora.demo / demo1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
