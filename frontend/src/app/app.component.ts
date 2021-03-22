import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from './core/services/electron/electron.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoService } from './services/todo.service';
import { Todo } from './services/entities/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private static NB_MAX_TODOS = 50;
  public static NB_MAX_LENGTH = 80;
  public static NB_MIN_LENGTH = 5;
  public darkMode: boolean = false;
  public createTodo: string = '';
  public todos: Todo[] = [];

  constructor(
    private electronService: ElectronService,
    private todoService: TodoService,
    private snackBarService: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllNews();
  }

  private getAllNews() {
    this.subscriptions.push(this.todoService.getAllTodos().subscribe(todos => {
      this.todos = todos
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }));
  }

  ngOnDestroy() {
    console.log('destroy')
    this.subscriptions.forEach(subscription => {
      if (!subscription.closed) {
        subscription.unsubscribe();
      }
    });
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
    if (inputTodo.value.length <= AppComponent.NB_MAX_LENGTH
      && inputTodo.value.length >= AppComponent.NB_MIN_LENGTH) {
      if (this.todos.length <= AppComponent.NB_MAX_TODOS) {
        let todo = <Todo>{
          value: inputTodo.value,
          completed: false
        };
        this.subscriptions.push(this.todoService.addTodo(todo).subscribe(() => {
          this.todos.push(todo);
          inputTodo.value = '';
        }, error => {
          console.log(error);
          this.openSnackBar(`Error: ${error.message}`);
        }));
      }
    }
  }

  public onCheckedChange(change: any) {
    this.subscriptions.push(this.todoService.updateTodoStatus(change.option.value.uuid).subscribe(() => {
      change.option.value.completed = change.option.selected;
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }))
  }

  public clearCompleted() {
    this.subscriptions.push(this.todoService.deleteAllCompletedTodos().subscribe(() => {
      this.todos = this.todos.filter((todo: Todo) => !todo.completed);
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }));
  }

  public openSnackBar(message: string) {
    this.snackBarService.open(message, "close", {
      duration: 2000,
    });
  }
}
