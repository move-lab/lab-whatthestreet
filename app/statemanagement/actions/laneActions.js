import { LANES } from '../constants';

export function setLane(id, name, neighborhood, length, area, cumulativeArea) {
  return {
    type: LANES.SET_LANE,
    id,
    neighborhood,
    name,
    length,
    area,
    cumulativeArea: parseInt(cumulativeArea)
  };
}

export function setLaneRailParking(id, name, neighborhood, length, area, cumulativeArea) {
  return {
    type: LANES.SET_LANE_RAILPARKING,
    id,
    neighborhood,
    name,
    length,
    area,
    cumulativeArea: parseInt(cumulativeArea)
  };
}

export function clearLane() {
  return {
    type: LANES.CLEAR_LANE
  }
}
