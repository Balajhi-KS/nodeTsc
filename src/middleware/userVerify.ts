import { CommonSevices } from '../services/commonService/common.service'

export class UserVerify{
     public commonService: CommonSevices;
     constructor(){
          this.commonService = new CommonSevices();
     }
     checkUseToken = (header) => {
          const decryptData = this.commonService.decryptDetails(header);
          return JSON.parse(decryptData);
     }
}
