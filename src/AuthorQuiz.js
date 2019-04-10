import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="jumbotron col-10 offset-1">
      <h1>The Author Quiz</h1>
      <p>Select the book written by the author shown</p>
    </div>
  );
};

function Turn({ author, books, highlight, onAnswerSelected }) {
  const highlightBgc = highlight => {
    const mapping = {
      none: "",
      correct: "green",
      wrong: "red"
    };
    return mapping[highlight];
  };

  return (
    <div
      className="row turn"
      style={{ backgroundColor: highlightBgc(highlight) }}
    >
      <div className="col-4 offset-1">
        <p>Image of {author.name}</p>
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}

const Book = ({ title, onClick }) => {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
};

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

const Continue = ({ show, onContinue }) => {
  return (
    <div className="row continue">
      {show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
};

const Footer = () => {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from{" "}
          <a
            href="http://commons.wikimedia.org/wiki/Main-page"
            alt="pic of an author"
          >
            http://commons.wikimedia.org/wiki/Main-page
          </a>
          and are in the public domain
        </p>
      </div>
    </div>
  );
};

function AuthorQuiz({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue show={highlight === "correct"} onContinue={onContinue} />
      <p>
        <Link to="/add">Add an author </Link>
      </p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;