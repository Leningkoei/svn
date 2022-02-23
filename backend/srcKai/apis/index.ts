import ChangeFold    from "./ChangeFold.js";
import CreateFolder  from "./CreateFolder.js";
import GetRootFolder from "./GetRootFolder.js";
import SignIn        from "./SignIn.js";
import SignUp        from "./SignUp.js";

export default function setListeners(): void {
  const changeFold: ChangeFold = new ChangeFold("/server/change-fold");
  const createFolder: CreateFolder =
    new CreateFolder("/server/create-directory");
  const getRootFolder: GetRootFolder =
    new GetRootFolder("/server/get-root-directory");
  const signIn: SignIn = new SignIn("/server/sign-in");
  const signUp: SignUp = new SignUp("/server/sign-up");

  changeFold.setListener();
  createFolder.setListener();
  getRootFolder.setListener();
  signIn.setListener();
  signUp.setListener();
};

