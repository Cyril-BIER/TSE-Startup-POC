import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  searchText: string = '';
  isUserListVisible: boolean = false;
  isCreationFormVisible: boolean = false;
  hide = true;
  form!: FormGroup;
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
  selectedUser: string | null = null;


  constructor(private fb: FormBuilder) {
    this.selectedUser = ''
  }

  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      motDePasse: ['', Validators.required]
    });
  }

  get filteredUsers(): any[] {
    return this.users.filter(user => user.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  onNgModelChange(event: any) {
    console.log('On ngModelChange : ', event);
  }

  showUsers() {
    this.isUserListVisible = true;
  }

  hideUsers() {
    this.isUserListVisible = false;
  }

  showCreation() {
    this.isCreationFormVisible = true;
  }

  hideCreation() {
    this.isCreationFormVisible = false;
  }

  onSubmit(): void {
    const {nom, prenom, motDePasse} = this.form.value;
    // Il faudra le stocker quelque part
    this.users.push({name: nom})
    this.isCreationFormVisible = false;
    this.form.reset();
  }

  supprimerUtilisateur(): void {
    if (this.selectedUser && this.selectedUser.length > 0) {
      const selectedUserName = this.selectedUser[0]; // Prendre le premier élément du tableau
      const index = this.users.findIndex(user => user.name === selectedUserName);
      if (index !== -1) {
        this.users.splice(index, 1);
        this.selectedUser = null;
      }
    }
  }
}

