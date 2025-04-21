import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipes } from '../interfaces/recipes';
import { RecipesService } from '../services/recipes.service';
import { UserService } from '../services/user.service';
import { Users } from '../interfaces/users';

import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipepage',
  imports: [NgFor],
  templateUrl: './recipepage.component.html',
  styleUrl: './recipepage.component.css'
})
export class RecipepageComponent {
  constructor(private route:ActivatedRoute, private recipeService:RecipesService, public router: Router, private userService: UserService){}


  recipes: any;
  users: Users = JSON.parse(localStorage.getItem('loggedInUser') as string);

  recipeid:string='';
  recipe!:Recipes;
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.recipeid=params['recipeid'];
      console.log(this.recipeid);
    })

    this.recipeService.getRecipeById(this.recipeid).subscribe((recipe:Recipes)=>{
      console.log(recipe);
      this.recipe=recipe;
    })

    if(this.users.favorites.find((id)=>id==this.recipeid)){
      let f=document.getElementById('favRec');
      f?.classList.add('bg-red-700');
      f?.classList.remove('bg-[#00CC6A]');
      f!.innerText="REMOVE FROM FAVORITES";
    }
  }

  removeFab(recipeid: string) {
    if (!this.users) {
      this.router.navigate(['/login']);
    }
    else {
      let f = document.getElementById('favRec');
      if (f?.classList.contains('bg-red-700')) {
        f?.classList.remove('bg-red-700');
        f.classList.add('bg-[#00CC6A]');
        f.innerText="ADD TO FAVORITES";
        this.users.favorites = this.users.favorites.filter((r) => r != recipeid);
        this.userService.updateUser(this.users.id, this.users).subscribe((user) => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.users));
        })
      }
      else {
        f?.classList.add('bg-red-700');
        f?.classList.remove('bg-[#00CC6A]');
        f!.innerText="REMOVE FROM FAVORITES";
        this.users.favorites.push(recipeid);
        this.userService.updateUser(this.users.id, this.users).subscribe((user) => {
          localStorage.setItem('loggedInUser', JSON.stringify(this.users));
        })
      }
    }
  }

  
  comments: string[] =["Awesome Recipe", "Keep Up the Good Work"];

}
