// 9fbef606107a605d69c0edbcd8029e5d_SYMPHONY
// UtagData model
/* tslint:disable */
export class UtagData {
  encrypted_login_id = '';
  page_id = '';
  page_section = '';
  page_name = '';
  page_type = '';
  page_description = '';
  clean_URL = '';
  journey_name = '';
  order_id = '';
  campaign_id = '';
  URL = '';
  myups_login_state = '';
  site_sub_area = '';
  domain = '';
  /**
   * deserialize
   * @param input
   */
  deserialize(input: object) {
    Object.assign(this, input);
    return this;
  }
}
