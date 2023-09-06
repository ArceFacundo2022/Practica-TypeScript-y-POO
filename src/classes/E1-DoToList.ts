//! ------------------------------( TO-DO LIST )--------------------------------
import { MostrarTareas } from "../main";

export type State = "PENDIENTE" | "EN PROCESO" | "TESTEO" | "TERMINADO"

export interface taskInfo {
  title : string,
  description :  string,
  expiredDate : string,
  state : State,
  isActive : boolean
}

export class Task {
  private title: string;
  private description: string;
  private expiredDate: Date;
  private state: State;
  private isActive: boolean;

  constructor(param_title: string, param_description: string, param_expiredDate: Date){
    this.title = param_title;
    this.description = param_description
    this.expiredDate = param_expiredDate
    this.state = "PENDIENTE"
    this.isActive = true
  }

  edit (newTitle:string, newDescription:string): object{
    this.title = newTitle;
    this.description = newDescription;
    console.log(this)
    return this
  }

  avance (): string{
    switch(this.state){
      case "PENDIENTE":
        this.state = "EN PROCESO"
        MostrarTareas()
        return `la tarea (${this.title}) cambio su estado a EN PROCESO`
      case "EN PROCESO":
        this.state = "TESTEO"
        MostrarTareas()
        return `la tarea (${this.title}) cambio su estado a TESTEO`
      case "TESTEO":
        this.state = "TERMINADO"
        MostrarTareas()
        return `la tarea (${this.title}) cambio su estado a TERMINADO`
      case "TERMINADO":
        MostrarTareas()
        return `la tarea (${this.title}) NO puede mejorar su estado`
      default:
        return "Error en el metodo"
    }

  }
  
  retroceso (): string{
    switch(this.state){
      case "PENDIENTE":
        MostrarTareas()
        return `la tarea (${this.title}) NO puede retroceder en su estado`
        case "EN PROCESO":
          this.state = "PENDIENTE"
          MostrarTareas()
        return `la tarea (${this.title}) cambio su estado a PENDIENTE`
      case "TESTEO":
        this.state = "EN PROCESO"
        MostrarTareas()
        return `la tarea (${this.title}) cambio su estado a EN PROCESO`
        case "TERMINADO":
          this.state = "TESTEO"
          MostrarTareas()
          return `la tarea (${this.title}) cambio su estado a TESTEO`
          default:
            return "Error en el metodo"
          }
        }
        
        delete ():Boolean {
          if (this.isActive == true){
            this.isActive = false
            MostrarTareas()
            return true
          }
          return false
        }

        getInfo ():taskInfo {
          return {
            title : this.title,
            description : this.description ,
            expiredDate : this.expiredDate.toJSON().slice(0,10),
            state : this.state,
            isActive : this.isActive
          }
        }
        
      }