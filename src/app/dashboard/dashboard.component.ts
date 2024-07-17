import { Component } from '@angular/core';
import { TaskService } from '../common/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [],
})
export class DashboardComponent {
  stats = {
    totalTasks: 0,
    todo: 0,
    ongoing: 0,
    done: 0,
    backend: 0,
    frontend: 0,
    ui: 0,
  };
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getStats().subscribe((data) => {
      this.stats = data;
    });
  }
}
