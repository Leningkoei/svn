import ExportedModel from "./ExportedModel.js";

export default interface Model {
  /* static */ importFields(fields: ExportedModel): Model;

  exportFields(): ExportedModel;

  getName(): string;
};

