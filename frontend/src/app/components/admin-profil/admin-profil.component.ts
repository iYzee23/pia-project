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
import { Korisnik } from 'src/app/models/korisnik';


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

type ChartOptions3 = {
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

type ChartOptions4 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

type ChartOptions5 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

type ChartOptions6 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.css']
})
export class AdminProfilComponent implements OnInit {

  kor_ime: string = "";
  ime: string = "";
  prezime: string = "";
  email: string = "";
  telefon: string = "";

  @ViewChild("chart1") chart1!: ChartComponent;
  public chartOptions1!: Partial<ChartOptions1>;

  @ViewChild("chart2") chart2!: ChartComponent;
  public chartOptions2!: Partial<ChartOptions2>;

  @ViewChild("chart3") chart3!: ChartComponent;
  public chartOptions3!: Partial<ChartOptions3>;

  @ViewChild("chart4") chart4!: ChartComponent;
  public chartOptions4!: Partial<ChartOptions4>;

  @ViewChild("chart5") chart5!: ChartComponent;
  public chartOptions5!: Partial<ChartOptions5>;

  @ViewChild("chart6") chart6!: ChartComponent;
  public chartOptions6!: Partial<ChartOptions6>;

  g1_data: {
    naziv: string,
    br_nast: number
  }[] = [];

  g2_data: {
    naziv: string,
    broj: number
  }[] = [];

  g3_tmp_data: {
    nastavnik: string,
    br_casova: number[]
  }[] = [];

  g3_data: number[] = [];

  g4_data: {
    name: string,
    data: number[]
  }[] = [];

  g5_data: number[] = [];

  g6_data: number[] = [];

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    this.service.dohvKorisnika(this.kor_ime).subscribe(
      data => {
        this.ime = data.ime;
        this.prezime = data.prezime;
        this.email = data.email;
        this.telefon = data.telefon;
        this.g1();
        this.g2();
        this.g3();
        this.g4();
        this.g5();
        this.g6();
      }
    );
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
          data: (ind ? this.g1_data.map(item => item.br_nast) : [1])
        }
      ],
      chart: {
        type: "bar",
        height: 500
      },
      plotOptions: {
        bar: {
          horizontal: true,
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

  g3() {
    this.g3Fill(false);
    this.g3Init();
  }

  g3Fill(ind: boolean) {
    this.chartOptions3 = {
      series: [
        {
          name: "Prosecan broj casova",
          data: (ind ? this.g3_data : [7, 1, 2, 3, 4, 5, 6])
        }
      ],
      chart: {
        type: "bar",
        height: 500
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
        categories: ["Ned", "Pon", "Uto", "Sre", "Cet", "Pet", "Sub"]
      },
      yaxis: {
        title: {
          text: "Prosecan broj casova"
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

  g3Init() {
    this.service.dohvSveNastavnike().subscribe(
      nData => {
        let cntNast = nData.length;
        for (let nast of nData) {
          this.service.dohvBrojCasovaNastavnikDan2023(nast.kor_ime).subscribe(
            cData => {
              this.g3_tmp_data.push({
                nastavnik: nast.kor_ime,
                br_casova: cData
              });
              if (--cntNast === 0) {
                this.g3_data = [0, 0, 0, 0, 0, 0, 0];
                this.g3_tmp_data.forEach((item) => {
                  item.br_casova.forEach((casova, index) => {
                      this.g3_data[index] += casova;
                  });
                });
                this.g3_data = this.g3_data.map((total) => Math.round(total / this.g3_tmp_data.length * 100) / 100);
                this.g3Fill(true);
              }
            }
          );
        }
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
        height: 500,
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

  g5() {
    this.g5Fill(false);
    this.g5Init();
  }

  g5Fill(ind: boolean) {
    this.chartOptions5 = {
      series: [
        {
          name: "",
          data: (ind ? this.g5_data : [330, 200, 548])
        }
      ],
      chart: {
        type: "bar",
        height: 500
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: "80%",
          isFunnel: true
        }
      },
      colors: [
        "#F44F5E",
        "#B57BED",
        "#4BC3E6"
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        dropShadow: {
          enabled: true
        }
      },
      title: {
        text: "Broj casova na platformi",
        align: "center"
      },
      xaxis: {
        categories: [
          "Prihvaceni casovi",
          "Casovi u obradi",
          "Odbijeni casovi"
        ]
      },
      legend: {
        show: false
      }
    };
  }

  g5Init() {
    this.service.dohvSveCasove().subscribe(
      data => {
        this.g5_data.push(data.filter(item => item.status === "Prihvacen").length);
        this.g5_data.push(data.filter(item => item.status === "U obradi").length);
        this.g5_data.push(data.filter(item => item.status === "Odbijen").length);
        this.g5Fill(true);
      }
    );
  }

  g6() {
    this.g6Fill(false);
    this.g6Init();
  }

  g6Fill(ind: boolean) {
    this.chartOptions6 = {
      series: (ind ? [this.g6_data[0], this.g6_data[1]] : [45, 55]),
      chart: {
        height: 500,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Ukupno korisnika",
              formatter: (w) => {
                return (ind ? this.g6_data[2].toString() : "249");
              }
            }
          }
        }
      },
      labels: ["Bez profilne", "Sa profilnom"]
    };
  }

  g6Init() {
    this.service.dohvUkupanBrKorisnika().subscribe(
      uData => {
        this.service.dohvBrBezProfilne().subscribe(
          bData => {
            const bez = bData;
            const sa = uData - bData;
            const ukupno = uData;
            this.g6_data.push(Math.round((bez / ukupno) * 100));
            this.g6_data.push(Math.round((sa / ukupno) * 100));
            this.g6_data.push(ukupno);
            this.g6Fill(true);
          }
        );
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
