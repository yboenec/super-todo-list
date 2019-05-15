import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule {

}
