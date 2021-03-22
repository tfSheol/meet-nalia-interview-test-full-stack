import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './services/todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo,
    ]),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './sqlite/db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TodoService
  ],
})
export class AppModule {}
