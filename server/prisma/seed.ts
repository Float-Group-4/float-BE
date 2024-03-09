// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create user
  const user = await prisma.user.upsert({
    where: { email: 'owner@gmail.com' },
    update: {},
    create: {
      name: 'Truong Gia Huy',
      email: 'owner@gmail.com',
      password: '123456',
      timeFormat: '12',
      avatar:
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', // copillot sugges this lmao
    },
  });

  // create team
  const team = await prisma.team.upsert({
    where: { name: 'Team 1' },
    update: {},
    create: {
      name: 'Team 1',
    },
  });

  const setting = await prisma.setting.upsert({
    where: { teamId: team.id },
    update: {},
    create: {
      teamId: team.id,
      currency: 'VND',
      timeZone: 'Asia/Ho_Chi_Minh',
      startWeek: 'Monday',
      timeFormat: '12',
      isShowWeekend: true,
      workDay: 'Monday, Tuesday, Wednesday, Thursday, Friday',
    },
  });

  const role = await prisma.role.create({
    data: {
      name: 'Admin', //consider unique
      teamId: team.id,
    },
  });

  const department = await prisma.department.create({
    data: {
      name: 'Development', //consider unique
      teamId: team.id,
      isSubDepart: false,
    },
  });

  const teamMember = await prisma.teamMember.create({
    data: {
      userId: user.id,
      teamId: team.id,
      name: user.name,
      type: 'Owner',
      hourlyRate: 1000,
      access: 'Admin',
      email: user.email,
      roleId: role.id,
      departmentId: department.id,
    },
  });

  prisma.team.upsert({
    where: { id: team.id },
    update: {
      name: 'Team 1',
      teamOwnerId: teamMember.id,
    },
    create: {
      name: 'Team 1',
      teamOwnerId: teamMember.id,
    },
  });

  const timeOffType = await prisma.timeOffType.create({
    data: {
      name: 'Sick Leave', //consider unique
      teamId: team.id,
      color: '#FF0000',
      balance: '2',
      days: 0.5,
      EffectiveDate: new Date(),
    },
  });

  const timeOff = await prisma.timeOff.create({
    data: {
      teamMemberId: teamMember.id,
      typeId: timeOffType.id,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const activity = await prisma.activity.create({
    data: {
      teamMemberId: teamMember.id,
      teamId: team.id,
      activity: 'Create Team',
      timeStamp: new Date(),
    },
  });

  const project = await prisma.project.create({
    data: {
      name: 'Project 1', //consider unique
      projectOwnerId: teamMember.id,
      client: 'Float',
      bugdet: '10000',
    },
  });
  const projectMember = await prisma.projectMember.create({
    data: {
      teamMemberId: teamMember.id,
      projectId: project.id,
    },
  });

  const task = await prisma.task.create({
    data: {
      name: 'Task 1',
      projectId: project.id,
    },
  });

  const allocation = await prisma.allocation.create({
    data: {
      teamMemberId: teamMember.id,
      taskId: task.id,
      description: 'CREATE THE BACKEND',
      startDate: new Date(),
      endDate: new Date(),
      workHours: 8,
      status: 1, //0 = todo, 1 = in progress, 2 = done
    },
  });

  const Tag = await prisma.tag.create({
    data: {
      name: 'Tag 1', //consider unique
      teamId: team.id,
      color: '#FF1111',
      createdById: teamMember.id,
    },
  });

  const TeamMemberTag = await prisma.teamMemberTags.create({
    data: {
      teamMemberId: teamMember.id,
      tagId: Tag.id,
    },
  });

  const projectTag = await prisma.projectTags.create({
    data: {
      projectId: project.id,
      tagId: Tag.id,
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
