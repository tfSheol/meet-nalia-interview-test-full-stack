import { Component, OnInit } from '@angular/core';
import { DbService } from './core/services/db/db.service';
import { ElectronService } from './core/services/electron/electron.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public createTodo: string = '';
  public todos: string[] = ['test todo 1', 'test todo 2'];

  constructor(
    private electronService: ElectronService,
    private dbService: DbService
  ) { }

  ngOnInit() {
    this.dbService.connect();

    this.electronService.setMenuIdListener('test:sub:1', () => {
      console.log('test menu item custom listener test:sub:1');
    });

    this.electronService.setMenuIdListener('test:sub:2', () => {
      console.log('click on test:sub:2');
    });
  }

  public dragAndDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  public addNewTodo(todo: any): void {
    this.todos.push(todo.value);
    todo.value = '';
  }
}
