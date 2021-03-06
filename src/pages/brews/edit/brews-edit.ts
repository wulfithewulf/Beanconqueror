/**Core**/
import {Component, ViewChild} from '@angular/core';
/**Ionic**/
import {ViewController, NavParams,Slides} from 'ionic-angular';
/**Services**/
import {UIBeanStorage} from '../../../services/uiBeanStorage';
import {UIPreparationStorage} from '../../../services/uiPreparationStorage';
import {UIBrewStorage} from '../../../services/uiBrewStorage';
import {UIHelper} from '../../../services/uiHelper';
import {UIImage} from '../../../services/uiImage';

/**Classes**/
import {Brew} from '../../../classes/brew/brew';

/**Interfaces**/
import {IPreparation} from '../../../interfaces/preparation/iPreparation';
import {IBean} from '../../../interfaces/bean/iBean';
import {IBrew} from '../../../interfaces/brew/iBrew';


@Component({
  selector: 'brews-edit',
  templateUrl: 'brews-edit.html',
})
export class BrewsEditModal {

  @ViewChild('photoSlides') photoSlides: Slides;
  public data: Brew = new Brew();

  private brew: IBrew;


  method_of_preparations: Array<IPreparation> = [];
  beans: Array<IBean> = [];
  activeIndex: number = 0;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private uiBeanStorage: UIBeanStorage,
              private uiPreparationStorage: UIPreparationStorage, private uiBrewStorage: UIBrewStorage,
              public uiHelper: UIHelper, private uiImage:UIImage) {

    //Moved from ionViewDidEnter, because of Ionic issues with ion-range
    this.brew = this.navParams.get('BREW');
    let copy:IBrew = this.uiHelper.copyData(this.brew);
    this.data.initializeByObject(copy);
    this.method_of_preparations = this.uiPreparationStorage.getAllEntries();
    this.beans = this.uiBeanStorage.getAllEntries();
  }


  public showRating(){
    if (this.data != null && this.data.rating >=0){
      return true;
    }
    else{
      return false;
    }
  }

  public addImage() {
    this.uiImage.showOptionChooser().then((_option) => {
      if (_option === "CHOOSE") {
        //CHOSE
        this.uiImage.choosePhoto().then((_path) => {
          console.log(_path);

          if (_path) {
            this.data.attachments.push(_path.toString());
          }

        }, () => {

        })
      }
      else {
        //TAKE
        this.uiImage.takePhoto().then((_path) => {
          this.data.attachments.push(_path.toString());
        }, () => {

        })
      }
    });
  }

  public deleteImage(_index: number) {
    this.data.attachments.splice(_index, 1);
    if (this.data.attachments.length > 0) {
      //Slide to one item before
      this.photoSlides.slideTo(_index - 1, 0);
    }

  }

  dismiss() {
    this.viewCtrl.dismiss("", null, {animate: false});
  }

  public updateBrew() {
    this.uiBrewStorage.update(this.data);
    this.dismiss();
  }


  public nextPage() {

    this.activeIndex++;
  }


}
