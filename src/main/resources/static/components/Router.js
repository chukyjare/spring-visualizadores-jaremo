import api from "../helpers/harni_api.js";
import {ajax} from "../helpers/ajax.js";
import {PostCard} from "./PostCard.js";
import {PostCardDetail} from "./PostCardDetail.js";

export async function Router(){
    const d = document,
    $main =  d.getElementById("main"),
    $footer =  d.getElementById("footer"),
    w = window;
    let {hash} = location;
    console.log("hash:" + hash);
  $main.innerHTML = null;

    if(!hash || hash === "#/"){
     await  ajax({
                              url:api.API_HARNINA,
                              cbSuccess : (posts)=>{
                                      console.log(posts);
                                       console.log(posts.content[3]);
                                        console.log("NºPage:" + posts.pageable.pageNumber);
                                        console.log("Grupo:" + posts.pageable.pageSize);
                                           console.log("TotalPage:" + posts.totalPages);
                                            console.log("TotalElements:" + posts.totalElements);
                                               console.log("Primera:" + posts.first);
                                          console.log("Última:" + posts.empty);
                                        let html = "";
                                       posts.content.forEach(post => {
                                               console.log(post);
                                               html += PostCard(post);
                                            }); 
                                             d.getElementById("main").innerHTML=html;


                                      /*
                                      let html = "";
                                       posts.forEach(post => {
                                                html += PostCard(post);
                                            }); 
                                      
                                      d.getElementById("main").innerHTML=html;
                                    
                                     let footer =  `<a href="http://localhost:8085/storerest/?page=2">Previous</a>
                                                    <span>-</span>
                                                    <a href="#/carousel">Next</a>
                                                    <span>-</span>
                                                    <a href="#/search">End</a>
                                                    <span>-</span>
                                                      <a href="#/contacto">First</a>
                                                    <a href="#/out">Out</a>
                                                    `;
                                     document.getElementById("footer").innerHTML = footer;  */
                                }
                          })
    }else  if(hash.includes("#/search")){
      $main.innerHTML = "<h2>Seccion del Buscador</h2>";
    }else   if(hash === "#/contacto"){
     $main.innerHTML = "<h2>Seccion del Contacto</h2>";
    }else if(hash.includes("#/post/")){       
        const post = hash.split("/");
        await  ajax({
  url:"http://localhost:8085/storerest/" + post[2],
  cbSuccess : (post)=>{
    console.log(post);
    let html = PostCardDetail(post);


    /*
    posts.forEach(post => {
     html += PostCard(post);
    });
 */
    d.getElementById("main").innerHTML=html;
  }
})
     //   $main.innerHTML = "<h2>Aquí cargará el contenido del Post previamente seleccionado</h2>";
    }else if(hash.includes("#/carousel")){   await  ajax({
  url:api.API_HARNINA,
  cbSuccess : (posts)=>{
    console.log(posts);
    let html = "";
    /*
    posts.forEach(post => {
     html += PostCard(post);
    });*/
 
    d.getElementById("main").innerHTML=html;
  }
})
            await  ajax({
  url:api.API_HARNINA,
  cbSuccess : (posts)=>{
    console.log(posts);
    let html = "";
    posts.forEach(post => {
     html += PostCard(post);
    });
 
    d.getElementById("main").innerHTML=html;
  }
})
     }
      d.querySelector(".loader").style.display = "none";
}