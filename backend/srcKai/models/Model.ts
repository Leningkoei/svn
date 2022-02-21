import ExportedModel from "./ExportedModel.js";

export default interface Model {
  exportFields(): ExportedModel;

  getName(): string;
};

