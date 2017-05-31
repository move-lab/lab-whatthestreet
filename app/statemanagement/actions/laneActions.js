import { LANES } from '../constants';

export function setLane(name, neighborhood, length, area, cumulativeArea) {
  return {
    type: LANES.SET_LANE,
    neighborhood,
    name,
    length,
    area,
    cumulativeArea: parseInt(cumulativeArea)
  };
}
