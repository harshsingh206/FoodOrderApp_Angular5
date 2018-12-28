import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' }
];

export const AppRouting = RouterModule.forRoot(appRoutes, { 
//   useHash: true,
//   preloadingStrategy: PreloadAllModules
});