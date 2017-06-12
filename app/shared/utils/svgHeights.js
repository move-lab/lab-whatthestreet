import { fromJS } from 'immutable';

export function computeSvgHeights(cityMeta) {
  let svgHeights = fromJS({
    "car": {
      "parking": {
        "height": cityMeta.getIn(['metaData', 'parking', 'car','offStreet', 'svgHeight'])
      },
      "lanes": {
        "height": cityMeta.getIn(['metaData', 'moving', 'car', 'svgHeight'])
      }
    },
    "rail": {
      "parking": {
        "height": cityMeta.getIn(['metaData', 'parking', 'rail', 'svgHeight'])
      },
      "lanes": {
        "height": cityMeta.getIn(['metaData', 'moving', 'rail', 'svgHeight'])
      }
    },
    "bike": {
      "parking": {
        "height": cityMeta.getIn(['metaData', 'parking', 'bike', 'svgHeight'])
      },
      "lanes": {
        "height": cityMeta.getIn(['metaData', 'moving', 'bike', 'svgHeight'])
      }
    }
  });

  return svgHeights;
}
