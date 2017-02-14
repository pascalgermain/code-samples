import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { config } from './app.config';
import { AppState } from './app.state';
import { ApiService, Data, Episode, Bonus } from '../shared/services/api';
import { EpisodesComponent } from '../pages/episodes/episodes.component';
import { GuestsComponent } from '../pages/guests/guests.component';
import { BonusesComponent } from '../pages/bonuses/bonuses.component';
import { LiveComponent } from '../pages/live/live.component';
import { Page } from './app.types';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;

  pages: Page[];
  root: any = EpisodesComponent;
  audioTracks: any[];
  error: any;

  constructor(public platform: Platform, public state: AppState, public api: ApiService) {
    this.initializeApp();

    const pages: Page[] = [
      {icon: 'microphone', title: 'Episodes', component: EpisodesComponent},
      {icon: 'people', title: 'Invités', component: GuestsComponent}
    ];
    if (platform.is('mobile')) {
      const bonusPage = {icon: 'sad', title: 'Bonus', component: BonusesComponent};
      pages.push(bonusPage);
      this.state.subscribe('user.loggedIn', (loggedIn: boolean) => bonusPage.icon = loggedIn ? 'happy' : 'sad');
    }
    pages.push({icon: 'videocam', title: 'Live', component: LiveComponent});
    this.pages = pages;

    this.state.subscribe('api.data.loaded', (data: Data) => {
      this.audioTracks = data.episodes.map((episode: Episode) => ({
        src: episode.url,
        title: `ADC #${episode.episode}`,
        art: episode.image
      })).concat(data.bonuses.map((bonus: Bonus, index: number) => ({
        src: bonus.url,
        title: `Bonus #${data.bonuses.length - index}`,
        art: bonus.image ? `${config.bonusImageUrl}bonus.image` : null
      })));
    });
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: Page): void {
    this.nav.setRoot(page.component);
  }

  togglePlayer(event: MouseEvent, show?: boolean): void {
    event.stopPropagation();
    if (show === undefined) show = !this.state.data['audioPlayer.visible'];
    this.state.notifyDataChanged('audioPlayer.visible', show);
  }
}
