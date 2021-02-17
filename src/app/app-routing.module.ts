import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      canActivate: [AuthGuardService]
  },
  {
    path: 'actors',
    loadChildren: () => import('./actors/actors.module').then(t => t.ActorsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(t => t.CategoriesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'currencies',
    loadChildren: () => import('./currencies/currencies.module').then(t => t.CurrenciesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'directors',
    loadChildren: () => import('./directors/directors.module').then(t => t.DirectorsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'purchases',
    loadChildren: () => import('./purchases/purchases.module').then(r => r.PurchasesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'repertoire',
    loadChildren: () => import('./repertoire/repertoire.module').then(r => r.RepertoireModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'scenes',
    loadChildren: () => import('./scenes/scenes.module').then(s => s.ScenesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'shows',
    loadChildren: () => import('./shows/shows.module').then(s => s.ShowsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'theatres',
    loadChildren: () => import('./theatres/theatres.module').then(t => t.TheatresModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'email',
    loadChildren: () => import('./email/email.module').then(m => m.EmailModule)
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./booking/booking.module').then(m => m.BookingModule)
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./rooms/rooms.module').then(m => m.RoomModule)
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(m => m.DepartmentsModule)
  },
  {
    path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule)
  },
  {
    path: 'apps',
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'widget',
    loadChildren: () =>
      import('./widget/widget.module').then(m => m.WidgetModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.module').then(m => m.UiModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then(m => m.MediaModule)
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.module').then(m => m.ChartsModule)
  },
  {
    path: 'timeline',
    loadChildren: () =>
      import('./timeline/timeline.module').then(m => m.TimelineModule)
  },
  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        m => m.AuthenticationModule
      )
  },
  {
    path: 'extra-pages',
    loadChildren: () =>
      import('./extra-pages/extra-pages.module').then(m => m.ExtraPagesModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
