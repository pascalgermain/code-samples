import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { Device } from 'ionic-native';

import { config } from '../../../app/app.config';
import { Data, Episode, Live } from './api.types';

@Injectable()
export class ApiService {
  device: any;
  loading: any;
  data: Data;

  constructor(
    public http: Http,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  getDeviceCode(): Promise<string> {
    return this.platform.ready()
      .then((): string => {
        this.device = Device;
        if (this.platform.is('mobile') && !this.device.isVirtual)
          return `${this.device.platform}-${this.device.model}-${this.device.uuid}`;
      });
  }

  getData(refresh: boolean = false): Promise<Data> {
    if (!refresh && this.data) return Promise.resolve(this.data);

    this.presentLoading();
    return this.getDeviceCode()
      .then((deviceCode: string): Promise<Data> => {
        let dataUrl = `${config.apiUrl}data`;
        if (deviceCode) dataUrl += `?deviceCode=${encodeURIComponent(deviceCode)}`;
        return this.http
          .get(dataUrl)
          .toPromise()
          .then((response: any): Data => {
            this.loading.dismiss();
            this.data = response.json();
            return this.data;
          })
          .catch(this.handleError);
      });
  }

  getLive(): Promise<Live> {
    return this.http
      .get(`${config.apiUrl}live`)
      .toPromise()
      .then((response: any): Live => response.json())
      .catch(this.handleError);
  }

  handleError(error: any): Promise<string> {
    this.loading.dismiss();
    this.presentAlert(error.message || error);
    return Promise.reject(error.message || error);
  }

  presentLoading(): void {
    this.loading = this.loadingCtrl.create({content: 'Chargement des données...'});
    this.loading.present();
  }

  presentAlert(message: string): void {
    const alert = this.alertCtrl.create({
      title: 'Une erreur est survenue !',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
