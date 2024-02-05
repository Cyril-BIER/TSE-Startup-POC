import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Projet } from '../models/projet';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css'],
})
export class ProjetComponent implements OnInit {
  projets: MatTableDataSource<Projet> = new MatTableDataSource<Projet>();
  displayedColumns: string[] = ['nom', 'responsable', 'utilisateur'];

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    switch (this.authService.whatRole()) {
      case 'ROLE_USER':
        this.userService.getProjets().subscribe((projets) => {
          console.log(projets);
          this.projets.data = projets;
        });
        break;
      case 'ROLE_MANAGER':
        this.managerService.getProjects().subscribe((users) => {
          console.log(users);
          this.projets.data = users;
        });
        break;
    }
  }

  addProjet() {
    this.router.navigate(['/projetForm']);
  }
}
