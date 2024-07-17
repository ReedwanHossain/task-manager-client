import { Component, OnInit } from '@angular/core';
import { TaskService } from '../common/task.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  dueDate?: string;
}

interface TaskBoard {
  status: string;
  tasks: Task[];
}

@Component({
  standalone: true,
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css'],
  imports: [CommonModule, FormsModule, AngularEditorModule],
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];
  taskBoards: TaskBoard[] = [];

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
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.categorizeTasks();
    });
  }

  categorizeTasks(): void {
    const statusSet = new Set(this.tasks.map((task) => task.status));
    this.taskBoards = Array.from(statusSet).map((status) => ({
      status,
      tasks: this.tasks.filter((task) => task.status === status),
    }));
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.categorizeTasks();
    });
  }
}
