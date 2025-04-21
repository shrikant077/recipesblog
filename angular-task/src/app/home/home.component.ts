import { Component } from '@angular/core';
import { FavCousineComponent } from '../fav-cousine/fav-cousine.component';
import { PopularComponent } from '../popular/popular.component';

@Component({
  selector: 'app-home',
  imports: [FavCousineComponent,PopularComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
