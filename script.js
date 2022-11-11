
const search = document.querySelector("input");


let userName;
let userOwner;
let userStars;




async function getRepo(value) {
    try {  
  const response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=5`)
        const responseJSON = await response.json()
        search.innerHTML = ''
       const responseUser = responseJSON.items.forEach((i) => { 
            const fragment = new DocumentFragment();
            const promtItem = document.createElement("li");
            promtItem.classList.add("promptItem");
            userName = promtItem.textContent = i.name;
            userOwner = i.owner.login;
            userStars = i.stargazers_count;
            fragment.append(promtItem);
            return promtCard.append(fragment);
    });
       } catch (e) { 
         console.log('Ошибка!');
     }    
  }
 
 

function changeHandler(e) {
  deletePromptList();
  getRepo(e.target.value);
}

const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};

const debaunceChangeHandler = debounce(changeHandler, 300);

search.addEventListener("input", debaunceChangeHandler);

const promtCard = document.querySelector(".promptCard");



const createForList = document.querySelector(".list");
createForList.classList.add("list");

 

function card(name, owner, stars) {
  name = userName;
  owner = userOwner;
  stars = userStars;
  const createCardLi = document.createElement("li");
  createCardLi.classList.add("item");

  const user = document.createElement("span");
  user.classList.add("info-item");

  const cardName = document.createElement("div");
  cardName.classList.add("card-name");
  cardName.textContent = `Name: ${name}`;
  user.append(cardName);

  const cardOwner = document.createElement("div");
  cardOwner.classList.add("card-owner");
  cardOwner.textContent = `Owner: ${owner} `;
  user.append(cardOwner);

  const cardStars = document.createElement("div");
  cardStars.classList.add("card-stars");
  cardStars.textContent = `Stars: ${stars} `;
  user.append(cardStars);

  const btn = document.createElement("button");
  btn.classList.add("card-close");
  btn.setAttribute("type", "button");

  createCardLi.append(user);
  createCardLi.append(btn);
  return createForList.append(createCardLi);
}

function cardAdd() {
  card();
  deletePromptList();
}

function deletePromptList() {
  const childrenArr = [...promtCard.children];
  childrenArr.forEach((el) => {
    el.remove();
  });
}

promtCard.addEventListener("click", cardAdd);

createForList.addEventListener("click", clearBtn);

function clearBtn(e) {
  if (e.target.className === "card-close") e.target.closest(".item").remove();
}
