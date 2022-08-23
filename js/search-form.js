import { apiKey } from "./key.js";
// The "search form" component's job is to retrieve movies based on the information the user types into the form.
export default class SearchForm {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  drawForm() {
    // the job of this method is to display a form to the HTML
    const formTemplate = `
        <form id="form">
      <label class="control-label" for="title">Title:</label>
      <input type="text" placeholder="Search.." id="title" required />
      <br />

      <label class="control-label" for="year">Year:</label>
      <input
        type="number"
        placeholder="Year"
        minlength="4"
        maxlength="4"
        id="year"
        
      />

      <br />
      <label class="control-label" for="plot">Plot:</label>
      <select name="plot" id="plot" style="width: 65px">
        <option value="short">Short</option>
        <option value="full">Full</option>
      </select>
      <br />
      <div id="go">
        <button id="go" class="go" type="submit">Go</button>
        <button id="reset" class="go" >Reset</button>
        <button id="show-favorites" class="go" >Show Favorites</button>
      </div>
    </form>
        `;
    document.querySelector(".form-container").innerHTML = formTemplate;
    document
      .querySelector("form")
      .addEventListener("submit", this.search.bind(this));
    document
      .querySelector("#reset")
      .addEventListener("click", this.clearScreen.bind(this));
    document
      .querySelector("#show-favorites")
      .addEventListener("click", this.loadFavorites.bind(this));
  }

  //prevent default method and saying i dont want you to refresh the page
  search(ev) {
    // the job of this method is to send the search to the cloud (OMDB)
    ev.preventDefault();
    console.log("Search!");
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const plot = document.querySelector("#plot").value;

    //template literals (by using backtick) allows us to embed variables within our string
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;
    console.log(url);

    //below is fetching my data from the internet
    fetch(url)
      .then((response) => response.json())
      .then(
        ((data) => {
          console.log(data);
          this.stateManager.notify("movie-found", [data]);
        }).bind(this)
      );
  }

  clearScreen(ev) {
    ev.preventDefault();
    document.querySelector("#title").value = "";
    document.querySelector("#year").value = "";

    this.stateManager.notify("clear-everything");
  }
  loadFavorites(ev) {
    ev.preventDefault();
    this.stateManager.loadFavorites();
  }
}
