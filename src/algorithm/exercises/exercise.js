module.exports = class Exercise {
  constructor(options) {
    this.id = options.id;
    this.type = options.type;
    this.musclesUsed = options.musclesUsed;

    // {name, group, images: {first, second}}
    this.info = options.info;
  }
};