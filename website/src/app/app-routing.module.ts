import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SectionComponent } from './components/section/section.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'section/:id', component: SectionComponent },
  { path: 'item/:id', component: ContentDetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
      useHash: false,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
