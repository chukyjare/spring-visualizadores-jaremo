STORE.namespace("STORE.MobileBox");

function crearMovil3d(mobileAttributes, divMovilTresD, divMovil) {
    createImage(mobileAttributes.imageModel, "caraFrontal");
    createImage(mobileAttributes.imageRead, "caraTrasera");
    createImage(mobileAttributes.imageSide, "caraIzquierda");
    createImage(mobileAttributes.imageSide, "caraDerecha");
    createImage(mobileAttributes.imageSide, "caraSuperior");
    createImage(mobileAttributes.imageSide, "caraInferior");

    function createImage(ruta, clase) {
        var img = document.createElement("img");
        img.src = ruta;
        img.className = clase;
        divMovilTresD.appendChild(img);
    }

    divMovil.appendChild(divMovilTresD);
}

function crearCajaMovil(divCajaMovil, mobileAttributes) {
    function createDiv(clase, text) {
        var div = document.createElement("div");
        div.className = clase;
        div.innerText= text || "";
        divCajaMovil.appendChild(div);
    }
    function crearSoporte(clase) {
        var div = document.createElement("div");
        div.className = clase;
        soporte.appendChild(div);
    }
    createDiv("cajaFrontal");
    createDiv("cajaTrasera");
    createDiv("cajaIzquierda");
    createDiv("cajaDerecha");
    createDiv("cajaSuperior");
    createDiv("cajaInferior");
    createDiv("infoMovil", mobileAttributes.modelName);
    var soporte = document.createElement("div");
    soporte.className="soporte";
    crearSoporte("soporteFrontal");
    crearSoporte("soporteTrasera");
    crearSoporte("soporteIzquierda");
    crearSoporte("soporteDerecha");
    divCajaMovil.appendChild(soporte);
    createDiv("ventosa");

}

STORE.MobileBox = function (mobileAttributes) {

    var  divMovil = document.createElement("div");
    divMovil.className="movil";

    var divMovilTresD = document.createElement("div");
    divMovilTresD.className="movil3d";

    crearMovil3d(mobileAttributes, divMovilTresD, divMovil);

    var divCajaMovil = document.createElement("div");
    divCajaMovil.className="cajaMovil"
    crearCajaMovil(divCajaMovil, mobileAttributes);


    divMovil.appendChild(divCajaMovil);

    return divMovil;

}
