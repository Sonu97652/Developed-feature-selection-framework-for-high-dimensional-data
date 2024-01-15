import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

export interface FsModel {
  name: "Variance Threshold" | "Chi Squared" | "Mutual Information";
  selected: boolean;
  description: string;
  values: FsModelValue[];
}

export interface CModel {
  name: "Linear Regression";
  type: "regression" | "classification";
  selected: boolean;
  description: string;
  values: FsModelValue[];
}

interface FsModelValue {
  name: string;
  type: "range" | "number";
  range: number[];
  value: number;
}

interface Dataset {
  Name: string;
  Cols: string[];
  Rows: string;
  Head: [{[name:string]: string | number}];
}


@Component({
  selector: 'app-create-comp',
  templateUrl: './create-comp.component.html',
  styleUrls: ['./create-comp.component.css'],
})
export class CreateCompComponent implements OnInit {
  comparisonName="";
  
  datasets: Dataset[] = [];
  selectedDataset: Dataset | undefined;
  processing = 0;

  fsModels: FsModel[] = [
    {
      name: 'Variance Threshold',
      selected: false,
      description: `Feature selector that removes all low-variance features.
This feature selection algorithm looks only at the features (X), not the desired outputs (y), 
and can thus be used for unsupervised learning.`,
      values: [
        {
          name: 'Threshold',
          type: 'range',
          range: [0, 1, 0.01],
          value: 0.8,
        },
      ],
    },
    {
      name: 'Chi Squared',
      selected: false,
      description: `
Compute chi-squared stats between each non-negative feature and class.
This score can be used to select the n_features features with the highest values for the 
test chi-squared statistic from X, which must contain only non-negative features such as 
booleans or frequencies (e.g., term counts in document classification), relative to the classes.
Recall that the chi-square test measures dependence between stochastic variables, 
so using this function “weeds out” the features that are the most likely to be 
independent of class and therefore irrelevant for classification.`,
      values: [
        {
          name: "Top 'N' features to be selected",
          type: 'range',
          range: [0, 1, 1],
          value: 0.8,
        },
      ],
    },
    {
      name: 'Mutual Information',
      selected: false,
      description: `
Estimate mutual information for a discrete target variable.
Mutual information (MI) [1] between two random variables is a non-negative value, 
which measures the dependency between the variables. It is equal to zero if and only 
if two random variables are independent, and higher values mean higher dependency.      
The function relies on nonparametric methods based on entropy estimation from k-nearest 
neighbors distances as described in [2] and [3]. Both methods are based on the 
idea originally proposed in [4].`,
      values: [],
    },
  ];

  cModals: CModel[] = [
    {
      name: "Linear Regression",
      type: "regression",
      selected: true,
      description: '',
      values:[],
    }
  ]

  selectedCModals: CModel[] = [];

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  constructor(public ht: HttpService) {
    this.ht.$allDataSetInfo.subscribe((val) => {
      this.datasets = val;
      this.processing = -1;
    });
  }
  updateFsModel() {
    if(this.selectedDataset) {
      this.fsModels.forEach(model=>{
        if(model.name == 'Chi Squared' && this.selectedDataset?.Cols.length) {
          model.values[0].range = [1, this.selectedDataset?.Cols.length, 1];
        }
      });
    }
  }
  ngOnInit() {}

  drop(type: "feature"|"comparison"="feature", $event: CdkDragDrop<string[]>) {
    if(type=='feature')
      moveItemInArray(this.fsModels, $event.previousIndex, $event.currentIndex);
    else if(type == "comparison") {
      if($event.container === $event.previousContainer) {
        moveItemInArray(this.selectedCModals, $event.previousIndex, $event.currentIndex);
      } else {
        copyArrayItem(this.cModals, this.selectedCModals, $event.previousIndex, $event.currentIndex)
      }
    }
  }
  returnFalse() {
    return false;
  }
  
  result?: {cr?: any, sr1?: number, sr2?: number} = {};
  async createComparison() {
    this.processing = 1;
    const input = {
      dataset_name: this.selectedDataset?.Name,
      models: this.selectedCModals,
      preprocessors: this.fsModels.filter(f=>f.selected)
    };

    console.log(input);
    await this.ht.http.post<any>(this.ht.b + "/comparisions/cc/", input)
      .subscribe((cr)=>{
        console.log(cr);
        this.result = cr;
      })


  }

}
