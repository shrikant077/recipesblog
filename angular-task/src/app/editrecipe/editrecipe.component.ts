import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from '../interfaces/users';
import { RecipesService } from '../services/recipes.service';
import { Recipes } from '../interfaces/recipes';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editrecipe',
  imports: [FormsModule],
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent {
  constructor(private router: Router, private recipeService: RecipesService, private route: ActivatedRoute, private userService: UserService) { }
  users: Users = JSON.parse(localStorage.getItem('loggedInUser') as string);

  recipeid: string = '';
  recipe!: Recipes;
  current_tags: string = '';
  current_ingredients: string = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      // console.log(params['recipeid'])
      this.recipeid = params['recipeid'];
      this.recipeService.getRecipeById(params['recipeid']).subscribe((recipe: Recipes) => {
        // console.log(recipe);
        this.recipe = recipe;
        if (this.users && recipe) {
          this.router.navigate([`/user/${this.users.id}/${params['recipeid']}/editrecipe`]);
        }
        else {
          this.router.navigate(['/login']);
        }
        this.current_tags = (this.recipe.tags as string[]).join(',');
        this.current_ingredients = (this.recipe.ingredients as string[]).join(',');
      })
    })

  }

  addTags() {
    document.getElementById('tag-area')?.classList.remove('hidden');
  }

  addIngredients() {
    document.getElementById('ingre-area')?.classList.remove('hidden');
  }

  updateTags(newtags: string) {
    console.log(newtags);
    document.getElementById('tag-area')?.classList.add('hidden');
    if (newtags) {
      let nt = newtags.split(',');
      for (let i of nt) {
        (this.recipe.tags as string[]).push(i.trim());
      }
    }
  }

  updateIngre(newingre: string) {
    console.log(newingre);
    document.getElementById('ingre-area')?.classList.add('hidden');
    if (newingre) {
      let nt = newingre.split(',');
      for (let i of nt) {
        (this.recipe.ingredients as string[]).push(i.trim());
      }
    }
  }

  removeTag(tag: string) {
    this.recipe.tags = (this.recipe.tags as string[]).filter((t) => t != tag);
  }

  removeIngredient(ingredient: string) {
    this.recipe.ingredients = (this.recipe.ingredients as string[]).filter((i) => i != ingredient);
  }

  deleteRecipe(recipeid: string) {
    this.recipeService.deleteRecipe(recipeid).subscribe((recipe: Recipes) => {
      // this.users.addedRecipes = this.users.addedRecipes.filter((r) => r != recipeid);
      this.userService.updateUser(this.users.id, this.users).subscribe((user) => {
        this.router.navigate([`/user/${this.users.id}/myrecipes`]);
      })
    })
  }

  handleSubmit(values: any) {
    // console.log(values);
    const tags: string[] = [];
    const ingredients: string[] = [];

    for (const key in values) {
      if (key.startsWith('tags-')) {
        tags.push(values[key]);
      }
      if (key.startsWith('ingredients-')) {
        ingredients.push(values[key]);
      }
    }
    // if (values.newtags) {
    //   let nt = values.newtags.split(',');
    //   for (let i of nt) {
    //     tags.push(i.trim());
    //   }
    // }
    // if (values.newingre) {
    //   let nt = values.newingre.split(',');
    //   for (let i of nt) {
    //     ingredients.push(i.trim());
    //   }
    // }
    let updatedRecipe: Recipes = {
      id: this.recipe.id,
      userid: this.recipe.userid,
      name: values.name,
      img: this.recipe.img,
      dishdp: this.recipe.dishdp,
      reviews: this.recipe.reviews,
      cuisine: values.cuisine,
      category: values.category,
      difficulty: values.difficulty,
      cookingTime: values.cookingTime,
      tags: tags,
      ingredients: ingredients,
      description: values.description,
      dietaryRestrictions: values.dietaryRestrictions
    }

    console.log(updatedRecipe);
    
    this.recipeService.updateRecipe(this.recipeid, updatedRecipe).subscribe((recipe)=>{
      document.getElementById('update-alert')?.classList.remove('hidden');
      setTimeout(()=>{
        document.getElementById('update-alert')?.classList.add('hidden');
        this.router.navigate([`/user/${this.users.id}/myrecipes`]);
      },1600)
    })
  }
}