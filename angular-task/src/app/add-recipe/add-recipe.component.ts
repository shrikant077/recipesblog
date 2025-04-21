import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipes } from '../interfaces/recipes';
import { RecipesService } from '../services/recipes.service';
import { UserService } from '../services/user.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-add-recipe',
  imports: [RouterLink, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  constructor(private recipeService: RecipesService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  users: Users = JSON.parse(localStorage.getItem('loggedInUser') as string);
  ngOnInit() {
    // this.userService.getUsers().subscribe((data)=>{
    //   console.log(data);
    // })
    if (this.users) {
      this.router.navigate([`/user/${this.users.id}/addrecipe`]);
    }
    else {
      this.router.navigate(['/login']);
    }
    // this.route.params.subscribe((params)=>{
    //   console.log(params["userid"]);
    //   this.userService.getUserById(params["userid"]).subscribe({
    //     next: (user) => {
    //       console.log(user);
    //       if(this.users){
    //         this.router.navigate([`/user/${params["userid"]}/addrecipe`]);
    //       }
    //     },
    //     error: (err) => {
    //       console.warn('User not found, redirecting to login...');
    //       this.router.navigate(['/login']);
    //     }
    //   });
    // })
  }

  handleSuccess() {
    document.getElementById('submit-alert')?.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('submit-alert')?.classList.add('hidden');
    }, 1600)
  }

  newrecipe: Recipes = {
    id: '',
    userid: this.users.id,
    name: '',
    img: '/images/food.svg',
    dishdp: '/images/dishdp.svg',
    reviews: '5K',
    cuisine: '',
    category: '',
    difficulty: '',
    cookingTime: '',
    tags: [],
    ingredients: [],
    description: '',
    dietaryRestrictions: undefined
  };

  addRecipe(data: {
    id: string,
    userid: string,
    name: string,
    img?: string,
    dishdp?: string,
    reviews?: string,
    cuisine: string,
    category: string,
    difficulty: string,
    cookingTime: string,
    tags: string | string[],
    ingredients: string | string[],
    description: string,
    dietaryRestrictions?: string
  }) {

    data.userid=this.users.id;
    data.img = '/images/food.svg';
    data.dishdp = '/images/dishdp.svg';
    data.reviews = '5K';
    let tags = (data.tags as string).split(',');
    let ingre = (data.ingredients as string).split(',');

    data.tags = tags;
    data.ingredients = ingre;

    this.recipeService.addRecipe(data).subscribe((data) => {
      console.log(data);
      this.newrecipe = data;
      // this.users.addedRecipes.push(data.id);

      localStorage.setItem('loggedInUser', JSON.stringify(this.users));

      this.userService.updateUser(this.users.id, this.users).subscribe(() => {
        console.log('User updated with new recipe ID');
      });
    })
    this.router.navigate(['/']);
  }


}
