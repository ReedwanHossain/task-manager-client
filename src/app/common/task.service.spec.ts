import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../task-board/task.interface';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const apiUrl = 'localhost:3000/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks with pagination', () => {
    const dummyTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        status: 'todo',
        category: 'backend',
        dueDate: new Date().toString(),
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        status: 'ongoing',
        category: 'backend',
        dueDate: new Date().toString(),
      },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/pagination?page=1&limit=10&filter=todo`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });
});
