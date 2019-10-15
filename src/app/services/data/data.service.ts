import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { USERS } from '../../mock/USERS';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getUsers(): User[] {
    return USERS;
  }
}
