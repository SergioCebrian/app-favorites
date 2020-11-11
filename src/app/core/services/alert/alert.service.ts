import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private baseClass: string = 'c-alert';

  constructor(private alertController: AlertController) { }

  async presentAlert(options: any) {
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
