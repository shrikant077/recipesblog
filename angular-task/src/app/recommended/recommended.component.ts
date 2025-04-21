import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { RecipesService } from '../services/recipes.service';
import { UserService } from '../services/user.service';
import { Recipes } from '../interfaces/recipes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recommended',
  imports: [FormsModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent {
  constructor(private recipeService: RecipesService, public router: Router, private userService: UserService) { }
  recipes!: Recipes[];
    users: Users = JSON.parse(localStorage.getItem('loggedInUser') as string);
    filteredRecipes!: Recipes[];
  
  ngOnInit(){
    if(this.users){
      this.router.navigate([`/user/${this.users.id}/recommended`]);
    }
    else{
      this.router.navigate(['/login']);
    }
    this.recipeService.getRecipes().subscribe((data:Recipes[]) => {
      this.recipes = data;
      this.filteredRecipes = data;
      console.log(data);
    })
  }

    
    filters = {
      cuisine: '',
      category: '',
      cookingTime: '',
      difficulty: '',
      // sortBy: ''
    };
  
  
    openRecipe(recipeid: string, title: string) {
      console.log(recipeid, title);
      this.router.navigate([`/${recipeid}/${title}`])
    }
  
    openProfile(userid: String) {
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
  
    toggleFilter(){
      document.getElementById('filter')?.classList.toggle('hidden');
    }
  
    applyFilters() {
      this.filteredRecipes = this.recipes
        .filter(recipe => {
          return (!this.filters.cuisine || recipe.cuisine === this.filters.cuisine) &&
                 (!this.filters.category || recipe.category === this.filters.category) &&
                 (!this.filters.cookingTime || recipe.cookingTime <= this.filters.cookingTime) &&
                 (!this.filters.difficulty || recipe.difficulty === this.filters.difficulty);
        });
    }
}
