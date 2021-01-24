export function PostCardJaremo(props){

    let {id, modelo,memoria, precio, imageModel} = props,
    myFoto = imageModel ? ("assets/img/imageModel/" + imageModel): "assets/favicon.ico";
  //  <img src="https:/placeimg.com/200/200/any" alt="">
    return ` 
     
    <div class="swiper-slide" style="-webkit-box-reflect: below 1px linear-gradient(transparent, transparent, rgba(247, 8, 8, 0.4));">
            <div class="detail-jare">
                <a href="#/post/${id}">Ver publicación</a>
                <h3>${modelo}</h3>
                <span>${precio}€</span>
            </div>
        <div class="picture-jare">
            <img src=${myFoto} alt="">
        </div>
    </div>
    `;
  }