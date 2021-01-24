
import api from "../helpers/harni_api.js";
import {ajax} from "../helpers/ajax.js";
import {PostCardSimple} from "./PostCard.js";
import {PostCardExamen} from "./PostCardExamen.js";
import { SwiperExam } from "../helpers/mySwiper.js";
import { SwiperJaremo } from "../helpers/jaremoSwiper.js";
import { PostCardJaremo } from "./PostCardJaremo.js";




export async function Router2(){

  var APP = APP || {}
  sessionStorage.setItem("showcaseType", "showcaseshmJM");
  

 document.addEventListener("click", (e)=>{
    let uri = api.API_HARNINA;
     switch (e.target.id ) {
      case 'firstPage': 
        callApiRest(uri);
         break;
      case 'previousPage': 
        callApiRest(uri+document.getElementById("previousPage").dataset.valor);
        break;
      case 'nextPage': 
         callApiRest(uri+ document.getElementById("nextPage").dataset.valor);
        break;
      case 'endPage': 
        callApiRest(uri+document.getElementById("endPage").dataset.valor);
        break;
     
      case 'showcaseshmJM': 
         sessionStorage.setItem("showcaseType", "showcaseshmJM");
         renderShowcase();        
         break;
         
      case 'showcaseshmCarrusel': 
           sessionStorage.setItem("showcaseType", "showcaseshmCarrusel");
            renderShowcase();
           break;
      case 'showcaseshmJaremo': 
              sessionStorage.setItem("showcaseType", "showcaseshmJaremo");
             renderShowcase();
              break;
      case 'showcaseshmExamen':
             sessionStorage.setItem("showcaseType", "showcaseshmExamen");
             renderShowcase();
             break;
     }    
  });
const menuPage = function(){
    const posts = APP.data;
       console.log(posts);
       document.getElementById("currentPage").innerHTML = posts.pageable.pageNumber + 1;
       if  (posts.first){
             document.getElementById("firstPage").style.display = "none";
             document.getElementById("previousPage").style.display = "none";
       }else {
           document.getElementById("previousPage").dataset.valor = posts.pageable.pageNumber - 1;
          document.getElementById("firstPage").style.display = "block";
          document.getElementById("previousPage").style.display = "block";
      }
      if  (posts.last) {
          document.getElementById("nextPage").style.display = "none";
          document.getElementById("endPage").style.display = "none";
      }else {         
          document.getElementById("nextPage").dataset.valor = posts.pageable.pageNumber + 1;
           document.getElementById("endPage").dataset.valor = posts.totalPages - 1;
          document.getElementById("nextPage").style.display = "block";
          document.getElementById("endPage").style.display = "block";
       }                  
}
const renderShowcaseShmJM = function(){
       let html = "";
       APP.data.content.forEach(post => {
            html += PostCardSimple(post);
        }); 
       document.getElementById("main").innerHTML=html;   
}
const renderShowcaseShmCarrusel = function(){
       let html = "Hola Carrusel";      
       document.getElementById("main").innerHTML=html;   
}
const renderShowcaseShmJaremo = function(){
  let html = `<div class="swiper-container">
  <div class="swiper-wrapper">`;
  APP.data.content.forEach(post => {
       html += PostCardJaremo(post);
   });
   html += `</div>
   <div class="swiper-scrollbar"></div>
   </div>
   `;
   document.getElementById("main").innerHTML=html;
   SwiperJaremo();  
}
const renderShowcaseShmExamen = function(){
       let html = `<div class="swiper-container">
       <div class="swiper-wrapper">`;
       APP.data.content.forEach(post => {
            html += PostCardExamen(post);
        });
        html += `</div>
        <div class="swiper-pagination"></div>
        <div class="swiper-scrollbar"></div>
        </div>
        `;
        document.getElementById("main").innerHTML=html;
        SwiperExam();
}
const renderShowcase = function(){
 // const myPosts = posts || APP.data;
  
  switch (sessionStorage.getItem("showcaseType")) {     
         case '': 
                         renderShowcaseShmJM();
                          break;                   
          case 'showcaseshmJM': 
                         renderShowcaseShmJM();
                          break;
          case 'showcaseshmCarrusel': 
                          renderShowcaseShmCarrusel();
                            break;
                   
          case 'showcaseshmJaremo':
                           renderShowcaseShmJaremo();
                            break;
                        
           case 'showcaseshmExamen': 
                          renderShowcaseShmExamen();
                            break;
                        }
                  
}
const  callApiRest = async function(uri){  
   await  ajax({
              url:uri,
              cbSuccess : (posts)=>{
                 APP.data =  posts;
                 menuPage();
                 renderShowcase();              
              }
        });
 document.querySelector(".loader").style.display = "none";
}

 callApiRest(api.API_HARNINA);

}


