import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../service/project-service.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Employee {
  id: string;
  firstname: string;
  lastname: string;
}

interface Project {
  id: string;
  name: string;
  requirements: string;
  skills: string[];
  result_image: string[];
  project_start_date: string;
  project_end_date: string;
  createdAt: string;
  lastUpdatedat: string;
  department: Department;
  customer: Customer;
}

interface Department {
  id: string;
  name : string;
}

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
}

interface ProjectEmployee {
  employeeId: string;
  role_in_project: string;
  task: string; 
  effort: number;
}

@Component({
  selector: 'app-project-delete',
  imports: [],
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.scss'
})
export class ProjectDeleteComponent implements OnInit
{
  project : Project = {
    id: '',
    name: '',
    department: {id: '', name: ''},
    customer: { id: '', firstname: '' , lastname: ''},
    requirements: '',
    skills: [],
    result_image: [],
    project_start_date: '',
    project_end_date: '',
    createdAt: '',
    lastUpdatedat: '',
  }

  constructor(
    private projectService: ProjectServiceService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      if (id)
      {
        const deleteProject = this.projectService.getProjectById(id)
        if (deleteProject)
        {
          this.project = deleteProject
          this.projectService.deleteProject(deleteProject.id).subscribe(
            () => {
              this.router.navigate(['/dashboard/project'])
            }
          )
        }
      }
  }

}
