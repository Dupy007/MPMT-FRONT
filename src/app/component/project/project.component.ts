import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from "../../services/project.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project: any = {
    name: "",
    description: '',
    start_date: '',
  };
  tasks: any[] = [];
  users: any[] = [];
  isEditMode = false;
  isAddUserMode = false;
  isNew: boolean = false;
  projectMember: any = {
    user: {
      id: null
    },
    role: null
  }
  roles: any[] = []


  onSwitchMode() {
    this.isEditMode = !this.isEditMode;
    this.isAddUserMode = false;
  }

  onSwitchAddMode() {
    this.onSwitchMode();
    this.isAddUserMode = !this.isAddUserMode;
  }

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router
  ) {
    this.roles = [{
      id: 1,
      name: "admin"
    },
      {
        id: 2,
        name: "member"
      },
      {
        id: 3,
        name: "observateur"
      }]
  }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId == 'new') {
      this.isNew = true;
      this.isEditMode = true;
    } else {
      this.projectService.getProjectById(projectId).subscribe(
        (project) => {
          this.project = project;
          this.tasks = project.tasks;
        },
        error => {
          console.error('Failed to load project', error);
        }
      );
      this.userService.all().subscribe(
        (users) => {
          this.users = users;
        },
        error => {
          console.error('Failed to load user', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.isAddUserMode) {
        this.projectService.linkProject(this.project.id,this.projectMember).subscribe(
          data => {
            this.ngOnInit();
            this.onSwitchMode();
          },
          error => {
            console.error('Failed to create task', error);
          }
        );

    } else {
      if (this.isNew) {
        this.projectService.createProject(this.project).subscribe(
          data => {
            this.router.navigate(['/project', data.id]);
          },
          error => {
            console.error('Failed to create task', error);
          }
        );
      } else {
        let project = {
          name: this.project.name,
          description: this.project.description,
          start_date: this.project.start_date,
          end_date: this.project.end_date,
        }
        this.projectService.updateProject(this.project.id,  project).subscribe(
          () => {
            this.ngOnInit();
            this.onSwitchMode();
          },
          error => {
            console.error('Failed to update task', error);
          }
        );
      }
    }
  }

  onNewtask() {
    console.log(this.project.id)
    this.router.navigate(["/task", "new"], {queryParams: {projectId: this.project.id}})
  }

}
