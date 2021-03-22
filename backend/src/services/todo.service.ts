import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  addItem(todo: Todo): Promise<InsertResult> {
    return this.todoRepository.insert(todo);
  }

  async updateStatus(uuid: string): Promise<UpdateResult> {
    let todo: Todo = await this.todoRepository.findOne(<Todo>{
        uuid: uuid
    });
    todo.completed = !todo.completed;
    return this.todoRepository.update(<Todo>{
        uuid: uuid
    }, todo);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.todoRepository.delete(id);
  }

  async removeCompleted(): Promise<DeleteResult> {
    return this.todoRepository.delete(<Todo>{
        completed: true
    });
  }
}