import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from "../../services/task.service";
import {ProjectService} from "../../services/project.service";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: any = {
    name: "",
    description: "",
    due_date: "",
    end_date: "",
    project: {id: ""},
    assigned: {id: ""}
  };
  project: any = {};
  members:any[]=[];

  isNew: boolean = false;


  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private projectService: ProjectService,
    private userService:UserService
  ) {
  }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.task.project.id = this.route.snapshot.queryParamMap.get('projectId');
    if (this.task.project.id) {
      this.projectService.getProjectById(this.task.project.id).subscribe(
        (project) => {
          this.project = project;
          this.members = project.members;
        },
        error => {
          console.error('Failed to load project', error);
        }
      );
    }
    if (taskId != 'new') {
      this.isNew = false;
      this.isEditMode = false;
      this.taskService.getTaskById(taskId).subscribe(
        (task) => {
          this.task = task;
          this.task.assigned = {id: task.assignedId};
        },
        error => {
          console.error('Failed to load task', error);
        }
      );
    } else {
      this.isNew = true;
      this.isEditMode = true;
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.taskService.createTask(this.task).subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Failed to create task', error);
        }
      );
    } else {
      this.taskService.updateTask(this.task).subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Failed to update task', error);
        }
      );
    }
  }

  onSwitchMode() {
    this.isEditMode = !this.isEditMode;
  }
}
