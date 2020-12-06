import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'actors',
    loadChildren: () => import('./actors/actors.module').then(t => t.ActorsModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(t => t.CategoriesModule)
  },
  {
    path: 'currencies',
    loadChildren: () => import('./currencies/currencies.module').then(t => t.CurrenciesModule)
  },
  {
    path: 'directors',
    loadChildren: () => import('./directors/directors.module').then(t => t.DirectorsModule)
  },
  {
    path: 'purchases',
    loadChildren: () => import('./purchases/purchases.module').then(r => r.PurchasesModule)
  },
  {
    path: 'repertoire',
    loadChildren: () => import('./repertoire/repertoire.module').then(r => r.RepertoireModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'scenes',
    loadChildren: () => import('./scenes/scenes.module').then(s => s.ScenesModule)
  },
  {
    path: 'shows',
    loadChildren: () => import('./shows/shows.module').then(s => s.ShowsModule)
  },
  {
    path: 'theatres',
    loadChildren: () => import('./theatres/theatres.module').then(t => t.TheatresModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
