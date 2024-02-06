import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ManagerService} from "../services/manager.service";

@Component({
  selector: 'app-temps-liste-users',
  templateUrl: './temps-liste-users.component.html',
  styleUrls: ['./temps-liste-users.component.css']
})
export class TempsListeUsersComponent {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['nom'];


  constructor(private fb: FormBuilder, private router: Router,
              private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getAttachedUsers().subscribe((users) => {
      this.users.data = users;
    });
  }

  redirectUser(id: number): void {
    this.router.navigate(['/temps', id]);
    return;
  }
}
