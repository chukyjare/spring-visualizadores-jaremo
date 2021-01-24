export function FooterPage(){

    const $menu = document.createElement("footer");
  $menu.classList.add("menu");
  $menu.innerHTML =` <div class="h-auto overflow-hidden flex items-center justify-center" style="background: #edf2f7;">
    <nav class="flex flex-row items-center justify-between flex-wrap bg-teal p-6">
 
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto bg-gray-300">
  
    <span id="firstPage" class="inline-block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">First</span>
    <span id="previousPage" data-valor="" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Previous</span>
       <span id="currentPage" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"></span>
        <span id="nextPage" data-valor="" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">Next</span>
        <span id="endPage" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4 " >End</span>

   
  </div>
</nav>
</div>`;


    return $menu;

}