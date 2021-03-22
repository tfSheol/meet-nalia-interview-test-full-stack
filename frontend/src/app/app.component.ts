import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ElectronService } from './core/services/electron/electron.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoService } from './services/todo.service';
import { Todo } from './services/entities/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private static NB_MAX_TODOS = 50;
  public static NB_MAX_LENGTH = 100;
  public static NB_MIN_LENGTH = 3;
  public toolbarControl = new FormControl();
  public darkMode: boolean = false;
  public createTodo: string = '';
  public todos: Todo[] = [];

  constructor(
    private electronService: ElectronService,
    private todoService: TodoService,
    private snackBarService: MatSnackBar
  ) { }

  ngOnInit() {
    this.toolbarControl.setValue('all');
    this.getAllNews();
  }

  private getAllNews(): void {
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
    this.subscriptions.push(this.todoService.updateTodoPosition(this.todos).subscribe(() => {
      console.log(event.currentIndex, event.item.data);
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }));
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
        this.subscriptions.push(this.todoService.addTodo(todo).subscribe(result => {
          todo.uuid = result?.identifiers[0]?.uuid;
          this.todos.push(todo);
          inputTodo.value = '';
        }, error => {
          console.log(error);
          this.openSnackBar(`Error: ${error.message}`);
        }));
      }
    }
  }

  public onCheckedChange(change: any): void {
    this.subscriptions.push(this.todoService.updateTodoStatus(change.option.value.uuid).subscribe(() => {
      console.log(change);
      change.option.value.completed = change.option.selected;
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }))
  }

  public deleteItem(uuid: string): void {
    this.subscriptions.push(this.todoService.deleteTodo(uuid).subscribe(() => {
      this.todos = this.todos.filter((todo: Todo) => todo.uuid !== uuid);
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }));
  }

  public clearCompleted(): void {
    this.subscriptions.push(this.todoService.deleteAllCompletedTodos().subscribe(() => {
      this.todos = this.todos.filter((todo: Todo) => !todo.completed);
    }, error => {
      console.log(error);
      this.openSnackBar(`Error: ${error.message}`);
    }));
  }

  public getItemsLeft(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  public getFilteredTodos(): Todo[] {
    if (this.toolbarControl.value === "active") {
      return [...this.todos.filter(todo => !todo.completed)];
    } else if (this.toolbarControl.value === "completed") {
      return [...this.todos.filter(todo => todo.completed)];
    }
    return this.todos;
  }

  public openSnackBar(message: string): void {
    this.snackBarService.open(message, "close", {
      duration: 2000,
    });
  }
}
