import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AuthorsForm = ({
  author,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  debugger;
  return (
    <form onSubmit={onSave}>
      <h2>{author.id ? "Edit" : "Add"} Author</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        key={author.id}
        name="name"
        label="Author Name"
        value={author.name}
        onChange={onChange}
        error={errors.authorName}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

AuthorsForm.propTypes = {
  author: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default AuthorsForm;
