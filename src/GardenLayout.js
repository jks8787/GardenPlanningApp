import React, { Component, PropTypes } from 'react';
import './GardenLayout.css';

export default class GardenLayout extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    completed: PropTypes.bool,
    text: PropTypes.string
  }

  setUpLayout(plantMapData) {
    const height = parseInt(plantMapData.split(", ")[0]);
    const width = parseInt(plantMapData.split(", ")[1]);
    const offset = 5;
    const blockSize = 20;
    const numberOfblocksInRow = Math.ceil((width / (20 + offset)));
    const numberofRows =  Math.ceil((height / (20 + offset)));
    const numOfPlantBlocksPerRow = (numberOfblocksInRow/2);
    const numOfSpaceBlocksPerRow = Math.ceil((numberOfblocksInRow/2));

    function plantBlocks(num, cols){
     let plantBlockItems = [];
     const rowPlantKeysArray = Array.apply(null, {length: num}).map(Number.call, Number);
     const colsPlantKeysArray = Array.apply(null, {length: cols}).map(Number.call, Number);

     colsPlantKeysArray.forEach(function(col) {
       rowPlantKeysArray.forEach(function(row){
         let factor = (row + (row + 1));
         let plant = {x: ((blockSize + offset) * factor), y: ((blockSize + offset) * col) }
         plantBlockItems.push(plant);
       })
     })
     return plantBlockItems;
    };

    function spaceBlocks(num, cols){
     let spaceBlockItems = [];
     const rowSpaceKeysArray = Array.apply(null, {length: num}).map(Number.call, Number);
     const colsSpaceKeysArray = Array.apply(null, {length: cols}).map(Number.call, Number);

     colsSpaceKeysArray.forEach(function(col) {
       rowSpaceKeysArray.forEach(function(row){
         let factor = (row + row);
         let space = {x: ((blockSize + offset) * factor), y: ((blockSize + offset) * col) }
         spaceBlockItems.push(space);
       })
     })
     return spaceBlockItems;
    };

    const pl = plantBlocks(numOfPlantBlocksPerRow, numberofRows);
    const sp = spaceBlocks(numOfSpaceBlocksPerRow, numberofRows);
    const data = {
      plantBlocks: pl,
      spaceBlocks: sp,
      totalHeight: height,
      totalWidth: width,
      constOffset: offset,
      setBlockSize: blockSize
    };
    return data;
  }

  renderGardenLayouts() {
    const dataForGardenLayout = this.setUpLayout(this.props.text);
    const onClick = this.props.onClick;
    const completed = this.props.completed;
    return (
      <div className={`garden-layout-completed-${completed} column`}>
        <div className={`garden-layout-completed-${completed}__svg-wrap`}>
          <svg
            width={dataForGardenLayout.totalWidth - dataForGardenLayout.constOffset}
            height={dataForGardenLayout.totalHeight - dataForGardenLayout.constOffset}
          >
          <g>
            <rect
              x='0'
              y='0'
              width={dataForGardenLayout.totalWidth}
              height={dataForGardenLayout.totalHeight}
              fill='green'
              stroke='darkgreen'
            />
            {dataForGardenLayout.plantBlocks.map(plant =>
              <rect
                x={plant.x}
                y={plant.y}
                width={dataForGardenLayout.setBlockSize}
                height={dataForGardenLayout.setBlockSize}
                fill='lightgreen'
                key={`${plant.x}${plant.y}`}
              />
            )}
            {dataForGardenLayout.spaceBlocks.map(space =>
              <rect
                x={space.x}
                y={space.y}
                width={dataForGardenLayout.setBlockSize}
                height={dataForGardenLayout.setBlockSize}
                fill='pink'
                key={`${space.x}${space.y}`}
              />
            )}
          </g>
          </svg>
        </div>
        {
          completed ? null :
            <button
              onClick={onClick}
            >
              mark completed
            </button>
        }
      </div>
    );
  }

  render() {
    return (
      <div className='garden-layout'>
        {this.renderGardenLayouts()}
      </div>
    );
  }
}
