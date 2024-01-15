import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
  b = environment.base;
  constructor(public http: HttpClient) {}

  $allDataSetInfo = new BehaviorSubject<any[]>([]);
  getAllDatasetInfo() {
    this.http.post<any[]>(this.b + '/data/', {}).subscribe(val=>{
      this.$allDataSetInfo.next(val);
    });
  }
}
