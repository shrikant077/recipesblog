import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Users } from '../interfaces/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-results',
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  query: string = '';
  results: any[] = [];
  users: Users = JSON.parse(localStorage.getItem('loggedInUser') as string);
  constructor(private route: ActivatedRoute, private recipeService: RecipesService, private router:Router, private userService:UserService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      this.filterResults();
    });
  }

  filterResults() {
    this.recipeService.getRecipes().subscribe(recipes => {
      const q = this.query.toLowerCase();
      this.results = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(q) ||
        recipe.cuisine.toLowerCase().includes(q) ||
        recipe.category.toLowerCase().includes(q) ||
        (recipe.tags as string[])?.some((tag: string) => tag.toLowerCase().includes(q))
      );
    });
  }

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
}
