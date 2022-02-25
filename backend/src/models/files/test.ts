import CommonFile from "./CommonFile.js";
import File from "./File.js";
import Folder from "./Folder.js";

const rootFolder: Folder = new Folder(
  /* name */ "root",
  /* path */ [ "root" ],
  /* isFold */ false,
  /* children */ []
);
const files: Folder = new Folder(
  /* name */ "files",
  /* path */ [ "root", "files" ],
  /* isFold */ false,
  /* children */ []
);
const users: Folder = new Folder(
  /* name */ "users",
  /* path */ [ "root", "users" ],
  /* isFold */ false,
  /* children */ []
);

const EM: CommonFile = new CommonFile(
  /* name */ "EM",
  /* filename */ "dkjalkfja",
  /* path */ [ "root", "EM" ]
);
const M: CommonFile = new CommonFile(
  /* name */ "M",
  /* filename */ "djfajfkjaka",
  /* path */ [ "root", "M" ]
);
const CF: CommonFile = new CommonFile(
  /* name */ "CF",
  /* filename */ "djfajfkjaka",
  /* path */ [ "root", "files", "CF" ]
);
const EF: CommonFile = new CommonFile(
  /* name */ "EF",
  /* filename */ "djfajfkjaka",
  /* path */ [ "root", "files", "EF" ]
);
const T: CommonFile = new CommonFile(
  /* name */ "T",
  /* filename */ "djfajfkjaka",
  /* path */ [ "root", "files", "T" ]
);
const EU: CommonFile = new CommonFile(
  /* name */ "EU",
  /* filename */ "djfajfkjaka",
  /* path */ [ "root", "users", "EU" ]
);
const U: CommonFile = new CommonFile(
  /* name */ "U",
  /* filename */ "dkdasjfkj",
  /* path */ [ "root", "users", "U" ]
);

rootFolder.add(files);
rootFolder.add(users);
rootFolder.add(EM);
rootFolder.add(M);
files.add(CF);
files.add(EF);
files.add(T);
users.add(EU);
users.add(U);

rootFolder.print();

const F: CommonFile = new CommonFile(
  /* name */ "F",
  /* filename */ "jdkajflakds",
  /* path */ [ "root", "files", "F" ]
);
const usersKai: CommonFile = new CommonFile(
  /* name */ "users",
  /* filename */ "jdkajflakds",
  /* path */ [ "root", "files", "F" ]
);
const FParent: Folder = <Folder> rootFolder.find(
  /* path */ F.getPath().slice(0, F.getPath().length - 1),
  /* type */ Folder
);
FParent.add(F);
FParent.add(usersKai);
users.setIsFold(true);

rootFolder.print();

