import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { Temps } from '../models/temps';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-temps',
  templateUrl: './temps.component.html',
  styleUrls: ['./temps.component.css'],
})
export class TempsComponent implements OnInit {
  temps: MatTableDataSource<Temps> = new MatTableDataSource<Temps>();
  displayedColumns: string[] = ['projet', 'duree', 'date'];
  formId: string ='';

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
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
        this.route.params.subscribe((params) => {
          this.formId = params['id'];
        });
        this.managerService.getImputationUser(this.formId).subscribe((temps) => {
          this.temps = temps;
        });
        break;
    }
  }

  AddElement() {
    this.router.navigate(['/temps-formulaire']);
  }

  formatDurationString(durationString: string): string {
    if (!durationString || durationString === 'PT0S') {
      return '0 min';
    }

    const match = durationString.match(/PT(\d+)H(\d+)M/);
    if (!match) {
      return 'Invalid duration';
    }

    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);

    let formattedString = '';
    if (hours > 0) {
      formattedString += `${hours}h`;
    }
    if (minutes > 0) {
      if (formattedString !== '') {
        formattedString += ' ';
      }
      formattedString += `${minutes}min`;
    }

    return formattedString;
  }
}
