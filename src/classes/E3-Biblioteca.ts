import { ShowBooks } from "../main"

export type StateBook = "Disponible" | "Prestado"

export interface InfoBook {
  title : string,
  description: string,
  autor: string,
  state: StateBook
}

export class Book {
  private state: StateBook
  constructor(private title:string, private description: string, private autor: string){
    this.state = "Disponible"
  }
  
  prestar():boolean{
    if (this.state == "Disponible"){
      this.state = "Prestado"
      ShowBooks()
      return true
    }
    return false
  }

  devolver():boolean{
    if(this.state == "Prestado"){
      this.state = "Disponible"
      ShowBooks()
      return true
    }
    return false
  }

  getBook():InfoBook{
    return {
      title : this.title,
      description: this.description,
      autor: this.autor,
      state: this.state
    }
  }
}