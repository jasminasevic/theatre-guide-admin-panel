import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { ContactGridComponent } from './contact-grid/contact-grid.component';
import { SupportComponent } from './support/support.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ContactsComponent } from './contacts/contacts.component';
const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'contact-grid',
    component: ContactGridComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'dragdrop',
    component: DragDropComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
