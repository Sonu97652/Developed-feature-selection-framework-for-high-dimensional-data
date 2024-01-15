import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-data-sets',
  templateUrl: './data-sets.component.html',
  styleUrls: ['./data-sets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DataSetsComponent implements OnInit {

  datasets : any[] = [];
  columnsToDisplay = ['Name', 'Cols', 'Rows'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  constructor(public ht: HttpService) {
    this.ht.$allDataSetInfo.subscribe(val=>{
      this.datasets = val;
      this.processing = -1;
    });
  }

  ngOnInit() {
  }

  processing = 0;
  
  toySearch(name: string) {
    this.ht.http.post<any>(this.ht.b + '/data/toy/', {name}).subscribe(val=>this.ht.getAllDatasetInfo());
  }

  fileSelected($event: any) {
    // console.log($event);
    let files : File[] = $event.target.files;
    console.log(files[0].name);
    return files;
  }

}
