class Producto{
    constructor(nombre,precio){
      this.nombre=nombre;
      this.precio=precio;
  
    }
  }
  
  class ProductoAlmacen extends Producto{
    constructor(nombre,img,descripcion,precio){
      super(nombre,precio);
      this.img=img;
      this.descripcion=descripcion;
    }
  }
  
  class ProductosAlmacen{
    constructor(){
      this.productos = [];
    }
    addProducto(producto){
      this.productos.push(producto);
    }
    getProductos(){
      return this.productos;
    }
  }
  
  class ProductoCarrito extends Producto{
    constructor(nombre,precio,cantidad){
      super(nombre,precio);
      this.cantidad=cantidad;
    }
  }
  
  
  class CarritoDeCompras{
    constructor(){
      this.carrito = [];
    }
    
    addProductoCarrito(producto){
      this.carrito.push(producto);
    }
    //
    editCantProducto(index,cantidad){
      this.carrito[index].cantidad += cantidad
    }
    removeProducto(index){
      this.carrito[index].cantidad -=1;
      if(this.carrito[index].cantidad==0){
        this.carrito.splice(index,1);
      }
    }
  
    getProductosCarrito(){
      return this.carrito;
    }
  }
  
  const productosAlmacen = new ProductosAlmacen();
  const carritoDeCompras = new CarritoDeCompras();
  
  
  productosAlmacen.addProducto(new ProductoAlmacen("Tri Bot Robot de Aprendizaje",
  "https://pepeganga.vtexassets.com/arquivos/ids/666563/100343866-1.png?v=637737938490530000",
  "El Tori Bot Robot de Aprendizaje 4 en 1 de Fisher Price es un amiguito de juegos que se transforma para que los bebés se diviertan con las 4 maneras de juego y las entretenidas canciones, luces y actividades prácticas.",
  300000));
  
  productosAlmacen.addProducto(new ProductoAlmacen("Casa de los Sueños de Barbie - Fisher Price",
  "https://pepeganga.vtexassets.com/arquivos/ids/829588/100711075-1.png?v=638023148105470000",
  "Con 3 pisos de juegos, esta casa de juguete está cargada de diversión práctica, incluido un ascensor que se mueve, un armario de ropa giratorio y una piscina iluminada con tobogán",
  340000));
  
  productosAlmacen.addProducto(new ProductoAlmacen("Pista Anti-Gravity Slot Track - Hot Wheels",
  "https://pepeganga.vtexassets.com/arquivos/ids/832199/100458020-1.png?v=638028359622430000",
  "La pista de juguete Anti-Gravity Slot Track, incluye 2 mini vehículos 2 controladores inalámbricos y contador de vueltas.",280000))
  productosAlmacen.addProducto(new ProductoAlmacen("Figura Spidey And His",
  "https://pepeganga.vtexassets.com/arquivos/ids/666390/10010737703-1.png?v=637737937812300000",
  " Spidey and His Amazing Friends sigue las aventuras del superhéroe Spidey y todos sus heroicos amigos, los cuales tienen todos súper poderes de araña, sentido arácnido, súper fuerza y más",
  35000));
  
  
  //Elementos del DOM
  const $productosTabla =  document.getElementById("productos");
  const $productosCompra = document.getElementById("carrito");
  
  const $seccionCompra  = document.getElementById("compra");
  //AddEventListener
  document.addEventListener("DOMContentLoaded",function(){
    if(carritoDeCompras.getProductosCarrito().length > 0){
      $seccionCompra.style.display = "block";
    }
  });
  
  document.addEventListener('DOMContentLoaded',function(){
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || carritoDeCompras.getProductosCarrito();
    if (carrito.length != 0){
      carritoDeCompras.carrito=[];
      carrito.forEach(e=>{
        carritoDeCompras.addProductoCarrito(e);
      })
    }
    renderCarritoCompra();
  });
  
  function addlocalStorage(carritoDeCompras){
    localStorage.setItem('carritoDeCompras', JSON.stringify(carritoDeCompras));
  };
  
  //Funciones 
  function renderProductosTabla(){
    $productosTabla.innerHTML=" ";
    const productosAlm = productosAlmacen.getProductos();
  
    productosAlm.forEach((e,index)=>{
      const {nombre,img,descripcion,precio} = e;
  
      let html = `<tr class="tr">
                    <td>
                      <div class="producto">
                        <img src="${img}" class="imgProducts" alt="...">
                        <p>${nombre}</p>
                      </div>
  
                    </td>
                    <td>${descripcion}</td>
                    <td>$${precio}</td>
                    <td>
                      <div class="btnIncrementar">
                        <button id="btn-menos" onclick="decrementar(${index})">-</button>
                        <p class="cantidad" id="${index}">1</p>
                        <button id="btn-mas" onclick="incrementar(${index})">+</button>
                      </div> 
                      
                    </td>
                    <td>
                      <button type="button" class="btn btn-success carrito" onclick="agregarAlCarrito(${index})">
                        <i class="bi bi-cart4"></i>
                      </button>
                    </td>
                  </tr>`; 
  
      $productosTabla.insertAdjacentHTML('beforeend',html);
    })
  }
  
  function renderCarritoCompra(){
    $productosCompra.innerHTML=" ";
    const carritoCompra = carritoDeCompras.getProductosCarrito();
    let total= 0;
    carritoCompra.forEach((e,index)=>{
      const {nombre,cantidad,precio} = e;
      console.log(cantidad);
      let subtotal = cantidad*precio.toFixed(3);
      total += subtotal;
      let html = `<tr>
                  <td>${nombre}</td>
                  <td  class="tr">${cantidad}</td>
                  <td  class="tr">$${subtotal}</td>
                  <td class="tr">
                    <button  class="btn btn-danger" onclick="removeProducto(${index})"><i class="bi bi-trash-fill"></i></button>
                  </td>
                </tr>`;
      $productosCompra.insertAdjacentHTML('beforeend', html);
    })
    let html2 =`<tr>
                <td  class="border border-0"></td>
                <td class="tr border border-0"><b>TOTAL</b></td>
                <td class="tr border border-0">$${total}</td>
                
              </tr>`
      $productosCompra.insertAdjacentHTML('beforeend', html2);
  
    addlocalStorage(carritoCompra);
  
    if(carritoCompra.length>0){
      $seccionCompra.style.display = "block";
    }else{
      $seccionCompra.style.display = "none";
    }
  }
  renderProductosTabla();
  
  function incrementar(index){
    let $cajaCantidad = document.getElementById(index);
    let cantidad = Number($cajaCantidad.textContent);
    $cajaCantidad.textContent =  cantidad+1;
  }
  function decrementar(index){
    let $cajaCantidad = document.getElementById(index);
    let cantidad = Number($cajaCantidad.textContent)
    if(cantidad !=1){
      $cajaCantidad.textContent =  cantidad-1;
    }
  }
  
  function agregarAlCarrito(index){
    let cantidad = Number(document.getElementById(index).textContent);
  
    const productosAlm = productosAlmacen.getProductos()[index];
    let {nombre,precio} = productosAlm;
  
    const carrito = carritoDeCompras.getProductosCarrito();
  
    //Saber si ya existe el producto en el carrito!
    let existe = false;
    
    carrito.forEach((e,i)=>{
      if(e.nombre == nombre){
        existe = true;
        carritoDeCompras.editCantProducto(i,cantidad)
        return
      }
    });
    
    if(!existe){
      let newProducto = new ProductoCarrito(nombre,precio,cantidad)
      carritoDeCompras.addProductoCarrito(newProducto)
    }
    console.log(carritoDeCompras.getProductosCarrito());
    document.getElementById(index).textContent = 1;
    renderCarritoCompra();
  
  };
  
  function removeProducto(index){
    carritoDeCompras.removeProducto(index);
    renderCarritoCompra();
  }
  
  
  // Obtener los elementos del carrito del Local Storage al cargar la página
  /*var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  function mostrarCarrito() {
    var cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';
  
    for (var i = 0; i < cartItems.length; i++) {
      var cartItem = document.createElement('li');
      cartItem.textContent = cartItems[i];
      cartItemsList.appendChild(cartItem);
    }
  }
  
  function agregarAlCarrito() {
    var item = document.getElementById('compraInput').value;
    if (item){
      cartItems.push(item);
      mostrarCarrito();
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  
  }
  
  function vaciarCarrito() {
    cartItems = [];
    mostrarCarrito();
    localStorage.removeItem('cartItems');
  }
  
  mostrarCarrito();*/