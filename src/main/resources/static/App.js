
import {Loader} from "./components/Loader.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Router2 } from "./components/Router2.js";
import { Footer } from "./components/Footer.js";
import { FooterPage } from "./components/FooterPage.js";




export function App(){
 const  $root = document.getElementById("root");
  $root.innerHTML = null;
  Header($root);
  $root.appendChild(Main());
  $root.appendChild(Loader());
  $root.appendChild(FooterPage());
  
  

  Router2();
}