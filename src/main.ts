//! ------------------------------( TO-DO LIST )--------------------------------

import { Task, taskInfo } from "./classes/E1-DoToList"
export const taskArray: Task [] = []
      

      export const addTask = (): boolean => {

        const inputTitle = document.getElementById('title') as HTMLInputElement
        const inputDescription = document.getElementById('description') as HTMLInputElement
        const inputDate = document.getElementById('expiredDate') as HTMLInputElement
        
        const newTask = new Task(inputTitle.value, inputDescription.value, new Date(inputDate.value))

        taskArray.push(newTask)
        MostrarTareas()

        return true
      }

      export const MostrarTareas = ():boolean => {

        if (taskArray.length == 0){
          return false
        }

        const divTasks = document.getElementById('divTask') as HTMLDivElement
        let htmlTask: string = `
        <h1>Tareas</h1>
        `
        taskArray.forEach( (tarea, indice) => {
          const info: taskInfo = tarea.getInfo()
          if (info.isActive == true){
            htmlTask += `
            <hr>
            <section>
                  <h2 class="Estado">${info.title}</h2>
                  <p><b>DESCRIPCION:</b>\n ${info.description}</p>
                  <h3 class="Estado">${info.state}</h3>
                  <p><b>FECHA DE VENCIMIENTO: </b>\n ${info.expiredDate}</p>
                  <input type="button" id="retroceso${indice}" value="◀️" onclick="">  |  <input type="button" id="delete${indice}" value="❌" onclick="">  |  <input type="button" id="avance${indice}" value="▶️" onclick="">
                  <hr>
                </section>
            `
          }
        })

        divTasks.innerHTML = htmlTask
        taskArray.forEach((tarea,indice) => {
          const info: taskInfo = tarea.getInfo()
          if (info.isActive == true){
            document.querySelector<HTMLButtonElement>(`#retroceso${indice}`)!.addEventListener('click', () => {
              taskArray[indice].retroceso()
            });
            document.querySelector<HTMLButtonElement>(`#delete${indice}`)!.addEventListener('click', () => {
              taskArray[indice].delete()
            });
            document.querySelector<HTMLButtonElement>(`#avance${indice}`)!.addEventListener('click', () => {
              taskArray[indice].avance()
            });
          }
        })
        return true
      }

      document.querySelector<HTMLButtonElement>('#addTask')!.addEventListener('click', () => {
        addTask();
      });

//! ---------------------------- ( CALCULADORA DE GEOMETRIAS ) --------------------------------

const geoArray: (Circle | Triangle | Rectangle) [] = []

type Figuras = "Rectangle" | "Circle" | "Triangle"

let figure: Figuras = "Rectangle"

interface Geometry {
  getArea() : number,
  getPerimetro(): number,
  img:string,
  type:Figuras
}

class Circle implements Geometry{
  img:string
  type: Figuras
  constructor(private radio: number){
    this.img = "/public/img/circuloAzul.png"
    this.type = "Circle"
  }

  getArea(): number {
    
    return Math.round(Math.PI * (this.radio ** 2))
  }

  getPerimetro(): number {
    return Math.round((Math.PI * 2) * this.radio)    
  }

  getType(): Figuras {
    return this.type
  }
}

class Triangle implements Geometry{
  img: string
  type: Figuras
  constructor(private base:number, private height:number){
    this.img = "/public/img/TrianguloAzul.png"
    this.type = "Triangle"
  }

  getArea(): number {
    return (this.height * this.base) / 2
  }
  getPerimetro(): number {
    let c = Math.sqrt((this.base ** 2)+(this.height ** 2))
    let result = this.base + this.height + c
    return Math.round(result)
  }

  getType(): Figuras {
    return this.type
  }
}

class Rectangle implements Geometry{
  img: string
  type: Figuras
  constructor(private base:number, private height: number){
    this.img = "/public/img/RectanguloAzul.png"
    this.type = "Rectangle"
  }

  getArea(): number {
    return this.base * this.height
  }

  getPerimetro(): number {
    return (this.base * 2) + (this.height * 2)
  }

  getType(): Figuras {
    return this.type
  }

  getImg(): string {
    return this.img
  }
}

const addGeometry = () => {
  const inputBase = document.getElementById('base') as HTMLInputElement
  const inputHeight = document.getElementById('height') as HTMLInputElement
  const inputRadio = document.getElementById('radio') as HTMLInputElement

  const base: number = parseInt(inputBase.value)
  const height: number = parseInt(inputHeight.value)
  const radio: number = parseInt(inputRadio.value)

  switch(figure){
    case "Circle":
      const newCircle = new Circle(radio)
      geoArray.push(newCircle)
      break
    case "Rectangle":
      const newRectangle = new Rectangle(base,height)
      geoArray.push(newRectangle)
      break
    case "Triangle":
      const newTriangle = new Triangle(base, height)
      geoArray.push(newTriangle)
      break
    default:
      break
    }
    showGeometry()
  } 
  const showGeometry = () => {

    if (geoArray.length == 0){
      return false
    }
  
    const listGeometry = document.getElementById('listGeometry') as HTMLDivElement
    let htmlGeometry: string = `
    `
    geoArray.forEach( geo => {
        htmlGeometry += `
        <div class="subComponent comp01">
                    <h2>${geo.getType()}</h2>
                    <img src="${geo.img}" width="150px" height="150px">
                    <p><b>Perimetro: </b>${geo.getPerimetro()}m</p>
                    <p><b>Area: </b>${geo.getArea()}m</p>
                  </div>
        `
      })
  
    listGeometry.innerHTML = htmlGeometry
    return true
  }

  const selectFigure = (option:Figuras) => {

    const inputBase = document.getElementById('base') as HTMLInputElement
    const inputHeight = document.getElementById('height') as HTMLInputElement
    const inputRadio = document.getElementById('radio') as HTMLInputElement
    const labelBase = document.getElementById('labelBase') as HTMLLabelElement
    const labelHeight = document.getElementById('labelHeight') as HTMLLabelElement
    const labelRadio = document.getElementById('labelRadio') as HTMLLabelElement
    const title = document.getElementById('figure') as HTMLHeadElement

    if (option == "Circle"){
      inputRadio.hidden = false
      labelRadio.hidden = false
      inputBase.hidden = true
      labelBase.hidden = true
      inputHeight.hidden = true
      labelHeight.hidden = true
      title.innerText = "Circle"
      figure = "Circle"
    }else {
      inputBase.hidden = false
      labelBase.hidden = false
      inputHeight.hidden = false
      labelHeight.hidden = false
      inputRadio.hidden = true
      labelRadio.hidden = true
      title.innerText = option
      figure = option
    }
  }

document.querySelector<HTMLButtonElement>('#addGeometry')!.addEventListener('click', () => {
  addGeometry();
});
document.querySelector<HTMLButtonElement>('#circle')!.addEventListener('click', () => {
  selectFigure("Circle");
});
document.querySelector<HTMLButtonElement>('#rectangle')!.addEventListener('click', () => {
  selectFigure("Rectangle");
});
document.querySelector<HTMLButtonElement>('#triangle')!.addEventListener('click', () => {
  selectFigure("Triangle");
});

//! ---------------------------- ( BIBLIOTECA VIRTUAL ) -------------------------------------

import { Book, InfoBook } from "./classes/E3-Biblioteca"

const Library: Book [] = []

export const addBook = () => {
  const inputTitle = document.getElementById("bookTitle") as HTMLInputElement
  const inputDescription = document.getElementById("bookDescription") as HTMLTextAreaElement
  const inputAutor = document.getElementById("autor") as HTMLInputElement

  const newBook = new Book(inputTitle.value, inputDescription.value, inputAutor.value)

  Library.push(newBook)
  ShowBooks()
}

export const ShowBooks = ():boolean => {

  if (Library.length == 0){
    return false
  }

  const disponibles = document.getElementById('disponibles') as HTMLDivElement
  const prestados = document.getElementById('prestados') as HTMLDivElement
  let htmlDispo: string = `
  <h2>Disponibles</h2>
  `
  let htmlPresta: string = `
  <h2>Prestados</h2>
  `
  Library.forEach( (book, indice) => {
    const info: InfoBook = book.getBook()
    if (info.state == "Disponible"){
      htmlDispo += `
      <hr>
      <section>
            <h2 class="Estado">${info.title}</h2>
            <p><b>DESCRIPCION:</b>\n ${info.description}</p>
            <h3 class="Estado">${info.autor}</h3>
            <input type="button" id="prestar${indice}" value="Prestar ▶️" onclick="">
            <hr>
          </section>
      `
    }else {
      htmlPresta +=`
      <hr>
      <section>
            <h2 class="Estado">${info.title}</h2>
            <p><b>DESCRIPCION:</b>\n ${info.description}</p>
            <h3 class="Estado">${info.autor}</h3>
            <input type="button" id="devolver${indice}" value="◀️ Devolver" onclick="">
            <hr>
          </section>
      `
    }
  })

  disponibles.innerHTML = htmlDispo
  prestados.innerHTML = htmlPresta
  Library.forEach((book,indice) => {
    const info: InfoBook = book.getBook()
    if (info.state == "Disponible"){
      document.querySelector<HTMLButtonElement>(`#prestar${indice}`)!.addEventListener('click', () => {
        Library[indice].prestar()
      });
    }else {
      document.querySelector<HTMLButtonElement>(`#devolver${indice}`)!.addEventListener('click', () => {
        Library[indice].devolver()
      });
    }
  })
  return true
}

document.querySelector<HTMLButtonElement>('#addBook')!.addEventListener('click', () => {
  addBook();
});

//! ---------------------------- ( MASCOTA VIRTUAL ) -------------------------------------

const PetHome: (Perro) [] = []

type relacion = "Distante" | "Desinteresado" | "Neutral" | "Interesado" | "Afectivo" | "Encariñado"
type pets = "Perro" | "Gato"

interface infoPet {
  lvlApego: number,
  apego: relacion,
  energia: number,
  petName?: string,
  type: pets,
  img : string
}

let pet:pets = "Perro"

class Mascota {
  private lvlApego: number
  private apego: relacion
  private energia: number
  constructor(private petname: string){
    this.apego = "Distante",
    this.lvlApego = 0
    this.energia = 100
  }
  emitirSonido() {
    return "Sonido default 🤷‍♂️"
  }

  comer(PointE: number) {
    if(this.energia == 100){
      alert(`${this.petname} No tiene hambre 🐾 `)
      return false
    }
    this.energia += PointE
    this.subirApego(5)
    if(this.energia > 100){
      this.energia = 100
    }
    alert(`${this.petname} Agradece la comida 🐶`)
    return true
  }

  subirApego(lvl:number) {
    this.lvlApego += lvl
    if(this.lvlApego > 100){
      this.lvlApego = 100
    }
    if(this.lvlApego > 15){
      if(this.lvlApego > 30){
        if(this.lvlApego > 45){
          if(this.lvlApego > 60){
            if(this.lvlApego > 75){
              this.apego = "Encariñado"
            }else{
              this.apego = "Afectivo"
            }
          }else{
            this.apego = "Interesado"
          }
        }else{
          this.apego = "Neutral"
        }
      }else{
        this.apego = "Desinteresado"
      }
    }
    return this.apego
  }

  Desgaste(gasto: number) {
    this.energia -= gasto
    if(this.energia < 0){
      this.energia = 0
    }
  }

  getEnergia(){
    return this.energia
  }

  getInfo(type:pets, img: string):infoPet {
    return {
      lvlApego: this.lvlApego,
      apego: this.apego,
      energia: this.energia,
      petName: this.petname,
      type,
      img
    }
  }
}

class Terrestre extends Mascota {

  constructor(petName: string){
    super(petName)
  }

  Caminar(){
    if(this.getEnergia() < 10){
      return false
    }
    this.Desgaste(10)
    this.subirApego(2)
    return true
  }

  correr(){
      if(this.getEnergia() < 20){
        return false
      }
      this.Desgaste(20)
      this.subirApego(5)
      return true
    }
}

class Perro extends Terrestre {
  type: pets
  img : string
  constructor(petName:string){
    super(petName)
    this.type = "Perro"
    this.img = "../public/img/Dog.jpg"
  }

  Pasear(){
    const info: infoPet = this.getInfo(this.type,this.img)
    if(this.Caminar()){
      alert(`${info.petName} se divirtio paseando 🐕‍🦺`)
    }else{
      alert(`${info.petName} esta demaciado cansado 💤`)
    }
  }

  BuscarLaPelota(){
    const info: infoPet = this.getInfo(this.type,this.img)
    if(this.correr()){
      alert(`${info.petName} se divirtio jugando 🐕`)
    }else{
      alert(`${info.petName} esta demaciado cansado 💤`)
    }
  }
}

const addPet = () =>{

  const inputName = document.getElementById('PetName') as HTMLInputElement
  let newPet: Perro

  switch(pet){
    case "Perro":
      newPet = new Perro(inputName.value)
      PetHome.push(newPet)
      showPets()
      break
    case "Gato":
      break
    default:
      return false
  }
}

const showPets = () => {

  if (PetHome.length == 0){
    return false
  }

  const listPets = document.getElementById('listPets') as HTMLDivElement
  let htmlPets: string = `
  `
  PetHome.forEach( (pot, indice) => {
    const info: infoPet = pot.getInfo(pot.type,pot.img)
      htmlPets += `
      <div class="subComponent comp01">
                  <h2>${info.petName}</h2>
                  <img src="${info.img}" width="150px" height="150px">
                  <p><b>Apego: </b>${info.apego}</p>
                  <p><b>Lvl: </b><input type="range" value="${info.lvlApego}" min="0" max="100" step="1" onInput="this.nextElementSibling.value = this.value" disabled><output>${info.lvlApego}</output></p>
                  <p><b>Energia: </b><input type="range" value="${info.energia}" min="0" max="100" step="1" onInput="this.nextElementSibling.value = this.value" disabled><output>${info.energia}</output></p>
                  <hr>
                  <input type="button" id="Paseo${indice}" value="Pasear 🐕‍🦺" onclick="">  |  <input type="button" id="BuscarLaPelota${indice}" value="Jugar 🐕" onclick="">  |  <input type="button" id="Comer${indice}" value="Comer 🍖" onclick="">
                </div>
      `
    })

  listPets.innerHTML = htmlPets

  PetHome.forEach((pot,indice) => {
      document.querySelector<HTMLButtonElement>(`#Paseo${indice}`)!.addEventListener('click', () => {
        console.log('1')
        pot.Pasear()
        showPets()
      });
      document.querySelector<HTMLButtonElement>(`#BuscarLaPelota${indice}`)!.addEventListener('click', () => {
        console.log('2')
        pot.BuscarLaPelota()
        showPets()
      });
      document.querySelector<HTMLButtonElement>(`#Comer${indice}`)!.addEventListener('click', () => {
        console.log('3')
        pot.comer(50)
        showPets()
      });
    })
  return true
}

document.querySelector<HTMLButtonElement>('#addPet')!.addEventListener('click', () => {
  console.log("0")
  addPet();
});

//! ---------------------------- ( GESTION DE CONTACTOS ) -------------------------------------

import { Contacto, contact } from "./classes/E5-Contactos"

// type typeEmail = `${string}@${string}.com`
const agenda: Contacto [] = []
let searchAgenda: Contacto [] = []

const addContact = () =>{

  const inputName = document.getElementById('name') as HTMLInputElement
  const inputEmail = document.getElementById('email') as HTMLInputElement
  const inputTelefono = document.getElementById('tel') as HTMLInputElement

  const newContact = new Contacto(inputName.value, inputEmail.value, parseInt(inputTelefono.value))
  agenda.push(newContact)
  searchAgenda = agenda
  showContact()
}

const showContact = () => {
  if (agenda.length == 0){
    return false
  }

  const listContact = document.getElementById('listContact') as HTMLDivElement
  let htmlContact: string = `
  `
  searchAgenda.forEach( (conta) => {
    const info: contact = conta.getContact()
      htmlContact += `
      <div class="subComponent comp01">
                    <h2>${info.name}</h2>
                    <p><b>Email: </b>${info.email}</p>
                    <p><b>Tel: </b>${info.tel}</p>
                  </div>
      `
    })

  listContact.innerHTML = htmlContact
  return true
}

const searchContacto = () => {
  const inputSearch = document.getElementById('search') as HTMLInputElement

  const searchArray = agenda.filter(conta => conta.getContact().name.includes(inputSearch.value))
  searchAgenda = searchArray
  showContact()
}

document.querySelector<HTMLButtonElement>('#addContact')!.addEventListener('click', () => {
  addContact();
});

document.querySelector<HTMLButtonElement>('#SearchButton')!.addEventListener('click', () => {
  searchContacto();
});
      export {}