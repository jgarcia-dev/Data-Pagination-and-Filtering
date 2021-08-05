/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const itemsPerPage = 9;

/*
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
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   // append buttons
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   const linkListUL = document.querySelector('.link-list');

   linkListUL.innerHTML = '';

   for (let i = 1; i <= numOfPages; i++) {
      let liHTML = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;

      linkListUL.insertAdjacentHTML('beforeend', liHTML);
   }

   // add buttons style and functionality
   const firstPaginationButton = document.querySelector('.link-list li:first-child button');
   firstPaginationButton.className = 'active';

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


showPage(data, 1);
addPagination(data);