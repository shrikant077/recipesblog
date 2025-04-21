import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { RecipesService } from '../services/recipes.service';
import { Recipes } from '../interfaces/recipes';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  constructor(private router:Router, private recipeService:RecipesService, private userService:UserService) { }
  users:Users = JSON.parse(localStorage.getItem('loggedInUser') as string);
  recipes:Recipes[]=[];
  ngOnInit(){
    if(this.users){
      console.log(this.users.favorites);
      for(let i of this.users.favorites){
        this.recipeService.getRecipeById(i).subscribe((recipe:Recipes)=>{
          this.recipes.push(recipe);
        })
      }
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  openRecipe(recipeid: string, title: string){
    console.log(recipeid, title);
    this.router.navigate([`/${recipeid}/${title}`])
  }
 
  removeFab(recipeid:string, i:number){
     let f=document.getElementById(`fav-${i}`);
     f?.classList.toggle('text-white');
     if(f?.classList.contains('bg-red-700')){
        f?.classList.remove('bg-red-700');
        f.classList.add('bg-white')
      }
      else{
        f?.classList.add('bg-red-700');
        f?.classList.remove('bg-white')
     }
     this.recipes=this.recipes.filter((r)=>r.id!=recipeid);
     this.users.favorites=this.users.favorites.filter((r)=>r!=recipeid);
     this.userService.updateUser(this.users.id,this.users).subscribe((user)=>{
      localStorage.setItem('loggedInUser', JSON.stringify(this.users));
     })
  }
    
    
  
   
    openProfile(userid:String){
      this.router.navigate([`user/${userid}/profile`])
    }

}
