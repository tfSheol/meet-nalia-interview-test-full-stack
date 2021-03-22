import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/entities/todo.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) { }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find({
      order: {
        position: "ASC"
      }
    });
  }

  async addItem(todo: Todo): Promise<InsertResult> {
    let items = await this.todoRepository.find();
    if (items.length > 0) {
      let pos = Math.max.apply(Math, items.map(todo => todo.position));
      todo.position = pos + 1;
    } else {
      todo.position = 0;
    }
    return this.todoRepository.insert(todo);
  }

  updatePosition(todos: Todo[]): Promise<Todo[]> {
    return this.todoRepository.save(todos.map(todo => {
      return {
        uuid: todo.uuid,
        position: todo.position
      }
    }));
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

  remove(uuid: string): Promise<DeleteResult> {
    return this.todoRepository.delete(uuid);
  }

  async removeCompleted(): Promise<DeleteResult> {
    return this.todoRepository.delete(<Todo>{
      completed: true
    });
  }
}