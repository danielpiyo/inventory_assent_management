import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EquipementService } from 'src/app/_service/equipement.service';
import { UserToken } from 'src/app/_model/user';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Settings } from 'src/app/shared/setting.model';
import { AppSettings } from 'src/app/shared/app.setting';

export interface StationEquipements {
  equipement_id: number;
  equipement_name: string;
  equipement_type: string;
  equipement_brand: string;
  equipement_serial: string;
  details: string;
  status: string;
  allocated_to: string;
  to_repair_yn: string;
  company_repair: string;
  damaged_yn: string;
  damaged_yes_by: string;
  department_name: string;
  section_name: string;
  station_name: string;
}
// equipements
export interface Equipements {
  equipement_id: number;
  category_name: string;
  equipement_name: string;
  equipement_brand: string;
  equipement_type: string;
  equipement_serial: string;
  details: string;
  created_by: string;
  status: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  userToken: UserToken = new UserToken();
  allStationEquip: [];
  station = false;
  department = false;
  stationSubscription: Subscription;
  categoryData: any;
  category = true;
  categorySubscription: Subscription;
  allCategories: any;
  availableCategories: any;
  categoryTotals: any;
  equipement = false;
  allEquipements: [];
  equipementSubscription: Subscription;
  // /category + chart
  public categoryDataChart: any[];
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public settings: Settings;



  public displayedColumns = ['No', 'Station', 'Department', 'Equipement', 'AllocatedTo', 'Status'];
  public displayedColumnsDepartment = ['No', 'Department', 'Section', 'Equipement', 'AllocatedTo', 'Status'];

  public dataSource = new MatTableDataSource<StationEquipements>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    public displayedColumnsEquipements = ['number', 'Category', 'Name', 'Brand', 'Type', 'Sereals', 'Details', 'Status'];

  public dataSourceEquipements = new MatTableDataSource<Equipements>();

    @ViewChild(MatSort, { static: true }) Eqsort: MatSort;
    @ViewChild(MatPaginator, { static: true }) Eqpaginator: MatPaginator;

  constructor(private reoprtService: EquipementService, public appSettings: AppSettings) {
    this.userToken.token = JSON.parse(localStorage.getItem('currentToken'));
    this.getCategoryReport();
    this.settings = this.appSettings.settings;
   }

  ngOnInit() {
    this.getStationEquipemnt();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceEquipements.paginator = this.Eqpaginator;
    this.dataSourceEquipements.sort = this.Eqsort;
    this.getEquipements();
    // Object.assign(this.categoryDataChart);
  }

  getStationEquipemnt() {
    this.stationSubscription = this.reoprtService.getStationEquip(this.userToken)
      .subscribe((res: []) => {
        this.allStationEquip = res;
        this.dataSource.data = this.allStationEquip as StationEquipements[];
      }, error => {
        console.log('StationErr', error);
      });
  }
// go to station
goTostation() {
  this.department = false;
  this.station = true;
  this.category = false;
  this.equipement = false;

}
  // department
  goTodepartment() {
    this.department = true;
    this.station = false;
    this.category = false;
    this.equipement = false;

  }

  // filter for search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // category
  getCategoryReport() {
    this.categorySubscription = this.reoprtService.getCategoryReport(this.userToken)
    .subscribe((res: []) => {
      this.allCategories = res;
      this.categoryDataChart =  res;
      // this.allCategories.forEach(element => {
      //   this.availableCategories = element.name;
      //   this.categoryTotals = element.value;
      //   console.log(this.allCategories);
      //   console.log(this.availableCategories);
      //   console.log( this.categoryTotals );
        // this.chart();
      // });
    }, error => {
      console.log('categoryErrr', error);
    });
  }
    categoryReport() {
      this.category = true;
      this.station = false;
      this.department = false;
      this.equipement = false;
    }

// chart() {
//   this.categoryDataChart = [
//     {
//       name: this.availableCategories,
//       value: this.categoryTotals
//     },
//   ];
// }
    // tslint:disable-next-line: member-ordering

    public onSelect(event) {
      console.log(event);
    }
    // equipments
getEquipements() {
    this.equipementSubscription =  this.reoprtService.getAllEquipements(this.userToken)
      .subscribe((response: []) => {
        this.allEquipements = response;
        this.dataSourceEquipements.data = this.allEquipements as Equipements[];
      });
    }
  // filter for search
applyFilterEq(filterValue: string) {
      this.dataSourceEquipements.filter = filterValue.trim().toLowerCase();
    }

    // getEquipments
getEquip() {
      this.category = false;
      this.station = false;
      this.department = false;
      this.equipement = true;
    }

    // destroy subscriptions
    // tslint:disable-next-line: use-lifecycle-interface
ngOnDestroy() {
      if (this.categorySubscription) {
        this.categorySubscription.unsubscribe();
      }
      if (this.stationSubscription) {
        this.stationSubscription.unsubscribe();
      }
      if (this.equipementSubscription) {
        this.equipementSubscription.unsubscribe();
      }
    }
}
export const single1 = [
  {
    name: 'Germany',
    value: 40632
  },
  {
    name: 'United States',
    value: 49737
  },
  {
    name: 'France',
    value: 36745
  },
  {
    name: 'United Kingdom',
    value: 36240
  },
  {
    name: 'Spain',
    value: 33000
  },
  {
    name: 'Italy',
    value: 35800
  }
];
