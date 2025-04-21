import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService:UserService, private router:Router){}

  ngOnInit(){
    if(localStorage.getItem('loggedInUser')){
      this.router.navigate([`/`]);
    }
  }

  onLogin(loginDetails:{email:string, password:String}){
    console.log(loginDetails);
    this.userService.getUsers().subscribe((users)=>{
      const user=users.find((u) => u.email === loginDetails.email && u.password === loginDetails.password)
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.reload();
        if(localStorage.getItem('loggedInUser')){
          this.router.navigate([`/`]);
        }
      } else {
        document.getElementById('login-alert')?.classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('login-alert')?.classList.add('hidden');
        }, 1600)
      }
    })
  }
}

