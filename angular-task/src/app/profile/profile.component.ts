import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { Recipes } from '../interfaces/recipes';
import { RecipesService } from '../services/recipes.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router:Router, private recipeService:RecipesService, private route:ActivatedRoute, private userService:UserService) { }
  users:Users|undefined;
  currentusers: Users = JSON.parse(localStorage.getItem('loggedInUser') as string);
  recipes:Recipes[]=[];
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.userService.getUserById(params['userid']).subscribe({
        next: (user) => {
          this.users = user;
          // this.router.navigate([`/user/${params['userid']}/profile`]);
          this.recipeService.getRecipes().subscribe((recipes:Recipes[])=>{
            this.recipes=recipes.filter((r)=>this.users?.id==r.userid);
          })
        },
        error: (err) => {
          console.error('User not found:', err);
          this.router.navigate(['/']);
        }
      });
    })
  }
  
  openRecipe(recipeid: string, title: string) {
    console.log(recipeid, title);
    this.router.navigate([`/${recipeid}/${title}`])
  }

  openProfile(userid: String) {
    this.router.navigate([`user/${userid}/profile`])
  }

  removeFab(recipeid: string, i:number) {
    if (!this.currentusers) {
      this.router.navigate(['/login']);
    }
    else {
      let f = document.getElementById(`fav-${i}`);
      f?.classList.toggle('text-white');
      if (f?.classList.contains('bg-red-700')) {
        f?.classList.remove('bg-red-700');
        f.classList.add('bg-white')
        this.currentusers.favorites = this.currentusers.favorites.filter((r) => r != recipeid);
        this.userService.updateUser(this.currentusers.id, this.currentusers).subscribe((user) => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.currentusers));
        })
      }
      else {
        f?.classList.add('bg-red-700');
        f?.classList.remove('bg-white');
        this.currentusers.favorites.push(recipeid);
        this.userService.updateUser(this.currentusers.id, this.currentusers).subscribe((user) => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.currentusers));
        })
      }
    }
  }
    
}
