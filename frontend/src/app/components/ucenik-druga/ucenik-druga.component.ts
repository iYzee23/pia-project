import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ZService } from 'src/app/services/z.service';
import { Location } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-ucenik-druga',
  templateUrl: './ucenik-druga.component.html',
  styleUrls: ['./ucenik-druga.component.css']
})
export class UcenikDrugaComponent implements OnInit {

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

  ucenik: string = "";
  nastavnik: string = "";
  izabr_predmet: string = "";
  datum_vreme_start: string = "";
  datum_vreme_kraj: string = "";
  kratak_opis: string = "";
  poruka: string = "";
  predmeti: string[] = [];

  constructor(private service: ZService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.ucenik = localStorage.getItem("ulogovani")!;
    this.nastavnik = localStorage.getItem("nastavnik")!;
    this.service.dohvNastavnika(this.nastavnik).subscribe(
      data1 => {
        this.predmeti = data1.predmeti;
        if (this.predmeti.length === 1)
          this.izabr_predmet = this.predmeti[0];
        for (let nedost of data1.nedostupnost) {
          const [start, end] = nedost.split("###").map(elem => elem.slice(0, -1));
          this.initialEvents.push({
            start: start,
            end: end,
            rendering: 'background',
            color: 'red'
          });
        }
        this.service.dohvCasoveNastavnika(this.nastavnik).subscribe(
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
            this.fetchEvents();
          }
        );

      }
    );
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

  back() {
    this.location.back();
  }

  zakaziCas() {
    if (this.izabr_predmet === "") this.poruka = "Morate izabrati predmet.";
    else if (this.datum_vreme_start === "") this.poruka = "Morate izabrati datum i vreme.";
    else if (this.datum_vreme_kraj === "") this.poruka = "Morate izabrati datum i vreme.";
    else if (this.kratak_opis === "") this.poruka = "Morate uneti kratak opis casa.";
    else {
      this.service.zakaziCasExt(this.ucenik, this.nastavnik, this.izabr_predmet, this.datum_vreme_start, this.datum_vreme_kraj, this.kratak_opis).subscribe(
        data => {
          if (data.msg !== "OK") {
            this.poruka = data.msg;
            this.fetchEvents();
          }
          else this.poruka = "Uspesno ste zakazali cas!";
        }
      );
    }
  }

}
