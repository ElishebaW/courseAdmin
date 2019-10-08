import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { newAuthor } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageAuthorsPage({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    } else {
      setAuthor({ ...props.author });
    }
  }, []);

  function handleChange(event) {
    debugger;
    const { value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      value
    }));
  }

  function formIsValid() {
    const errors = {};
    debugger;

    if (!author) errors.author = "Author is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    debugger;
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author)
      .then(() => {
        toast.success("Author saved.");
        history.push("/authors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageAuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  author: PropTypes.object.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getAuthorById(authors, id) {
  return authors.find(author => author.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const author =
    state.authors.length > 0
      ? getAuthorById(state.authors, parseInt(id, 10))
      : newAuthor;
  return {
    author,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  saveAuthor: authorActions.saveAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorsPage);
