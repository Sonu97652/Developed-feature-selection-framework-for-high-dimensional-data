import { Component, AfterViewInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private http: HttpService) {}
  ngAfterViewInit(): void {
      this.http.getAllDatasetInfo();
  }
}
