export interface contact {
    name: string,
    email: string,
    tel: number
  }
  
  export class Contacto {
    constructor(private name:string, private email:string, private tel: number){
    }
  
    getContact(): contact{
      return{
        name: this.name,
        email: this.email,
        tel: this.tel
      }
    }
  
  }