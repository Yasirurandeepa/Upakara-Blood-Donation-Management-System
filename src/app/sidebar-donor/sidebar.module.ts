import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarDonorComponent } from './sidebar-donor.component';

@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [ SidebarDonorComponent ],
  exports: [ SidebarDonorComponent ]
})

export class SidebarModule {}
