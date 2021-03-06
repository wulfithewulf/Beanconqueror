/**
 * Created by lars on 10/18/2017.
 */
import {IConfig} from '../objectConfig/iObjectConfig';
export interface IBrew {
 //Properties
  /**
   * Inherits the grind size set on your hand/electric grinder
   */
  grind_size:string,
  /**
   * Inherits the actualy grinded size when starting a new brew
   */
  grind_weight:number,
  /**
   * Inherits the specific preparation method for a brew, default: Standard
   * E.g. "Chemex","Portafilter","Aeropress"
   */
  method_of_preparation:string,
  /**
   * Inherits the used bean for a brew, default: Standard
   */
  bean:string,
  /**
   * Inherits the brew temperature for a brew
   */
  brew_temperature:number,
  /**
   * Inherits the brewing time for the coffee, shot-time, infusion-time etc.
   */
  brew_time:number,
  /**
   * Inherits the output (user specific in g or ml)
   */
  brew_quantity:number,
  /**
   * Inherits the notes the user doing during or after the shot
   */
  note:string,
  /**
   * Taste rating
   */
  rating:number,

  /**
   * Inherits the brewn type of coffee: Espresso, Ristretto, Long Black, Americano, Pour Over
   */
  coffee_type:string,

  /**
   * Inherits the extraction concentration
   */
  coffee_concentration:string,

  /**
   * Inherits the first drip in seconds
   */
  coffee_first_drip_time:number,

  /**
   * Inherits the blooming / pid time
   */
  coffee_blooming_time:number,
  /**
   * Image attachments
   */
  attachments:Array<string>,
  config:IConfig,

  //Functions
  formateDate():string;

}


