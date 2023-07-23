var displayDefaultList = document.querySelector('.movie_list')
var search=document.getElementById("search");
var page = document.getElementById("page");

movieList(1);

async function movieList(pageNumber)
{
    if(search.value=='')
    {
     console.log(11);
     const result = await fetch(`http://www.omdbapi.com/?s=thor&page=${pageNumber}&apikey=51dc8ff4`);
     const data = await result.json(); 
     displayDefault(data.Search);   
    }
    else
    {
        const result = await fetch(`http://www.omdbapi.com/?s=${search.value}&page=${pageNumber}&apikey=51dc8ff4`);
        const data = await result.json(); 
        displayDefault(data.Search);   
    }
   // console.log(data.Search);
    
}



function displayDefault(movie){
    displayDefaultList.innerHTML='';
    for(var i=0;i<movie.length;i++)
    {
        movieItem = document.createElement('li');
        movieItem.innerHTML = `<div class="movie_element">
                         <div class="movie_poster">
                                    <img src=${movie[i].Poster} width='220px' height='120px'>
                          </div>
                          <div class="movie-title">
                               ${movie[i].Title}</div></div>`
                          
        displayDefaultList.append(movieItem);
      //  console.log(movie.length);
        }
        
}

async function searchMovies()
{
  if(search.value=="")
  {
    movieList(1);
  }
  else
  {
  const result = await fetch(`http://www.omdbapi.com/?s=${search.value}&apikey=51dc8ff4`);
   const data=await result.json();
    displayDefault(data.Search);
  } 
   // console.log(data.Search);
}






function nextPage() {
    let elPage = page.innerText;
    let pageNum = Number(elPage);
    movieList( pageNum+1);
    page.innerHTML = `
        <a onclick="previousPage()">
        <i class="fa fa-angle-double-left">
        </i>
        </a>
    ${pageNum + 1}
        <a onclick="nextPage()">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    scroll(0,0);
}

function previousPage() {
    let elPage = page.innerText;
    let pageNum = Number(elPage);
    movieList(pageNum-1);
    if (pageNum === 2) {
        page.innerHTML = `${pageNum-1}
        <a onclick="nextPage()">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    } else {
        page.innerHTML = `
        <a onclick="previousPage()">
        <i class="fa fa-angle-double-left">
        </i>
        </a>
    ${pageNum-1}
        <a onclick="nextPage()">
        <i class="fa fa-angle-double-right">
        </i>
        </a>
    `;
    }
    scroll(0,0);
}