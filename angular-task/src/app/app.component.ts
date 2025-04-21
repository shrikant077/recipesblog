import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'angular-task';
  hammenu:boolean|undefined;
  loginclick:boolean|undefined;
  registerclick:boolean|undefined;
  
  menuStatus(status:boolean){
    this.hammenu=status;
  }
  handleLogin(status:boolean){
    this.loginclick=status;
  }
  handleRegister(status:boolean){
    this.registerclick=status;
  }

  onSearchReceived(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
