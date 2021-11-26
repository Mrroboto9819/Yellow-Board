import React, { useState } from 'react';
import axios from 'axios';

const signup = () => {
  const [state, setstate] = useState({
    data: {},
    userData: [],
    session: false,
    loading: false,
    error: null,
  });

  const setValue = (e) => {
    setstate({
      ...state,
      data: { ...state.data, [e.target.name]: e.target.value },
    });
  };

  return (
    <div>
      <form>
        <label>
          <span>Name</span>
          <input type="text" name="name" onChange={(e) => setValue(e)} />
        </label>
        <label>
          <span>LastName</span>
          <input type="text" name="lastname" onChange={(e) => setValue(e)} />
        </label>
        <label>
          <span>Username</span>
          <input type="text" name="username" onChange={(e) => setValue(e)} />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => setValue(e)}
          />
        </label>
        <label>
          <span>Type</span>
          <input type="text" name="userType" onChange={(e) => setValue(e)} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="mail" onChange={(e) => setValue(e)} />
        </label>
        <label>
          <span>Direccion</span>
          <textarea
            type="text"
            name="direccion"
            onChange={(e) => setValue(e)}
          ></textarea>
        </label>
        <label>
          <span>Phone</span>
          <input type="text" name="phone" onChange={(e) => setValue(e)} />
        </label>
        <label>
          <span>Birthday</span>
          <input type="text" name="birthday" onChange={(e) => setValue(e)} />
        </label>
        <button
          type="button"
          onClick={async () => {
            let res = await axios.post('api/signup', state.data);
          }}
        >
          Sigup
        </button>
      </form>
    </div>
  );
};

export default signup;
