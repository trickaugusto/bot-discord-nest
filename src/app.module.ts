import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { environment } from './environments/environments';
import { AppUpdate } from './app.update';

@Module({
  imports: [NecordModule.forRoot(environment.discord)],
  controllers: [],
  providers: [AppUpdate],
})
export class AppModule {}
