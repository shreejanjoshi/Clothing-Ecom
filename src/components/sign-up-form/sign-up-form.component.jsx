import { async } from "@firebase/util";
import { useState } from "react";
import Button from "../button/button.component";

import './sign-up-form.styles.scss';

import FormInput from "../form-input/form-input.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // is a obj now
  const [formFields, setFormFields] = useState(defaultFormFields);
  // desturucting
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  // after done to creating the user empty the value
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    //   default behaivor of the form all the change that will happen we wil handle
    event.preventDefault();

    if (password != confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      //pass into final doc
      await createUserDocumentFromAuth(user, { displayName });
      //after yoy sucessfully create the user call this methode which will empty the value
      resetFormFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encounter an error", error);
      }
    }
  };

  // what happen when value change and update form fields
  const handleChange = (event) => {
    //   target will give the things that are attached to yhis input
    const { name, value } = event.target;

    // So in order for us to now appropriately trigger, we can now say, hey, give me the value as well off the event because these will now come in through the event object. And then all we need to do now is just, say, set form fields and what we're going to set. It is an object because we're only going to be updating one input. All I want to do is I want only to update the appropriate form field. So all the other fields that were previously on the state, I want them to be spread on. So this will spread all of the fields and then we're just going to update the appropriate field by using these square brackets inside of our object notation. So this says, Oh, take this value and apply it here from this variable of name and the value will be the value.
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
    <h2>Don't have a account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          // inputOptions={{
          //   type: "text",
          //   required: true,
          //   onChange: handleChange,
          //   name: "displayName",
          //   value: displayName,
          // }}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
