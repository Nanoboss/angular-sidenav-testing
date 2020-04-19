import { MatGridListModule } from "@angular/material/grid-list";
import { from } from "rxjs";
import { NgModule } from "@angular/core";

import { MatBadgeModule } from "@angular/material/badge";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";

import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { FormsModule } from "@angular/forms";

import { MatSidenavModule } from "@angular/material/sidenav";

import { MatIconModule } from "@angular/material/icon";

import { MatButtonModule } from "@angular/material/button";

import { MatMenuModule } from "@angular/material/menu";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatBadgeModule
  ],

  exports: [
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatBadgeModule
  ]
})
export class MyMaterialModule {}
