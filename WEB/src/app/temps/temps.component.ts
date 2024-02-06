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
  displayedColumns: string[] = ['projet', 'duree', 'date'];

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

  formatDurationString(timeString: string): string {
    const match = timeString.match(/PT(?:(\d+)H)?(?:(\d+)M)?S?/);
    if (!match) {
      return timeString;
    }
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const parts: string[] = [];
    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? 'heure' : 'heures'}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }
    if (!parts.length) {
      parts.push('0 minutes');
    }
    return parts.join(' ');
  }
}
