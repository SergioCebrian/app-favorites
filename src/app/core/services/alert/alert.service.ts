import { Injectable } from '@angular/core';
import { IAlert } from '@interfaces/alert';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseClass: string = 'c-alert';

  constructor(private alertController: AlertController) { }

  async presentAlert(options: any) { // TODO: Solucionar error con handler en IAlert
    const { cssClass, header, message, buttons } = options;
    const alertComponent = await this.alertController.create({
      cssClass: `${this.baseClass}  ${cssClass}`,
      header,
      message,
      buttons
    });
    await alertComponent.present();
  }

}
