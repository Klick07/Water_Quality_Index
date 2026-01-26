const { stateExists } = require("../repositories/search.repo");
const { normalize_q } = require("../utils/normalize_q");
const { searchByLocationService } = require("./searchByLocation.service");
const { searchByStateService } = require("./searchByStation.service");

exports.searchService = async (q) => {
  const normalized_q = normalize_q(q);

  const isState = await stateExists(normalized_q);

  if (isState) {
    return searchByStateService(normalized_q);
  }

  return searchByLocationService(normalized_q);
};
