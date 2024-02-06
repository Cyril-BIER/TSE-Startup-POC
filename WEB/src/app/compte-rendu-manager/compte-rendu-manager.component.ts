import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ManagerService} from "../services/manager.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-compte-rendu-manager',
  templateUrl: './compte-rendu-manager.component.html',
  styleUrls: ['./compte-rendu-manager.component.css']
})

export class CompteRenduManagerComponent implements OnInit {
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
    this.router.navigate(['/compte-rendu', id]);
    return;
  }
}
