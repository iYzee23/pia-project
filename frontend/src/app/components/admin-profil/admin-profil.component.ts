import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZService } from 'src/app/services/z.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexGrid
} from "ng-apexcharts";


type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {

  @ViewChild("chart1") chart1!: ChartComponent;
  public chartOptions1!: Partial<ChartOptions1>;

  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions2!: Partial<ChartOptions2>;

  @ViewChild("chart4") chart4!: ChartComponent;
  public chartOptions4!: Partial<ChartOptions4>;

  g1_data: {
    naziv: string,
    br_nast: number
  }[] = [];

  g2_data: {
    naziv: string,
    broj: number
  }[] = [];

  g4_data: {
    name: string,
    data: number[]
  }[] = [];

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.g1();
    this.g2();
    this.g4();
  }

  g1() {
    this.g1Fill(false);
    this.g1Init();
  }

  g1Fill(ind: boolean) {
    this.chartOptions1 = {
      series: [
        {
          name: "Broj nastavnika",
          data: (ind ? this.g1_data.map(item => item.br_nast) : [0])
        }
      ],
      chart: {
        type: "bar",
        height: 400
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: (ind ? this.g1_data.map(item => item.naziv) : ["rand"])
      },
      yaxis: {
        title: {
          text: "Broj nastavnika"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val.toString();
          }
        }
      }
    };
  }

  g1Init() {
    this.service.dohvPredmete().subscribe(
      data => {
        const predmeti = data.map(item => item.naziv);
        let cntPredmeti = predmeti.length;
        for (let predm of predmeti) {
          this.service.dohvBrAngazovanihNastavnikaPredmet(predm).subscribe(
            pData => {
              this.g1_data.push({
                naziv: predm,
                br_nast: pData
              });
              if (--cntPredmeti === 0) {
                let cntUzrasti = 3;
                for (let uzr of ["Osnovna skola [1-4]", "Osnovna skola [5-8]", "Srednja skola"]) {
                  this.service.dohvBrAngazovanihNastavnikaUzrast(uzr).subscribe(
                    uData => {
                      this.g1_data.push({
                        naziv: uzr,
                        br_nast: uData
                      });
                      if (--cntUzrasti === 0) {
                        this.g1Fill(true);
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    );
  }

  g2() {
    this.g2Fill(false);
    this.g2Init();
  }

  g2Fill(ind: boolean) {
    this.chartOptions2 = {
      series: (ind ? this.g2_data.map(item => item.broj) : [1]),
      chart: {
        width: 500,
        type: "pie"
      },
      labels: (ind ? this.g2_data.map(item => item.naziv) : ["rand"]),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  g2Init() {
    this.service.dohvBrLjudiPol("Nastavnik", "Z").subscribe(
      data1 => {
        this.g2_data.push({
          naziv: "Zenski nastavnici",
          broj: data1
        });
        this.service.dohvBrLjudiPol("Ucenik", "Z").subscribe(
          data2 => {
            this.g2_data.push({
              naziv: "Zenski ucenici",
              broj: data2
            });
            this.service.dohvBrLjudiPol("Nastavnik", "M").subscribe(
              data3 => {
                this.g2_data.push({
                  naziv: "Muski nastavnici",
                  broj: data3
                });
                this.service.dohvBrLjudiPol("Ucenik", "M").subscribe(
                  data4 => {
                    this.g2_data.push({
                      naziv: "Muski ucenici",
                      broj: data4
                    });
                    this.g2Fill(true);
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  tidyG4() {
    this.g4_data.sort((a, b) => {
      const sumA = a.data.reduce((acc, curr) => acc + curr, 0);
      const sumB = b.data.reduce((acc, curr) => acc + curr, 0);
      return sumB - sumA;
    });

    if (this.g4_data.length > 10)
      this.g4_data = this.g4_data.slice(0, 10);
  }

  g4() {
    this.g4Fill(false);
    this.g4Init();
  }

  g4Fill(ind: boolean) {
    this.chartOptions4 = {
      series: (ind ? this.g4_data : [
        {
          name: "rand1",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 55, 72, 89]
        },
        {
          name: "rand2",
          data: [11, 32, 45, 52, 11, 23, 33, 42, 12, 88, 90, 91]
        }
      ]),
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Broj casova po mesecima za 10 najangazovanijih nastavnika u 2023",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Maj",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dec"
        ]
      }
    };
  }

  g4Init() {
    this.service.dohvSveNastavnike().subscribe(
      data => {
        let cntNastavnici = data.length;
        for (let nast of data) {
          this.service.dohvBrojCasovaNastavnikMesec2023(nast.kor_ime).subscribe(
            nData => {
              this.g4_data.push({
                name: nast.ime + " " + nast.prezime + " [" + nast.kor_ime + "]",
                data: nData
              });
              if (--cntNastavnici === 0) {
                this.tidyG4();
                this.g4Fill(true);
              }
            }
          );
        }
      }
    );
  }

}
