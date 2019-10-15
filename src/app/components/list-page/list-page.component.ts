import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { User } from '../../interfaces/user';
import { MatDialog } from '@angular/material';
import { EditUserDataComponent } from '../edit-user-data/edit-user-data.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filteredCountries: string[] = [];
  caseStatus = 'All';
  page = 0;

  sortedFirstName = false;
  sortedLastName = false;
  sortedCountry = false;

  searchString = '';

  checkedItems = [false, false, false];
  emptyCountryList: Subject<void> = new Subject<void>();

  constructor(private dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.users = this.dataService.getUsers();
    this.filteredUsers = this.users;
  }

  getBirthDate(dateString: string): Date {
    const birthDate = dateString.split('/');
    return new Date(Number(birthDate[0]), Number(birthDate[1]) - 1, Number(birthDate[2]));
  }

  updateFilterCountry(countries: string[]): void {
    this.filteredCountries = countries;
    this.filterUsers();
  }

  updatePage(page: number): void {
    if (page < 0) {
      page = 0;
    }
    this.page = page;
  }

  filterUsers(): void {
    if (this.filteredCountries.length > 0) {
      this.filteredUsers = this.users.filter((user: User) =>
        this.filteredCountries.indexOf(user.country) >= 0);
    } else {
      this.filteredUsers = this.users;
    }
    if (this.caseStatus !== 'All') {
      this.filteredUsers = this.filteredUsers.filter((user: User) =>
        user.status === this.caseStatus
      );
    }
    if (this.searchString) {
      this.filteredUsers = this.filteredUsers.filter((user: User) =>
        user.firstName.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0 ||
        user.lastName.toLowerCase().indexOf(this.searchString.toLowerCase()) >= 0
      );
    }
    this.resetSortedList();
  }

  resetFilters(): void {
    this.caseStatus = 'All';
    this.filteredCountries = [];
    this.searchString = '';
    this.filterUsers();
    this.resetSortedList();
    this.alertEmptyingList();
  }

  alertEmptyingList(): void {
    this.emptyCountryList.next();
  }

  resetSortedList() {
    this.sortedFirstName = false;
    this.sortedLastName = false;
    this.sortedCountry = false;
  }

  sortByFirstName(): void {
    if (this.sortedFirstName) {
      this.filteredUsers.reverse();
    } else {
      this.filteredUsers.sort((user1: User, user2: User) => {
        return user1.firstName.localeCompare(user2.firstName);
      });
      this.sortedFirstName = true;
    }
  }

  sortByLastName(): void {
    if (this.sortedLastName) {
      this.filteredUsers.reverse();
    } else {
      this.filteredUsers.sort((user1: User, user2: User) => {
        return user1.lastName.localeCompare(user2.lastName);
      });
      this.sortedLastName = true;
    }
  }

  sortByCountry(): void {
    if (this.sortedCountry) {
      this.filteredUsers.reverse();
    } else {
      this.filteredUsers.sort((user1: User, user2: User) => {
        return user1.country.localeCompare(user2.country);
      });
    }
  }

  updateCheckList(event: any): void {
    if (event.checked) {
      this.checkedItems = [true, true, true];
    } else {
      this.checkedItems = [false, false, false]
    }
  }

  editUserDetails(user: User): void {
    const dialogRef = this.dialog.open(EditUserDataComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        const index = this.users.findIndex((u: User) => u.index === user.index);
        this.users[index].firstName = data.firstName;
        this.users[index].lastName = data.lastName;
        this.users[index].phoneNumber = data.phoneNumber;
        const d = data.birthDate;
        this.users[index].birthDate = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);
      }
    });
  }
}
