import {Component} from '@angular/core';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  isUserListVisible: boolean = false;
  users: {
    name: string;
  }[] = [
    {
      name: 'User 1'
    },
    {
      name: 'User 2'
    },
    {
      name: 'User 3'
    },
  ];
  selectedRights: string[] = ['Right 1', 'Right 3'];

  onNgModelChange(event: any){
    console.log('On ngModelChange : ', event);
  }

  showUsers() {
    this.isUserListVisible = true;
  }

  hideUsers() {
    this.isUserListVisible = false;
  }
}


