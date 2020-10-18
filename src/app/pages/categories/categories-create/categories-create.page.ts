import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CategoryService } from '@services/category/category.service';

@Component({
  selector: 'app-categories-create-page',
  templateUrl: './categories-create.page.html',
  styleUrls: ['./categories-create.page.scss'],
})
export class CategoriesCreatePage implements OnInit {

  constructor(
    private toastController: ToastController,
    private categoryService: CategoryService
  ) { }

  ngOnInit() { }

  saveCategory(event: any): void {
    this.categoryService
        .save(event.categoryData)
        .then(resp => this.presentToast('The category has been created.', 'is-success'))
        .catch(err => this.presentToast('Opps! The category could not be created.', 'is-error'));
  }

  async presentToast(msg: string, customClass: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: customClass
    });
    toast.present();
  }

}
