/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const itemsPerPage = 9;


/*
This function will add a search bar to the page
*/
function addSearchComponent(list) {
   const header = document.querySelector('header');
   const searchBarHTML = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   header.insertAdjacentHTML('beforeend', searchBarHTML);

   const searchBar = document.querySelector('.student-search input');
   const searchBtn = document.querySelector('.student-search button');

   // event listeners
   searchBar.addEventListener('keyup', ()=> {
      displayMatches(list, searchBar.value);
   });

   searchBar.addEventListener('keypress', (e)=> {
      // if "Enter" key pressed
      if (e.keyCode === 13) {
         displayMatches(list, searchBar.value);
      }
   });

   searchBtn.addEventListener('click', ()=> {
      displayMatches(list, searchBar.value);
   });
}

/*
This function takes a list and search string and displays the paginated results on the page
*/
function displayMatches(list, search) {
   const query = search.trim().toLowerCase();
   const matches = [];

   for(let i = 0; i < list.length; i++) {
      const searchableName = `${list[i].name.first} ${list[i].name.last}`.toLowerCase();
      if ( searchableName.includes(query) ) {
         matches.push(list[i]);
      }
   }

   //return matches;

   if(matches) {
      showPage(matches, 1);
      addPagination(matches);
   }
}


/*
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentUL = document.querySelector('.student-list');

   studentUL.innerHTML = '';
   
   if (list !== undefined && list.length > 0) {
      for(let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            let studentDetailsHTML = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span>
               </div>
            </li>
            `
            studentUL.insertAdjacentHTML('beforeend', studentDetailsHTML);
         }
      }
   } else {
      const noResultsHTML = "<span class='no-results'>Sorry, no results</span>"
      studentUL.insertAdjacentHTML('beforeend', noResultsHTML);
   }   
}


/*
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   const linkListUL = document.querySelector('.link-list');

   linkListUL.innerHTML = '';

   if (list !== undefined && list.length > 0) {
      // add pagination buttons
      for (let i = 1; i <= numOfPages; i++) {
         let liHTML = `
         <li>
            <button type="button">${i}</button>
         </li>
         `;
         linkListUL.insertAdjacentHTML('beforeend', liHTML);
      }
   
      // add style to first pagination button
      const firstPaginationButton = document.querySelector('.link-list li:first-child button');
      firstPaginationButton.className = 'active';
   
      // event listener for pagination buttons
      linkListUL.addEventListener('click', (e)=> {
         if(e.target.tagName === 'BUTTON') {
            let numBtn = e.target;
            let currActive = document.querySelector('.active');
   
            currActive.className = '';
            numBtn.className = 'active';
   
            showPage(list, numBtn.textContent);
         }
      });
   }
}



addSearchComponent(data);
showPage(data, 1);
addPagination(data);