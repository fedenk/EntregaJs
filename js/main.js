let carrito = [];

carrito = (localStorage.getItem('carrito')) ? JSON.parse(localStorage.getItem('carrito')) : [];

//NAV
let nav = document.getElementById("nav");
const barraNav = document.createElement("barraNav");
barraNav.innerHTML = `
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="./index.html">
    <img src="./images/musica.png" alt="inicio" width="40" height="40" class="img-nav">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="navbar-brand" href="./formulario.html">
          <img src="./images/manzana.png" alt="inicio" width="40" height="40" class="img-nav">
          </a>
          <a id="verCarrito" href="carrito" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="./images/carrito-de-compras.png" alt="carrito" width="40" height="40" class="img-nav">
          </a>
          <ul class="dropdown-menu" id="contenedorCarrito">
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

nav.append(barraNav);

//BODY + CARRITO EN NAV
let div = document.getElementById("cards");

const mostrarCards = async () => {
    try {
        const resp = await fetch ("https://raw.githubusercontent.com/fedenk/EntregaJs/main/data.json");
        const info = await resp.json();

        info.forEach((item) => {
            const card = document.createElement("card");
            card.classList.add("col-lg-4" ,"col-sm-12");
            card.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
              <h2 class="card-title mx-auto">${item.nombre}</h2>
              <div class="card-body">
                <img src="${item.imagen}" class="card-img-top" alt="...">
                <p class="card-text">${item.descripcion}</p>
                <div class="centrado">
                <button id="btn-${item.id}" class="btn1">-</button>
                <button id="btn+${item.id}" class="btn1">+</button>
                </div>
                <p class="card-text" id="subtotal">Precio: $${item.precio}</p>
                <div class="centrado">
                <button id="btn1${item.id}" class="btn2">Ver Mas</button>
                <button id="btn2${item.id}" class="btn2">Comprar</button>
                </div>
              </div>
            </div>`;

            div.append(card);

            const verMas = document.getElementById(`btn1${item.id}`);
            verMas.addEventListener("click", () => {
              Swal.fire({
                title: `Lugar: ${item.lugar}`,
                text: `Dirección: ${item.direccion}`,
                text: `Fecha: ${item.fecha}`,
                imageUrl: `${item.imagenAlert}`,
                imageWidth: 300,
                imageHeight: 200,
                background:'#f105a3',
                imageAlt: 'Custom image',
              })
            })

            const comprar = document.getElementById(`btn2${item.id}`);
            comprar.addEventListener("click", () => {
              agregarAlCarrito(item.id);
            })

            const botonSumar = document.getElementById(`btn+${item.id}`);
            botonSumar.addEventListener("click", () => {
              sumar(item.id);
            })

            const botonRestar = document.getElementById(`btn-${item.id}`);
            botonRestar.addEventListener("click", () =>{
              restar(item.id);
            })
        });
    } catch(error) {
        
    }  
};

mostrarCards();


const agregarAlCarrito = async (id) =>{
  try {
    const resp = await fetch ("https://raw.githubusercontent.com/fedenk/EntregaJs/main/data.json");
    const info = await resp.json();

    const entradaEnCarrito = carrito.find((item) => item.id === id);
    if(entradaEnCarrito){
      entradaEnCarrito.cantidad++;
    }else{
      const entrada = info.find((item) => item.id === id);
      carrito.push(entrada);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }catch(error) {
      
    }  
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
})

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  const button = document.createElement("button");
  button.innerHTML =`
  <div class="divbtncar">
  <button class="btncarrito" id="finalizar">Finalizar compra</button>
  </div>`;

  carrito.forEach((item) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <div class="card-carrito">
          <h5 class="h5">${item.nombre}</h5>
          <p class="p-carrito">${item.descripcion}</p>
          <p class="p-carrito">Cantidad de entradas: ${item.cantidad}</p>
          <p class="p-carrito">Precio: $${item.precio}</p>
          <h5 class="h5">SubTotal: $${(item.precio)*(item.cantidad)}</h5>
      </div>
    `;
    contenedorCarrito.append(card,button);

    const finalizarCompra = document.getElementById("finalizar");
    finalizarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          color:'#f105a3',
          title:'Error',
          text:'No hay entradas en el carrito',
          icon:'error',
          background:'#740386',
          }
          
        )
      } else {
        Swal.fire({
          color:'#f105a3',
          title:'Felicitaciones',
          text:'Haz realizado tu compra',
          icon:'success',
          background:'#740386',
          }
        )
        eliminarTodoElCarrito();
      }
    });
  });
  };


const sumar = async (id) =>{
  try {
    const resp = await fetch ("https://raw.githubusercontent.com/fedenk/EntregaJs/main/data.json");
    const info = await resp.json();

    const entradaEnCarrito = carrito.find((item) => item.id === id);
    if(entradaEnCarrito){
      entradaEnCarrito.cantidad++;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    }catch(error) {
      
    }  
}

const restar = async (id) =>{
  try {
    const resp = await fetch ("https://raw.githubusercontent.com/fedenk/EntregaJs/main/data.json");
    const info = await resp.json();

    const entradaEnCarrito = carrito.find((item) => item.id === id);
    if(entradaEnCarrito.cantidad > 1){
      entradaEnCarrito.cantidad--;
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
      eliminarDelCarrito(id);
    }
    }catch(error) {
      
    }
}

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((entrada) => entrada.id !== id);
};


const eliminarTodoElCarrito = () => {
  carrito = [];
  localStorage.clear();
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
      <img src="./images/instagram.png" alt="instagram" width="30" height="30">
    </a>
    <a class="linkedin foot-icon" href="https://www.linkedin.com/in/fedenkoptv/" target="_BLANK">
      <img src="./images/linkedin.png" alt="linkedin" width="30" height="30">
    </a>
    <a class="wpp foot-icon" href="https://wa.me/qr/RTROOFNO4ZVHA1" target="_BLANK">
      <img src="./images/whatsapp.png" alt="whatsapp" width="30" height="30">
    </a>
 </div>
 </footer>`;
 document.body.append(footerPage);
 footer.append(footerPage);
