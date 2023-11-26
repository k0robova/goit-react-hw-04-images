import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export function Searchbar({ onHandleSearchFormSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleSearchName = evt => {
    setImageName(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Type something in the search field !');
      return;
    }

    onHandleSearchFormSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmitForm}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchName}
          value={imageName}
        />
        <button type="submit" className={css.button_search}>
          <span className="button-label">Search</span>
        </button>
      </form>
    </header>
  );
}
