import { AdminGuard } from './guards/admin/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
  { path: "admin", loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
