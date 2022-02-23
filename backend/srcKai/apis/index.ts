import GetRootFolder from "./GetRootFolder.js";
import SignIn        from "./SignIn.js";
import SignUp        from "./SignUp.js";

export default function setListeners(): void {
  const getRootFolder: GetRootFolder =
    new GetRootFolder("/server/get-root-directory");
  const signIn: SignIn = new SignIn("/server/sign-in");
  const signUp: SignUp = new SignUp("/server/sign-up");

  getRootFolder.setListener();
  signIn.setListener();
  signUp.setListener();
};

