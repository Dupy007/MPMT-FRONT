import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from "../../services/project.service";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: any[] = [];
  tasks: any[] = [];


  constructor(private projectService: ProjectService, private router: Router,private taskService: TaskService) {
  }


  ngOnInit() {
    this.projectService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      error => {
        console.error('Failed to load projects', error);
      }
    );
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      error => {
        console.error('Failed to load projects', error);
      }
    );
  }
}
