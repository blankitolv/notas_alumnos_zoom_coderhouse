
header__lucas=document.querySelector('.player-view-wrapper')
const div__lucas=document.createElement('DIV');
div__lucas.id= 'div__lucas'
div__lucas.setAttribute("style","margin-left:10px;max-width:30%;margin-down:20px;")
const h2__lucas=document.createElement('H2');
h2__lucas.setAttribute("style","text-align:center;font-weigth:500;")
h2__lucas.innerHTML=`Notas del Alumno`
header__lucas.appendChild(div__lucas);
div__lucas.appendChild(h2__lucas);
const addButton__lucas = document.createElement ('BUTTON');
addButton__lucas.setAttribute("style", "background-color:lightgreen; border: 1px solid green;");
const download__myNotes = document.createElement ('BUTTON');
download__myNotes.setAttribute("style", "background-color:lightred; border: 1px solid red;");
addButton__lucas.id='agregaNota'
download__myNotes.id='descargaNotas'
addButton__lucas.innerHTML = "Agregar Nota"
download__myNotes.innerHTML = "Descargar"
div__lucas.appendChild(addButton__lucas)
div__lucas.appendChild(download__myNotes)
const inputNota__lucas = document.createElement ('INPUT');
inputNota__lucas.type = 'text';
inputNota__lucas.id='inputNota';
inputNota__lucas.placeholder='Ingrese su nota';
inputNota__lucas.setAttribute("style", "padding: 5px;margin: 5px;");
div__lucas.appendChild(inputNota__lucas);
const divNotas__lucas=document.createElement('DIV');
divNotas__lucas.id='divNotas';
divNotas__lucas.setAttribute("style", "overflow-y: auto;height: 65vh; width:100%; border:1px solid gray");
div__lucas.appendChild(divNotas__lucas)
class NotasClase {
     
     constructor (id,hora,nota){
          this.id=id;
          this.hora=hora;
          this.nota=nota;
     }
}
nameLS =document.getElementsByTagName ('title')[0].innerHTML.replace(/ /g,"").slice(0,11);
if (localStorage.getItem(`${nameLS}`)) {
     var arrayNotas=JSON.parse(localStorage.getItem(`${nameLS}`));
} else {
     var arrayNotas=[]
     localStorage.setItem(`${nameLS}`,JSON.stringify([]));
}
function enviaLS(notaObjeto){  
     let arrayNotas2=JSON.parse(localStorage.getItem(`${nameLS}`));
     arrayNotas2.push(notaObjeto)
     localStorage.setItem(`${nameLS}`,JSON.stringify(arrayNotas2));
     console.log(arrayNotas2);
}
function agregaEventoBorrar(){
     let btn_borrar=document.querySelectorAll('.botonx');
     btn_borrar.forEach(element => {
          element.addEventListener('click',funcBorrar)
          function funcBorrar(e){
               e.preventDefault();
               let previus=element.previousElementSibling.innerHTML;
               previusNota=previus.slice(10,previus.length);
               previusHora=previus.slice(0,8);
               element.parentNode.remove();
               console.log ('*****************************')
               let lsViejo=JSON.parse(localStorage.getItem(`${nameLS}`));
               let lsNuevo=[];
               let count=0;
               lsViejo.forEach(element => {
                    if (element.nota != previusNota) {
                         element.id=count;
                         lsNuevo.push(element)
                         count++;
                    }
               });
               console.log ('length Viejo '+lsViejo.length)
               console.log ('length Nuevo '+lsNuevo.length)
               localStorage.setItem(`${nameLS}`,JSON.stringify(lsNuevo));
          }       
     })
     agregaEstilo();
}
function agregaEstilo(){
     let aux= document.querySelectorAll('.cadaNota');
     aux.forEach(element => {
          element.style.display="flex";
          element.style.justifyContent = "space-between";
          element.style.alignItems = "center";
          element.style.margin="auto auto auto 10px";
     })
}
if (localStorage.getItem(`${nameLS}`)) {
     let idNumero=JSON.parse(localStorage.getItem(`${nameLS}`)).length;
     let oldNotes=JSON.parse(localStorage.getItem(`${nameLS}`));
     if ( idNumero.length != null || idNumero.length != undefined || idNumero.length != 0 ) {
          console.log (oldNotes);
          oldNotes.forEach(oneNote => {
               let ahora2=oneNote.hora;
               let laNota2=oneNote.nota;
               console.log (oneNote.hora+" "+oneNote.nota);             
               let cadaNota2=document.createElement('DIV');
               cadaNota2.className='cadaNota';          
               let pNota2=document.createElement ('P');           
               pNota2.innerHTML=`${ahora2}: ${laNota2}`
               cadaNota2.appendChild(pNota2);       
               const botonx=document.createElement('BUTTON');
               botonx.setAttribute("style", "height:20px; color:white; font-weight:600; background-color:red; border: 1px solid red;");
               botonx.className='botonx';
               botonx.innerHTML='x';   
               cadaNota2.appendChild(botonx);
               divNotas__lucas.appendChild(cadaNota2);   
               agregaEventoBorrar();
          });
     }
}

agregaNota.addEventListener('click',()=> {
     let ahora=document.querySelector('.vjs-time-range-current');
     let cadaNota=document.createElement('DIV');
     cadaNota.className='cadaNota';
     cadaNota.setAttribute("style","width:90%;")
     let pNota=document.createElement ('P');
     let laNota=document.querySelector('#inputNota');
     pNota.innerHTML=`${ahora.innerHTML}: ${laNota.value}`
     cadaNota.appendChild(pNota);
     const botonx=document.createElement('BUTTON');
     botonx.setAttribute("style", "height:20px; color:white; font-weight:600; background-color:red; border: 1px solid red;");
     botonx.className='botonx';
     botonx.innerHTML='x';
     botonx.style.height = "20px";
     cadaNota.appendChild(botonx);
     divNotas__lucas.appendChild(cadaNota);
     let idNumero=JSON.parse(localStorage.getItem(`${nameLS}`)).length;
     let notaObjeto = new NotasClase (idNumero,ahora.innerHTML,laNota.value)
     enviaLS(notaObjeto);
     laNota.value='';
     agregaEventoBorrar();
})
function download(filename, texto) {
     let element = document.createElement('a');
     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
     element.setAttribute('download', filename);
     element.style.display = 'none';
     document.body.appendChild(element);
     element.click();
}
download__myNotes2 = document.querySelector('#descargaNotas')
download__myNotes2.addEventListener('click',(e)=> {
     e.preventDefault();
     console.log ('click download')
     let nameLS2=document.getElementsByTagName ('title')[0].innerHTML.slice(16,-5);
     let filename = `${nameLS2}.txt`;
     let texto='';
     arrayNotas=JSON.parse(localStorage.getItem(`${nameLS}`));
     texto+=`TIEMPO \t NOTA \n \r`
     arrayNotas.forEach(element => {
          texto+=`${element.hora} \t ${element.nota} \n\r`
     });
     download(filename, texto);
})

