import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interno',
  templateUrl: './interno.component.html',
  styleUrls: ['./interno.component.css']
})
export class InternoComponent implements OnInit {

  public chartAreaOptions:any = {
    xkey: 'period',
    ykeys: ['iphone', 'ipad', 'itouch'],
    labels: ['iPhone', 'iPad', 'iPod Touch'],
    pointSize: 3,
    fillOpacity: 0,
    behaveLikeLine: true,
    resize: true,
    gridLineColor: '#e0e0e0',
    lineWidth: 3,
    lineColors: ['#888', '#e20b0b', '#f1c411'],
  };

  public chartAreaData = 
    [
      { period: '2010', iphone: 50, ipad: 80, itouch: 20}, 
      { period: '2011', iphone: 130, ipad: 100, itouch: 80}, 
      { period: '2012', iphone: 80, ipad: 60, itouch: 70}, 
      { period: '2013', iphone: 70, ipad: 200, itouch: 140}, 
      { period: '2014', iphone: 180, ipad: 150, itouch: 140}, 
      { period: '2015', iphone: 105, ipad: 100, itouch: 80}, 
      { period: '2016', iphone: 250, ipad: 150, itouch: 200}
    ];

    public chartAreaOptions2 = {
      xkey: 'period', 
      ykeys: ['SiteA', 'SiteB'], 
      labels: ['Site A', 'Site B'], 
      pointSize: 0, 
      fillOpacity: 0.4, 
      
      lineColors: ['#b4becb', '#01c0c8'], 
      behaveLikeLine: true, 
      gridLineColor: '#e0e0e0', 
      lineWidth: 0, 
      smooth: false, 

      resize: true, 
    }; 

    public chartAreaData2: Array<any>;
  constructor() { 
    this.chartAreaData2 = 
    [
      {period: '2010', SiteA: 0, SiteB: 0, }, 
      {period: '2011', SiteA: 130, SiteB: 100, }, 
      {period: '2012', SiteA: 80, SiteB: 60, }, 
      {period: '2013', SiteA: 70, SiteB: 200, }, 
      {period: '2014', SiteA: 180, SiteB: 150, }, 
      {period: '2015', SiteA: 105, SiteB: 90, }
    , {
            period: '2016'
            , SiteA: 250
            , SiteB: 150
    , }
    ];
  }

  ngOnInit(): void {

  }


}
