import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { em } from '@fullcalendar/core/internal-common';
import { ZService } from 'src/app/services/z.service';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi-meet',
  templateUrl: './jitsi-meet.component.html',
  styleUrls: ['./jitsi-meet.component.css']
})
export class JitsiMeetComponent implements OnInit, OnDestroy {

  @ViewChild('jitsiContainer', { static: true }) jitsiContainer!: ElementRef;
  // @Output() callEnded = new EventEmitter<void>();
  @Input("casID") casID!: string;
  @Input("roomName") roomName!: string;
  @Input("displayName") displayName!: string;
  @Input("email") email!: string;
  private api: any;

  joined: number = 0;
  domain: string = "meet.jit.si";
  options: any;

  constructor(private service: ZService) { }

  ngOnInit(): void {
    this.initializeJitsiMeet();
  }

  /*
  onCallEnd(): void {
    this.callEnded.emit();
  }
  */

  /*
  onCallEnd(): void {
    this.service.odrziCas(this.casID).subscribe();
  }
  */

  /*
    roomName = cas._id + ucenik + nastavnik
    ucenik/nastavnik se dobijaju iz "ulogovani"
  */

  initializeJitsiMeet(): void {
    this.options = {
      roomName: this.roomName,
      width: '100%',
      height: 700,
      parentNode: this.jitsiContainer.nativeElement,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'closedcaptions', 'fullscreen', 'e2ee',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
        ],
        SHOW_JITSI_WATERMARK: false,
      },
      configOverwrite: {
        startWithVideoMuted: true,
        prejoinPageEnabled: false
      },
      userInfo: {
        displayName: this.displayName,
        email: this.email
      }
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    /*
    this.api.addEventListener('videoConferenceJoined', () => {
      // ...
    });

    this.api.addEventListener('videoConferenceLeft', () => {
      // this.onCallEnd();
    });
    */
  }

  ngOnDestroy(): void {
    if (this.api) {
      this.api.dispose();
    }
  }

}
