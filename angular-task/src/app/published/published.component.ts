import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { Recipes } from '../interfaces/recipes';
import { RecipesService } from '../services/recipes.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-published',
  imports: [],
  templateUrl: './published.component.html',
  styleUrl: './published.component.css'
})
export class PublishedComponent {
  constructor(private router:Router, private recipeService: RecipesService, private userService:UserService) { }
  users:Users = JSON.parse(localStorage.getItem('loggedInUser') as string);

  recipes:Recipes[]=[];
  

  ngOnInit(){
    
    if(this.users){
      this.recipeService.getRecipes().subscribe((recipes:Recipes[])=>{
        this.recipes=recipes.filter((r)=>this.users.id==r.userid);
      })
      // this.router.navigate([`/user/${this.users.id}/myrecipes`]);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  editRecipe(recipeid:string){
    console.log(recipeid)
    this.router.navigate([`/user/${this.users.id}/${recipeid}/editrecipe`]);
  }
  openProfile(userid:String){
    this.router.navigate([`user/${userid}/profile`])
  }

  removeFab(recipeid: string, i:number) {
    if (!this.users) {
      this.router.navigate(['/login']);
    }
    else {
      let f = document.getElementById(`fav-${i}`);
      f?.classList.toggle('text-white');
      if (f?.classList.contains('bg-red-700')) {
        f?.classList.remove('bg-red-700');
        f.classList.add('bg-white')
        this.users.favorites = this.users.favorites.filter((r) => r != recipeid);
        this.userService.updateUser(this.users.id, this.users).subscribe((user) => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.users));
        })
      }
      else {
        f?.classList.add('bg-red-700');
        f?.classList.remove('bg-white');
        this.users.favorites.push(recipeid);
        this.userService.updateUser(this.users.id, this.users).subscribe((user) => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.users));
        })
      }
    }
  }
}
