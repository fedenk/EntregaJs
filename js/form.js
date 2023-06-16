let datos = [];

let formulario = document.getElementById("form");

const newForm = document.createElement("newForm");

newForm.innerHTML = `
<div class="mb-3">
  <label for="nombre" class="form-label">Nombre y apellido</label>
  <input type="text" aria-label="First name" class="form-control" id="nombre">
</div>
<div class="mb-3">
  <label for="mail" class="form-label">Email address</label>
  <input type="email" class="form-control" placeholder="name@example.com" id="mail">
</div>
<div class="mb-3">
  <label for="mensaje" class="form-label">Mensaje</label>
  <textarea class="form-control" rows="3" id="mensaje"></textarea>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
  <label class="form-check-label" for="flexCheckChecked">
    Acepto terminos y condiciones
  </label>
</div>
<div>
<input class="boton" type="submit" onclick="capturaDatos()" value="Enviar" />
</div>`;
document.body.append(newForm);
formulario.append(newForm);

if(localStorage.getItem("datos") !== null){
  datos = JSON.parse(localStorage.getItem("datos"));
}

const capturaDatos = ()=>{
  const nombre = document.getElementById("nombre").value;
  const mail = document.getElementById("mail").value;
  const mensaje = document.getElementById("mensaje").value;
  const check = document.getElementById("flexCheckChecked").value;

  if( nombre == ""){
    alert("Ingrese nombre obligatorio")
  }else if( mail == ""){
    alert("Ingrese e-mail obligatorio")
  }else if(!check){
    alert("Debe aceptar terminos y condiciones")
  }else{
    const data = {
      nombre,
      mail,
      mensaje,
    }
  
    datos.push(data);
  
    localStorage.setItem("datos", JSON.stringify(datos));
  }
}




