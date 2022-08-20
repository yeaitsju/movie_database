// The "search form" component's job is to retrieve movies based on the information the user types into the form.
export default class SearchForm {
  constructor() {}

  drawForm() {
    // the job of this method is to display a form to the HTML
    const formTemplate = `
        <form>
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
        required="required"
      />

      <br />
      <label class="control-label" for="plot">Plot:</label>
      <select name="plot" id="plot" style="width: 65px">
        <option value="short">Short</option>
        <option value="full">Full</option>
      </select>
      <br />
      <div id="go">
        <button id="go" type="submit">Go</button>
      </div>
    </form>
        `;
  }

  search() {
    // the job of this method is to send the search to the cloud (OMDB)
  }

  displayResults() {
    //the job of this method is to display the movie once tge responce comes back from the cloud
  }
}
