import { Routes } from '@angular/router';
import { ProductDetails } from './features/product-details/product-details';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { Cart } from './features/cart/cart';
import { Login } from './features/auth/login/login';
import {authGuard} from './core/guards/auth.guard';
import { Register }from './features/auth/register/register';
import { Wishlist }from './features/wishlist/wishlist';
import { Checkout }from './features/checkout/checkout';
import { Orders }from './features/orders/orders';
import { Profile }from './features/profile/profile';

import { AdminLayout }
from './admin/layouts/admin-layout/admin-layout';

import { DashboardHome }
from './admin/pages/dashboard-home/dashboard-home';

import { ProductsAdmin }
from './admin/pages/products-admin/products-admin';

import { OrdersAdmin }
from './admin/pages/orders-admin/orders-admin';
export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home
      },
      {
  path: 'shop',

  loadComponent: () =>

    import(
      './features/shop/shop'
    ).then(

      m => m.Shop

    )
},
       {
  path: 'product/:id',

  loadComponent: () =>

    import(
      './features/product-details/product-details'
    ).then(

      m => m.ProductDetails

    )
},
        {
          path: 'cart',
          component: Cart,
          canActivate: [authGuard]
            },
             {
             path: 'login',
             component: Login
              },
              {
               path: 'register',
               component: Register
                  },
                  {
                  path: 'wishlist',
                   component: Wishlist,
                 canActivate: [authGuard]
                },
                {
               path: 'checkout',
                component: Checkout,
               canActivate: [authGuard]
                 },
                 {
                path: 'orders',
                component: Orders,
                 canActivate: [authGuard]
                   },
                             {
                     path: 'profile',
                     component: Profile,
                    canActivate: [authGuard]
                      }
    ]
  },
 {
  path: 'admin',

  loadComponent: () =>
    import(
      './admin/layouts/admin-layout/admin-layout'
    ).then(m => m.AdminLayout),

  children: [

    {
      path: '',

      loadComponent: () =>
        import(
          './admin/pages/dashboard-home/dashboard-home'
        ).then(m => m.DashboardHome)
    },

    {
      path: 'products',

      loadComponent: () =>
        import(
          './admin/pages/products-admin/products-admin'
        ).then(m => m.ProductsAdmin)
    },

    {
      path: 'orders',

      loadComponent: () =>
        import(
          './admin/pages/orders-admin/orders-admin'
        ).then(m => m.OrdersAdmin)
    }

  ]
}]