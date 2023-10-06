import React from 'react'
import { ReactComponent as Sun} from '../assets/sun.svg';
import {ReactComponent as Water} from '../assets/water.svg';

function CareScale({
    item,
    type
}) {
    const svgComponents = [];
  for (let i = 0; i < item; i++) {
    if (type === "water") {
      svgComponents.push(<Sun key={i} />);
    } else {
      svgComponents.push(<Water key={i} />);
    }
  }

  return (
    <>
        <div>
            {svgComponents}
        </div>
    </>
  )
}

export default CareScale