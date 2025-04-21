import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { PublishedComponent } from './published/published.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { RecipepageComponent } from './recipepage/recipepage.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'user/:userid/addrecipe', component: AddRecipeComponent},
    {path:'user/:userid/myrecipes', component: PublishedComponent},
    {path:'user/:userid/favorites',component: FavoritesComponent},
    {path:'user/:userid/profile',component: ProfileComponent},
    {path:'user/:userid/recommended',component: RecommendedComponent},
    {path:':recipeid/:title', component:RecipepageComponent},
    {path:'user/:userid/:recipeid/editrecipe', component:EditrecipeComponent},
    { path: 'search', component: SearchResultsComponent }

];
