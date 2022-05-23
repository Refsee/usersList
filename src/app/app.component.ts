import { Component } from '@angular/core';
import { User } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public usersList: Array<User> = [];
  public login: string = '';
  public password: string = '';
  public email: string = '';
  public userIndex!: number;
  public editStatus: boolean = false;
  public errorStatus: boolean = false;

  createUser(): User {
    return { login: this.login, password: this.password, email: this.email };
  }

  addUser(): void {
    const user: User = this.createUser();
    if (this.validUser(user)) {
      this.usersList.push(user);
      this.reset();
    } 
    else {
      this.errorStatus = true;
    }
  }

  deleteUser(id: number): void {
    this.usersList = this.usersList.filter((user, index) => index !== id);
  }

  editUser(id: number): void {
    this.userIndex = id;
    this.login = this.usersList[id].login;
    this.password = this.usersList[id].password;
    this.email = this.usersList[id].email;
    this.editStatus = true;
  }

  saveEditUser(): void {
    const newUser: User = this.createUser();
    if (this.validUser(newUser)) {
      this.usersList[this.userIndex] = newUser;
      this.editStatus = false;
      this.reset();
    } 
    else {
      this.errorStatus = true;
    }
  }

  reset(): void {
    this.login = '';
    this.password = '';
    this.email = '';
    this.errorStatus = false;
  }

  validUser(user: User): boolean {
    return user.login != '' && user.password != '' && user.email != '';
  }
}
