import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './pages/category/category.component';
import { authguardGuard } from './core/guards/authguard.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'categories',
        component:CategoryComponent,
        canActivate:[authguardGuard]
    }
];
