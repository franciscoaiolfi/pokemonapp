import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path:'',
  loadComponent: () => 
    import('./pages/home/home.page').then((m) => m.HomePage)
},
{
  path:'pokemon/:name',
  loadComponent: () => 
    import('./pages/details/details.page').then((m) => m.DetailsPage)
}
];
