const home = document.getElementById('home');

let data, globalId;
let showFullDescription = false;

const mobileBtn = (e) =>{
    e.querySelector('i').classList.toggle('bx-x');
    document.body.classList.toggle('active');
}

const getData = async() =>{

    try{
      const res = await fetch('https://raw.githubusercontent.com/ProgrammingHero1/insta-shohor/main/data/posts.json');
     data = await res.json();
     showCard(data);

    }catch(err){
      console.log(err.message);
    }

  
}

const showCard = (data) =>{
  console.log(data);
  data?.forEach(element => {
    const {comments, description, id, image, userImage} = element;

    const cardDiv = document.createElement('article');
    cardDiv.classList.add('post');

    cardDiv.innerHTML = `
     <figcaption>
      <img src=${image} />
     </figcaption>
     <div class="card-body">
     <div class="card-action-button">
      <div class="like-area">
       <button>
       <i class='bx bxs-heart'></i>
       </button>
       <button>
       <i class='bx bxs-message-rounded-dots'></i>
       </button>
      </div>
      <div class="report-area">
      <button>
      <i class='bx bx-block'></i>
      </button>
      </div>
     </div>
     <p id="description">
    //  ${description.length > 30 ? `${description.slice(0,30)}`: description}
     <button onclick="readMore(${id})">Read more</button>
     ${globalId == id ? `${description}` : description.slice(0,30)}
     </p>
     <div></div>
     </div>
    `;
    home.appendChild(cardDiv);
  });
}



const toggleDescription = () => {
  showFullDescription =  !showFullDescription;
  showCard(data);
}

const readMore = (id) => {
  globalId = id;
  toggleDescription();
  console.log(showFullDescription);
  showCard(data);
}

showCard();
getData();


