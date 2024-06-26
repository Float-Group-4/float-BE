import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './views/view.module';

@Module({
  imports: [ViewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
