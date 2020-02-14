import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService, AlertService } from './_service';
import { AlertComponent } from './_directives';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { StationComponent, NewStationModal } from './components/admin/station/station.component';
import { StationService } from './_service/station.service';
import { DepartmentComponent, NewDepartmentModal } from './components/admin/department/department.component';
import { DepartmentService } from './_service/department.service';
import { SectionComponent, NewSectionModal } from './components/admin/section/section.component';
import { SectionService } from './_service/section.service';
import { CategoriesComponent, NewCategoryModal } from './components/admin/categories/categories.component';
import { CategoriesService } from './_service/categories.service';
import { EquipementComponent, NewEquipementModal } from './components/admin/equipement/equipement.component';
import { EquipementService } from './_service/equipement.service';
import { UsersComponent } from './components/admin/users/users.component';
import { UsersService } from './_service/users.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// tslint:disable-next-line: import-spacing
import { EquipementAllocatedComponent, RepairEquipementModal }
          from './components/admin/equipement/equipement-allocated/equipement-allocated.component';
import { EquipementStoreComponent } from './components/admin/equipement/equipement-store/equipement-store.component';
import { EquipementRepaireComponent } from './components/admin/equipement/equipement-repaire/equipement-repaire.component';
import { UserHomeComponent } from './components/users/user-home/user-home.component';
import { UserRequestComponent } from './components/users/user-request/user-request.component';
import { UserDashboardComponent } from './components/users/user-dashboard/user-dashboard.component';
import { UserGuard } from './_guard/user.guard';
import { AdminGuard } from './_guard/admin.guard';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AppSettings } from './shared/app.setting';
import { LogsTrackComponent } from './components/admin/logs-track/logs-track.component';
import { AdvancedCategoryComponent } from './components/admin/advanced-category/advanced-category.component';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service



@NgModule({
  declarations: [
    AppComponent, LoginComponent, AlertComponent,
    DashboardComponent, AdminHomeComponent, StationComponent,
    DepartmentComponent, SectionComponent, CategoriesComponent,
    EquipementComponent, UsersComponent, EquipementAllocatedComponent,
    EquipementStoreComponent, EquipementRepaireComponent, NewCategoryModal,
    NewStationModal, NewDepartmentModal, NewSectionModal, NewEquipementModal,
    RepairEquipementModal,
    UserHomeComponent,
    UserRequestComponent, UserDashboardComponent, ReportsComponent, LogsTrackComponent, AdvancedCategoryComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule, PanelMenuModule,
    routing, MaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule,
    ToastModule, MessagesModule, MessageModule, ChartModule, NgScrollbarModule, NgxChartsModule
  ],
  entryComponents: [NewCategoryModal, NewStationModal, NewDepartmentModal,
                    NewSectionModal, NewEquipementModal, RepairEquipementModal],
  providers: [LoginService, AlertService, MessageService, BnNgIdleService,
              StationService, DepartmentService, SectionService,
              CategoriesService, EquipementService, UsersService, UserGuard, AdminGuard, AppSettings],
  bootstrap: [AppComponent]
})
export class AppModule { }
