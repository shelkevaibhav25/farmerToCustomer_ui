import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CategoryComponent } from './pages/category/category.component';
import { authguardGuard } from './core/guards/authguard.guard';
import { MasterComponent } from './pages/master/master.component';
import { FarmerProductComponent } from './pages/farmer-product/farmer-product.component';
import { ProductMasterComponent } from './pages/product-master/product-master.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

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
    },
    {
        path:'master',
        component:MasterComponent,
        canActivate:[authguardGuard]
    },
    {
        path:'product',
        component:FarmerProductComponent,
        canActivate:[authguardGuard]
    },
    {
        path:'product-master',
        component:ProductMasterComponent,
        canActivate:[authguardGuard]
    },
    {
        path:'checkout',
        component:CheckoutComponent,
        canActivate:[authguardGuard]
    }
];
