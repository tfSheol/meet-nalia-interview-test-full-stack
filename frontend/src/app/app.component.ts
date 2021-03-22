import { Component, Input, OnInit } from '@angular/core';
import { DbService } from './core/services/db/db.service';
import { ElectronService } from './core/services/electron/electron.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoService } from './services/todo.service';
import { FormControl, Validators } from '@angular/forms';

declare interface Todo {
  uuid?: string,
  value: string,
  completed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private static NB_MAX_TODOS = 50;
  public static NB_MAX_LENGTH = 100;
  public darkMode: boolean = false;
  public createTodo: string = '';
  public todos: Todo[] = [];
  // fix form control later
  @Input('formControlName')
  public inputTodoFormControl: FormControl = new FormControl(
    '', [Validators.required, Validators.min(3), Validators.max(AppComponent.NB_MAX_LENGTH)])

  constructor(
    private electronService: ElectronService,
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  public switchDarkMode(): void {
    this.darkMode = !this.darkMode;
    console.log(this.darkMode);
  }

  public dragAndDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex, event.item.data);
  }

  public isDisabled(): boolean {
    return this.todos.length >= AppComponent.NB_MAX_TODOS;
  }

  public addNewTodo(inputTodo: any): void {
    console.log(this.inputTodoFormControl);
    this.todos.push(<Todo>{
      value: inputTodo.value,
      completed: false
    });
    inputTodo.value = '';
    if (this.todos.length <= AppComponent.NB_MAX_TODOS) {
      console.log("send to api");
    }
  }

  public onChange(change: any) {
    change.option.value.completed = change.option.selected;
    console.log(change.option.value, change.option.selected);
  }

  public clearCompleted() {
    this.todos = this.todos.filter((todo: Todo) => !todo.completed);
  }
}
