import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        // response destructure to {user} obj
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    }

  return (
    <div>
      <h1>Sigh In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
