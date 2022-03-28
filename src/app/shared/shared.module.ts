import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import AuthGuard from '../auth/auth.guard';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { ToggleClassClickDirective } from './directives/toggle-class-click.directive';
import CanDeactivateGuard from './guards/can-deactivate.guard';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { UrlEncodePipe } from './pipes/url-encode.pipe';

@NgModule({
    declarations: [
        PlaceholderDirective,
        ToggleClassClickDirective,
        UrlEncodePipe,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        PlaceholderDirective,
        ToggleClassClickDirective,
        UrlEncodePipe,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    providers: [
        AuthGuard,
        CanDeactivateGuard
    ]
})
export class SharedModule {}