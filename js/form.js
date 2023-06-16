let datos = [];

//NAVBAR
let nav = document.getElementById("nav");
const barraNav = document.createElement("barraNav");
barraNav.innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="../index.html">
    <img src="../images/musica.png" alt="inicio" width="40" height="40" class="img-nav">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="navbar-brand" href="./formulario.html">
          <img src="../images/manzana.png" alt="inicio" width="40" height="40" class="img-nav">
          </a>
          <a id="verCarrito" href="carrito" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="../images/carrito-de-compras.png" alt="carrito" width="40" height="40" class="img-nav">
          </a>
          <ul class="dropdown-menu" id="contenedorCarrito">
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

nav.append(barraNav);
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

//FOOTER

let footer = document.getElementById("footer");
const footerPage = document.createElement("footer");
footerPage.innerHTML = `
<footer class="row footer-style">
<div class="col-lg-6">
<p class="text-center text-style">Web Developer: Fede.Nk</p>
</div>
<div class="col-lg-6  centrado">
    <a class="instagram foot-icon" href="https://www.instagram.com/" target="_BLANK">
      <img src="../images/instagram.png" alt="instagram" width="30" height="30">
    </a>
    <a class="linkedin foot-icon" href="https://www.linkedin.com/in/fedenkoptv/" target="_BLANK">
      <img src="../images/linkedin.png" alt="linkedin" width="30" height="30">
    </a>
    <a class="wpp foot-icon" href="https://wa.me/qr/RTROOFNO4ZVHA1" target="_BLANK">
      <img src="../images/whatsapp.png" alt="whatsapp" width="30" height="30">
    </a>
 </div>
 </footer>`;
 document.body.append(footerPage);
 footer.append(footerPage);



