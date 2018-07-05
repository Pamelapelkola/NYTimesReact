import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Articles extends Component {
  
  state = {
    articles: [],
    title: "",
    date: "",
    url: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadArticles();
  }

   loadArticles = () => {
    API.getArtricles()
      .then(res =>
        this.setState({ articles: res.data, title: "", Date: "", url: "" })
      )
      .catch(err => console.log(err));
  };

    deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.date) {
      API.saveArticle({
        title: this.state.title,
        author: this.state.date,
        synopsis: this.state.url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date (required)"
              />
              <TextArea
                value={this.state.url}
                onChange={this.handleInputChange}
                name="url"
                placeholder="url (Optional)"
              />
              <FormBtn
                disabled={!(this.state.date && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.Articles.length ? (
              <List>
                {this.state.Articles.map(article => {
                  return (
                    <ListItem key={article._id}>
                      <a href={"/books/" + article._id}>
                        <strong>
                          {article.title} by {article.date}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
