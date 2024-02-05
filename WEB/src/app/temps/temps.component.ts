import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Temps } from '../models/temps';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.css'],
})
export class TempsComponent implements OnInit {
  temps: MatTableDataSource<Temps> = new MatTableDataSource<Temps>();
  displayedColumns: string[] = ['nom', 'responsable'];

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    switch (this.authService.whatRole()) {
      case 'ROLE_USER':
        this.userService.getImputation().subscribe((temps) => {
          console.log(temps);
          this.temps = temps;
        });
        break;
      case 'ROLE_MANAGER':
        this.managerService.getAttachedUsers().subscribe((users) => {
          console.log(users);
        });
        break;
    }
  }

  AddElement() {
    this.router.navigate(['/temps-formulaire']);
  }
}
