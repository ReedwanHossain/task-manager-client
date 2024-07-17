import { Component, OnInit } from '@angular/core';
import { TaskService } from '../common/task.service';
import { Task } from '../task-board/task.interface';
import { CommonModule } from '@angular/common';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularEditorModule],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  page: number = 1;
  limit: number = 5;
  filter: string = '';
  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService
      .getTasksPagination(this.page, this.limit, this.filter)
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  nextPage(): void {
    this.page++;
    this.getTasks();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getTasks();
    }
  }

  applyFilter(filter: string): void {
    this.filter = filter;
    this.getTasks();
  }
}
