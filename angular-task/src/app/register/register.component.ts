import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../interfaces/users';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(){
    if(localStorage.getItem('loggedInUser')){
      this.router.navigate([`/`]);
    }
  }
 
  addUser(user: Users) {
    console.log(user);
    // user.addedRecipes = [];
    user.favorites = [];
    this.userService.getUsers().subscribe((users) => {

      const checkuser = users.find((u) => u.email == user.email);
      
      if(!checkuser){
        this.userService.addUser(user).subscribe((user)=>{
          console.log(user);
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.router.navigate([`/`]);
          window.location.reload();
        })
      }
      else{
        document.getElementById('register-alert')?.classList.remove('hidden');
        setTimeout(()=>{
          document.getElementById('register-alert')?.classList.add('hidden');
        },1600);
      }
    })
  }
}
