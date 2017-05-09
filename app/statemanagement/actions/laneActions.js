import { LANES } from '../constants';

export function setLane(name, neighborhood, length, area, coordinates) {
  console.log(coordinates);
  return {
    type: LANES.SET_LANE,
    neighborhood,
    name,
    length,
    area,
    coordinates,
  };
}
