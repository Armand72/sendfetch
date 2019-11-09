import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      poster: "",
      comment: ""
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    const url = "https://post-a-form.herokuapp.com/api/movies/";

    fetch(url, config)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        alert(res.error);
      } else {
        alert(`film ajouté avec l'ID ${res}!`);
      }
    })
    .catch(e => {
      console.error(e);
      alert("Erreur lors de l'ajout du film");
    });
  }

  render() {
    
    return (
      <div className="FormEmployee">
        <h1>Movies</h1>

        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Send your movie</legend>
            <div className="form-data">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>

            <div className="form-data">
              <label htmlFor="poster">poster</label>
              <input
                type="text"
                id="poster"
                name="poster"
                onChange={this.onChange}
                value={this.state.poster}
              />
            </div>

            <div className="form-data">
              <label htmlFor="comment">Why?</label>
              <textarea
              type='text'
                id="comment"
                name="comment"
                onChange={this.onChange}
                value={this.state.comment}
                placeholder="We want your opinion!"
              />
            </div>
            <hr />
            <div className="form-data">
              <input type="submit" value="Envoyer" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default App;
