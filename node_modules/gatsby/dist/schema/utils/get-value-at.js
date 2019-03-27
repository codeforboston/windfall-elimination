"use strict";

const getValueAt = (obj, selector) => {
  const selectors = Array.isArray(selector) ? selector : selector.split(`.`);
  return selectors.reduce((acc, key) => {
    if (acc && typeof acc === `object`) {
      if (Array.isArray(acc)) {
        return acc.map(a => a && typeof a === `object` ? a[key] : undefined).filter(a => a !== undefined);
      }

      return acc[key];
    }

    return undefined;
  }, obj);
};

module.exports = {
  getValueAt
};
//# sourceMappingURL=get-value-at.js.map