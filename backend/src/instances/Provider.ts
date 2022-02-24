export default interface Provider {
  /**
   * [Static]
   */
  initialize(option?: {}): void | Promise<void>;
  /**
   * [Errorable] [Static]
   */
  get(): unknown;
};

