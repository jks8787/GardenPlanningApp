import React, { Component, PropTypes } from 'react';
import './GardenLayout.css';

export default class GardenLayout extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    completed: PropTypes.bool,
    data: PropTypes.object
  }

  componentWillMount() {
    this.boundhandleOnClickToViewDetail = this.handleOnClickToViewDetail.bind(this);
    this.boundhandleOnClickToCloseDetail = this.handleOnClickToCloseDetail.bind(this);
  }

  setUpLayout(plantMapData, style) {
    const height = (style === 'detail') ? (plantMapData.get('height') * 1.75) : plantMapData.get('height');
    const width = (style === 'detail') ? (plantMapData.get('width') * 1.75) : plantMapData.get('width');
    const offset = (style === 'detail') ? (5 * 1.75) : 5;
    const blockSize = (style === 'detail') ? (20 * 1.75) : 20;
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

  renderGardenLayouts(style) {
    const {data, onClick, completed} = this.props
    const dataForGardenLayout = this.setUpLayout(data, style);
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
                fill='brown'
                key={`${space.x}${space.y}`}
              />
            )}
          </g>
          </svg>
        </div>
        {
          completed ? null :
            <button
              className='to-complete button is-outlined'
              onClick={onClick}
            >
              Mark Completed
            </button>
        }
      </div>
    );
  }

  handleOnClickToViewDetail(evt) {
    evt.preventDefault();
    const { id } = this.props;
    const forState = {};
    forState[id] = true;
    /*
      using state of the component
      as at this time I do not need this informaiton
      in the application state
    */
    if (evt.target.classList[0] !== 'to-complete' ) {
      this.setState(forState);
    }
  }

  handleOnClickToCloseDetail(evt) {
    evt.preventDefault();
    const { id } = this.props;
    const forState = {};
    forState[id] = false;
    this.setState(forState);
  }

  renderModal() {
    return (
      <div className='modal is-active'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className="modal-card-head">
            <p className="modal-card-title">Garden Layout</p>
          </header>
          <section className='modal-card-body'>
            <div className="content">
              {this.renderGardenLayouts('detail')}
            </div>
          </section>
        </div>
        <button
          className='modal-close'
          onClick={this.boundhandleOnClickToCloseDetail}
        >
        </button>
      </div>
    );
  }

  render() {
    const { id } = this.props;
    const shouldRenderModal = (this.state !== null) ? this.state[id] : false;
    console.log('shouldRenderModal', shouldRenderModal)
    return (
      <div className='garden-layout'>
        <div
          onClick={this.boundhandleOnClickToViewDetail}
          className='garden-layout__wrap'
        >
          {this.renderGardenLayouts('list')}
        </div>
        {shouldRenderModal ? this.renderModal() : null }
      </div>
    );
  }
}
