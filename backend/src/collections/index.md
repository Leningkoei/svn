## File Map

* id;
* original name: string;
* file name: string;

## File

* id;
* name: string;
* type: "directory" | "file";
* fold: boolean;
* path: string[];
* child ids: File.id[];
- file map id: null | File Map.id;

## User

* id;
* name: string;
- root file id: File.id;

## actions

* want to get root and its children:
    request `User.id` ->
    read `User.root file id` ->
    read `File.child ids` ->
    record every child's name to `result: string[]` ->
    response `result`

