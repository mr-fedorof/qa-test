import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, EMPTY, Subject, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public panelOpen = false;
  public updating = false;
  public loading = false;
  public alertOpen = false;

  public alertOpenSubject: Subject<boolean> = new Subject();
  public loadDataSubject: Subject<boolean> = new Subject();

  public items = [
    {
      name: 'Lamborghini Diablo',
      value: 'LAMBORGHINI_DIABLO'
    },
    {
      name: 'Ford Raptor',
      value: 'FORD_RAPTOR'
    },
    {
      name: 'Ferrari Testarossa',
      value: 'FERRARI_TESTAROSSA'
    },
    {
      name: 'Porsche 911 Carrera',
      value: 'PORSCHE_911_CARRERA'
    },
    {
      name: 'Jensen Interceptor',
      value: 'JENSEN_INTERCEPTOR'
    },
    {
      name: 'Lamborghini Huracán',
      value: 'LAMBORGHINI_HURACÁN'
    },
    {
      name: 'Ferrari 812 Superfast',
      value: 'FERRARI_812_SUPERFAST'
    },
    {
      name: 'Jeep Gladiator',
      value: 'JEEP_GLADIATOR'
    },
    {
      name: 'Land Rover Defender',
      value: 'LAND_ROVER_DEFENDER'
    },
    {
      name: 'Rolls Royce Wraith',
      value: 'ROLLS_ROYCE_WRAITH'
    },
    {
      name: 'Suzuki Samurai',
      value: 'SUZUKI_SAMURAI'
    },
    {
      name: 'Volkswagen Beetle',
      value: 'VOLKSWAGEN_BEETLE'
    },
    {
      name: 'Dodge Viper',
      value: 'DODGE_VIPER'
    },
    {
      name: 'McLaren Senna',
      value: 'MCLAREN_SENNA'
    },
    {
      name: 'Ford Cortina',
      value: 'FORD_CORTINA'
    },
    {
      name: 'Chevrolet Tornado',
      value: 'CHEVROLET_TORNADO'
    },
    {
      name: 'Ford Lobo',
      value: 'FORD_LOBO'
    },
    {
      name: 'Seat Tarraco',
      value: 'SEAT_TARRACO'
    }
  ];

  public content = '<p>Content...</p>';

  public onInsertItemClick(itemValue: any) {
    this.content += `<p>Inserted ${itemValue} [CONTENT]</p>`;
  }

  public onUpdateReportPanelButtonClick() {
    this.panelOpen = true;
    this.loadData(true);
  }

  public onReportPanelCloseButtonClick() {
    this.panelOpen = false;
  }

  public onFullUpdateButtonClick() {
    this.updating = true;

    timer(5000).subscribe(() => {
      this.updating = false;
      this.showAlert(true);
    })
  }

  public showAlert(value: boolean) {
    this.alertOpenSubject.next(value);
  }

  public loadData(value: boolean) {
    this.loadDataSubject.next(value);
  }

  ngOnInit() {
    this.alertOpenSubject
      .pipe(
        switchMap((value: any) => {
          this.alertOpen = value;

          return value
            ? timer(2000).pipe(
                tap(() => {
                  this.alertOpen = false;
                })
              )
            : EMPTY;
        })
      )
      .subscribe();

    this.loadDataSubject
      .pipe(
        switchMap((value: any) => {
          this.loading = value;

          return value
            ? timer(5000).pipe(
              tap(() => {
                this.loading = false;
              })
            )
            : EMPTY;
        })
      )
      .subscribe();
  }
}
