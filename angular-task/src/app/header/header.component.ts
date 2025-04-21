import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { SidebarComponent } from '../sidebar/sidebar.component';
import { Users } from '../interfaces/users';
import { SharedService } from '../services/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router, private sharedService: SharedService){}

  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchQuery.trim()) {
      this.search.emit(this.searchQuery.trim());
    }
  }

  imgUploaded=false;
  hammenu=false;
  user:Users=JSON.parse(localStorage.getItem('loggedInUser') as string);
  toggleLog(){
    document.getElementById('log')?.classList.toggle('hidden');
  }
  

  toggleMenu(){
    this.hammenu=!this.hammenu;
  }
  
  loggedInUser: any = null;

ngOnInit() {
  const userData = localStorage.getItem('loggedInUser');
  if (userData) {
    this.loggedInUser = JSON.parse(userData);
  }
}

logout() {
  localStorage.removeItem('loggedInUser');
  this.loggedInUser = null;
  this.router.navigate(['/']);
}

preference(){
  this.router.navigate(['/']);
    this.sharedService.emitPreferenceClick();
}
}
