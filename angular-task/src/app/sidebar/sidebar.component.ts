
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user:Users=JSON.parse(localStorage.getItem('loggedInUser') as string);
}
