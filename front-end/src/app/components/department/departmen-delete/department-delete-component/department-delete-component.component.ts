import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../service/department-service.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Department {
  id: string,
  name: string,
  overview: string,
  createdAt: string,
}


@Component({
  selector: 'app-department-delete-component',
  imports: [],
  templateUrl: './department-delete-component.component.html',
  styleUrl: './department-delete-component.component.scss'
})
export class DepartmentDeleteComponentComponent implements OnInit {

  constructor(
    private departmentService : DepartmentServiceService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id)
    {
      this.departmentService.deleteDepartmentWithApiCall(id).subscribe(
        () =>
        {
          this.router.navigate(['/dashboard/department'])
        }
      )

    }

  }

}
