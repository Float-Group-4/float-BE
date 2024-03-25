import { INestApplication, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

const prisma = new PrismaClient();

function extendedClient() {
  const extendClient = () =>
    prisma.$extends(
      readReplicas({
        url: [process.env.DATABASE_READ_URL_1],
      }),
    );

  // https://github.com/prisma/prisma/issues/18628#issuecomment-1601958220
  return new Proxy(class {}, {
    construct(target, args, newTarget) {
      return Object.assign(
        Reflect.construct(target, args, newTarget),
        extendClient(),
      );
    },
  }) as new () => ReturnType<typeof extendClient>;
}

@Injectable()
export class PrismaService extends extendedClient() {
  async onModuleInit() {
    console.log('PrismaService initialized');
    console.log(process.env.DATABASE_READ_URL_1);
    console.log(process.env.DATABASE_READ_URL_2);
    console.log(process.env.DATABASE_URL);
    // Uncomment this to establish a connection on startup, this is generally not necessary
    // https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management#connect
    // await Prisma.getExtensionContext(prisma).$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      app.close();
    });
  }
}
