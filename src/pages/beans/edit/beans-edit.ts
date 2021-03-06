/**Core**/
import {Component} from '@angular/core';
/**Ionic**/
import {NavParams, ViewController} from 'ionic-angular';
/**Services**/
import {UIBeanStorage} from '../../../services/uiBeanStorage';
import {UIHelper} from '../../../services/uiHelper';
/**Ionic native**/
import {UIImage} from '../../../services/uiImage';
/**Classes**/
import {Bean} from '../../../classes/bean/bean';
/**Interfaces**/
import {IBean} from '../../../interfaces/bean/iBean';

/**Enums**/
import {ROASTS_ENUM} from '../../../enums/beans/roasts';

@Component({
  templateUrl: 'beans-edit.html',
})
export class BeansEditModal {

  public data:Bean = new Bean();
  public roastsEnum = ROASTS_ENUM;

  private bean:IBean;
  constructor(private navParams: NavParams,private viewCtrl: ViewController, private uiBeanStorage:UIBeanStorage, private uiImage:UIImage, private uiHelper:UIHelper) {
    this.data.roastingDate= new Date().toISOString();
  }

  ionViewWillEnter() {
    this.bean = this.navParams.get('BEAN');
    this.data = this.uiHelper.copyData(this.bean);


  }

  public editBean(form) {
    if (form.valid) {
      this.__editBean();
    }
  }

  public __editBean(){
    this.uiBeanStorage.update(this.data);
    this.dismiss();
  }


  public addImage() {
    this.uiImage.showOptionChooser().then((_option) => {
      if (_option === "CHOOSE") {
        //CHOSE
        this.uiImage.choosePhoto().then((_path) => {
          this.data.filePath = _path.toString();
        }, () => {

        })
      }
      else {
        //TAKE
        this.uiImage.takePhoto().then((_path) => {
          this.data.filePath = _path.toString();
        }, () => {

        })
      }
    });
  }


  dismiss() {
    this.viewCtrl.dismiss("", null, {animate: false});
  }


}
