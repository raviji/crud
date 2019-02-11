import { Component, OnInit } from '@angular/core';
import { FirestoreDataService } from '../firestore-data.service';
import { People } from '../people';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface PeopleList {
  name: string;
  id: string;
}
@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})

export class ContributorsComponent implements OnInit {
  addPlayerForm: FormGroup;
  submitted = false;
  people: PeopleList[];
  constructor(private formBuilder: FormBuilder, public _data: FirestoreDataService) {  }

  ngOnInit() {
      this.addPlayerForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
      this._data.getPeople().subscribe(
        (user: People[]) => {
          this.people = user;
          console.log(this.people);
        }
      );
  }

// convenience getter for easy access to form fields
    get f() { return this.addPlayerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addPlayerForm.invalid) {
            return;
        }
        this._data.addPeople(this.addPlayerForm.value);
        // console.log(this.addPlayerForm.value)
    }

    delete(user) {
        this._data.deletePeople(user);
      }

}
