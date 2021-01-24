export function PostCardDetail(props){

  let {id, brand ,modelo,memoria, precio, imageModel,stock, proveedor} = props,
  myFoto = imageModel ? ("assets/img/imageModel/" + imageModel): "assets/favicon.ico";
//  <img src="https:/placeimg.com/200/200/any" alt="">
  return `  
  <article class="post-card">  

     <img src=${myFoto} alt="no sale">
    <h2>${modelo}</h2>
    <p>
  <span>
    ${memoria}
  </span>
   <span>
    ${memoria}
  </span>
   <span>
    ${stock}
  </span>
     <span>
    ${brand}
  </span>
     <span>
    ${proveedor}
  </span>
     <span>
    ${precio}
  </span>
    <a href="#/post/${id}">Ver publicación</a>
    </p>
  </article>  
  `;
}