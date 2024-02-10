import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import { Cas } from 'src/app/models/cas';
import { ZService } from 'src/app/services/z.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-nastavnik-casovi',
  templateUrl: './nastavnik-casovi.component.html',
  styleUrls: ['./nastavnik-casovi.component.css']
})
export class NastavnikCasoviComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  initialEvents: any[] = [
    {
      daysOfWeek: [ 1, 2, 3, 4, 5 ],
      startTime: '00:00',
      endTime: '10:00',
      rendering: 'background',
      color: 'red'
    },
    {
      daysOfWeek: [ 1, 2, 3, 4, 5 ],
      startTime: '18:00',
      endTime: '23:59',
      rendering: 'background',
      color: 'red'
    },
    {
      daysOfWeek: [ 0, 6 ],
      startTime: '00:00',
      endTime: '23:59',
      rendering: 'background',
      color: 'red'
    }
  ];

  kor_ime: string = "";
  potvr_casovi: Cas[] = [];
  potvr_casovi_5: Cas[] = [];
  potvr_casovi_10: Cas[] = [];
  potvr_casovi_svi: Cas[] = [];
  showJitsiMeet: boolean = false;
  roomName: string = "";
  displayName: string = "";
  email: string = "";
  poruka: string = "";
  u_obradi_casovi: Cas[] = [];

  datum_vreme_start: string = "";
  datum_vreme_kraj: string = "";
  datum_vreme_start_forma: string = "";
  datum_vreme_kraj_forma: string = "";

  constructor(private service: ZService, private router: Router) {}

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem("ulogovani")!;
    const sadDatum = new Date();
    sadDatum.setTime(sadDatum.getTime() + 3600000);
    this.initialEvents = [
      {
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '00:00',
        endTime: '10:00',
        rendering: 'background',
        color: 'red'
      },
      {
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '18:00',
        endTime: '23:59',
        rendering: 'background',
        color: 'red'
      },
      {
        daysOfWeek: [ 0, 6 ],
        startTime: '00:00',
        endTime: '23:59',
        rendering: 'background',
        color: 'red'
      }
    ];

    this.service.dohvSveCasoveVremenskiPeriod(this.kor_ime, 3).subscribe(
      data => {
        for (let cas of data) {
          const msDiff = (new Date(cas.datum_vreme_start).getTime()) - sadDatum.getTime();
          cas.ucionicaDisabled = (msDiff > 15 * 60 * 1000);
          // cas.ucionicaDisabled = (msDiff > 7 * 24 * 60 * 60 * 1000);
          cas.otkazivanjeDisabled = (msDiff < 4 * 60 * 60 * 1000);
        }
        this.potvr_casovi_svi = data;
        this.potvr_casovi_5 = data.slice(0, 5);
        this.potvr_casovi_10 = data.slice(0, 10);
        this.prikazi5Casova();
        this.handleCasUcenik(this.potvr_casovi);
        this.service.dohvNastavnika(this.kor_ime).subscribe(
          data1 => {
            for (let nedost of data1.nedostupnost) {
              const [start, end] = nedost.split("###").map(elem => elem.slice(0, -1));
              this.initialEvents.push({
                start: start,
                end: end,
                rendering: 'background',
                color: 'red'
              });
            }
            this.service.dohvCasoveNastavnika(this.kor_ime).subscribe(
              data2 => {
                for (let cas of data2) {
                  if (cas.status === "Odbijen") continue;
                  const tStart = cas.datum_vreme_start.slice(0, -1);
                  const tEnd = cas.datum_vreme_kraj.slice(0, -1);
                  const color = cas.status === "Prihvacen" ? 'green' : 'orange';
                  this.initialEvents.push({
                    start: tStart,
                    end: tEnd,
                    rendering: "background",
                    color: color
                  });
                }
                this.service.dohvCasoveNastavnika(this.kor_ime).subscribe(
                  data3 => {
                    this.fetchEvents();
                    this.u_obradi_casovi = data3.filter(item => item.status === "U obradi");
                    this.handleCasUcenik(this.u_obradi_casovi);
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  handleCasUcenik(niz: Cas[]) {
    for (let cas of niz) {
      this.service.dohvKorisnika(cas.ucenik).subscribe(
        data => {
          cas.uIme = data.ime;
          cas.uPrezime = data.prezime;
          this.service.dohvUcenika(cas.ucenik).subscribe(
            tData => {
              cas.uBrOcena = tData.br_ocena;
              cas.uProsecnaOcena = tData.ocena;
            }
          );
        }
      );
    }
  }

  proveriCasTekst(tekst: string) {
    return tekst === null || tekst === "";
  }

  pokreniUcionicu(cas: Cas): void {
    this.service.dohvKorisnika(cas.ucenik).subscribe(
      data => {
        this.roomName = cas._id + cas.ucenik + this.kor_ime;
        this.displayName = data.ime + " " + data.prezime;
        this.email = data.email;
        this.showJitsiMeet = !this.showJitsiMeet;
      }
    );
  }

  potvrdiCas(cas: Cas) {
    this.service.potvrdiCas(cas._id).subscribe(
      data => {
        this.service.kreirajObavestenje(cas._id, "Cas je potvrdjen.").subscribe(
          tData => {
            this.ngOnInit();
          }
        );
      }
    );
  }

  otkaziCas(cas: Cas) {
    this.service.odbijCas(cas._id, cas.tekst).subscribe(
      data => {
        this.service.kreirajObavestenje(cas._id, "Cas je otkazan. Razlog: " + cas.tekst).subscribe(
          tData => {
            this.ngOnInit();
          }
        );
      }
    );
  }

  prikazi5Casova() {
    this.potvr_casovi = this.potvr_casovi_5;
  }

  prikazi10Casova() {
    this.potvr_casovi = this.potvr_casovi_10;
  }

  prikaziSveCasove() {
    this.potvr_casovi = this.potvr_casovi_svi;
  }

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      timeGridPlugin,
      dayGridPlugin,
      listPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,listWeek'
    },
    initialView: 'timeGridWeek',
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: false,
    locale: 'sr-latn',
    buttonText: {
      today: 'Danas',
      month: 'Mesec',
      week: 'Nedelja',
      day: 'Dan',
      list: 'Lista'
    },
    select: this.handleDateSelect.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    businessHours: [
      {
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '10:00',
        endTime: '18:00'
      }
    ],
    events: this.initialEvents
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    this.datum_vreme_start = selectInfo.startStr.slice(0, 16) + "Z";
    this.datum_vreme_kraj = selectInfo.endStr.slice(0, 16) + "Z";
    calendarApi.addEvent({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    this.freezeCalendar();
  }

  fetchEvents() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('selectable', true);
    calendarApi.removeAllEvents();
    calendarApi.addEventSource(this.initialEvents);
  }

  freezeCalendar() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('selectable', false);
  }

  proveriNedostupnost() {
    return this.datum_vreme_start_forma === "" || this.datum_vreme_kraj_forma === "";
  }

  proveriNedostupnostExt() {
    return this.datum_vreme_start === "" || this.datum_vreme_kraj === "";
  }

  dodajNedostupnost() {
    this.service.dodajNedostupnost(this.kor_ime, this.datum_vreme_start_forma, this.datum_vreme_kraj_forma).subscribe(
      data => {
        if (data.msg !== "OK") {
          this.poruka = data.msg;
          this.fetchEvents();
        }
        else {
          this.poruka = "Uspesno ste dodali nedostupnost.";
          this.ngOnInit();
        }
      }
    );
  }

  dodajNedostupnostExt() {
    this.service.dodajNedostupnostExt(this.kor_ime, this.datum_vreme_start, this.datum_vreme_kraj).subscribe(
      data => {
        if (data.msg !== "OK") {
          this.poruka = data.msg;
          this.fetchEvents();
        }
        else {
          this.poruka = "Uspesno ste dodali nedostupnost.";
          this.ngOnInit();
        }
      }
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["neregistrovani"]);
  }

}
