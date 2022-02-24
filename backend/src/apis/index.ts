import ChangeFold    from "./ChangeFold.js";
import CreateFolder  from "./CreateFolder.js";
import DeleteFile    from "./DeleteFile.js";
import DeleteFolder  from "./DeleteFolder.js";
import DownloadFile  from "./DownloadFile.js";
import GetRootFolder from "./GetRootFolder.js";
import SignIn        from "./SignIn.js";
import SignUp        from "./SignUp.js";
import UploadFile    from "./UploadFile.js";

export default function setListeners(): void {
  const changeFold: ChangeFold =
    new ChangeFold("/server/change-fold");
  const createFolder: CreateFolder =
    new CreateFolder("/server/create-directory");
  const deleteFile: DeleteFile =
    new DeleteFile("/server/delete-file");
  const deleteFolder: DeleteFolder =
    new DeleteFolder("/server/delete-directory");
  const downloadFile: DownloadFile =
    new DownloadFile("/server/download-file");
  const getRootFolder: GetRootFolder =
    new GetRootFolder("/server/get-root-directory");
  const signIn: SignIn =
    new SignIn("/server/sign-in");
  const signUp: SignUp =
    new SignUp("/server/sign-up");
  const uploadFile: UploadFile =
    new UploadFile("/server/upload-file", "file", "./files");

  changeFold.setListener();
  createFolder.setListener();
  deleteFile.setListener();
  deleteFolder.setListener();
  downloadFile.setListener();
  getRootFolder.setListener();
  signIn.setListener();
  signUp.setListener();
  uploadFile.setListener();
};

