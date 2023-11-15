class filter {
    constructor(items) {
      this.items = items;
    }
  
    // Basic filter function to filter items based on a condition
    filterByCondition(conditionFunction) {
      return this.items.filter(conditionFunction);
    }
  }
  
  module.exports = { filter };
  