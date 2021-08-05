/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   const studentUL = document.querySelector('.student-list');

   studentUL.innerHTML = '';
   
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
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   const linkListUL = document.querySelector('.link-list');

   linkListUL.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      let pageNumHTML = `
      <li>
         <button type="button">${i}</button>
      </li>
      `
      linkListUL.insertAdjacentHTML('beforeend', pageNumHTML);
   }

   const firstPaginationButton = document.querySelector('.link-list').firstElementChild.firstElementChild;
   firstPaginationButton.className = 'active';

   linkListUL.addEventListener('click', (e)=> {
      if(e.target.tagName === 'BUTTON') {
         const prevActive = document.querySelector('.active');
         prevActive.className = '';

         e.target.className = 'active';

         showPage(list, e.target.textContent);
      }
   })
}


// Call functions
showPage(data, 1);
addPagination(data);