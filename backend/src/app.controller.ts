import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './services/todo.service';

@Controller('todo')
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  addTodo(@Body() todo: Todo): Promise<InsertResult> {
    return this.todoService.addItem(todo);
  }

  @Patch('/completed/:uuid')
  updateTodo(@Param('uuid') uuid: string): Promise<UpdateResult> {
    return this.todoService.updateStatus(uuid);
  }

  @Patch('position')
  updatePosition(@Body() todos: Todo[]): Promise<Todo[]> {
    return this.todoService.updatePosition(todos);
  }

  @Delete()
  removeCompleted(): Promise<DeleteResult> {
    return this.todoService.removeCompleted();
  }
}
