import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import RecipeService from '../recipes/recipe.service';
import { isNil } from '../shared/app.utilities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userTokenSubscription: Subscription | undefined;
  public isAuthenticated: boolean = false;
  public collapsed: boolean = true;

  constructor(private readonly authService: AuthService,
    private readonly recipeService : RecipeService) { }

  ngOnInit(): void {
    this.userTokenSubscription = this.authService.userSubject.subscribe((value) => {
      this.isAuthenticated = !isNil(value);
    });
  }

  ngOnDestroy(): void {
    this.userTokenSubscription?.unsubscribe();
  }

  onFetchData() {
    this.recipeService.fetchItems().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.recipeService.storeItems().subscribe();
  }
}
