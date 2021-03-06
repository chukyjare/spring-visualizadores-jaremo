
export function PostCardSimple(props){

  let {id, modelo,memoria, precio, imageModel} = props,
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
    ${precio}
  </span>
    <a href="producto/${id}">Ver publicación</a>
    </p>
  </article>  
  `;
}