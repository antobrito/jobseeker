import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListjobsComponent } from './components/listjobs/listjobs.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { InsertupdatejobComponent } from './components/insertupdatejob/insertupdatejob.component';

const routes: Routes = [
  {path: '',redirectTo:'maipage',pathMatch:'full'},
  {path: 'maipage',component:MainpageComponent},
  {path: 'listjobs',component:ListjobsComponent},
  {path: 'createJob',component:InsertupdatejobComponent},
  {path: 'updateJob/:id',component:InsertupdatejobComponent},
  {path: '**',redirectTo:'mainpage',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
