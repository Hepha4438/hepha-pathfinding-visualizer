import React, { Component } from "react";
import "./navbar.css";

class NavBar extends Component {
  state = {
    algorithm: "Visualize Algorithm",
    maze: "Generate Maze",
    pathState: false,
    mazeState: false,
    speedState: "Speed",
    showAlgorithmDropdown: false,
    showMazeDropdown: false,
    showSpeedDropdown: false,
    showMetricDropdown: false,
    metricState: "Metric Space",
    heuristicWeight: 1.0,
  };

  toggleDropdown = (type) => {
    this.setState({
      showAlgorithmDropdown: type === 'algorithm' ? !this.state.showAlgorithmDropdown : false,
      showMazeDropdown: type === 'maze' ? !this.state.showMazeDropdown : false,
      showSpeedDropdown: type === 'speed' ? !this.state.showSpeedDropdown : false,
      showMetricDropdown: type === 'metric' ? !this.state.showMetricDropdown : false,
    });
  };

  selectAlgorithm(selection) {
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (
      selection === this.state.algorithm ||
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: selection });
    } else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    } else {
      this.setState({ algorithm: selection });
    }
  }

  selectMaze(selection) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (
      selection === this.state.maze ||
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: selection });
    } else if (!this.state.mazeState) {
      this.setState({ maze: selection });
    } else {
      this.clearGrid();
      this.setState({ maze: selection });
    }
  }

  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.pathState) {
      this.clearPath();
      return;
    }
    if (
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: "Select an Algorithm!" });
    } else {
      this.setState({ pathState: true });

      // Convert metric name to lowercase for algorithm usage
      const metricType = this.state.metricState.toLowerCase();
      const weight = this.state.heuristicWeight;

      if (this.state.algorithm === "Dijkstra")
        this.props.visualizeDijkstra();
      else if (this.state.algorithm === "A*")
        this.props.visualizeAStar(metricType, weight);
      else if (this.state.algorithm === "Greedy BFS")
        this.props.visualizeGreedyBFS(metricType, weight);
      else if (this.state.algorithm === "Bidirectional Greedy")
        this.props.visualizeBidirectionalGreedySearch(metricType, weight);
      else if (this.state.algorithm === "Breadth First Search")
        this.props.visualizeBFS();
      else if (this.state.algorithm === "Depth First Search")
        this.props.visualizeDFS();
    }
  }

  generateMaze() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.mazeState || this.state.pathState) {
      this.clearTemp();
    }
    if (
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: "Select a Maze!" });
    } else {
      this.clearTemp();
      this.setState({ mazeState: true });
      if (this.state.maze === "Random Maze")
        this.props.generateRandomMaze();
      else if (this.state.maze === "Recursive Division Maze")
        this.props.generateRecursiveDivisionMaze();
      else if (this.state.maze === "Vertical Division Maze")
        this.props.generateVerticalMaze();
      else if (this.state.maze === "Horizontal Division Maze")
        this.props.generateHorizontalMaze();
    }
  }

  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      algorithm: "Visualize Algorithm",
      maze: "Generate Maze",
      pathState: false,
      mazeState: false,
    });
  }

  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  changeSpeed(speed) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }

    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed === "Medium") value = [25, 20];
    else if (speed === "Fast") value = [10, 10];

    // Same logic as selectAlgorithm: if different speed and path exists, clear path but keep walls/maze
    if (speed !== this.state.speedState && this.state.pathState) {
      this.clearPath();
      this.setState({ speedState: speed });
    } else {
      this.setState({ speedState: speed });
    }

    this.props.updateSpeed(value[0], value[1]);
  }

  selectMetric(metric) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }

    // Same logic as selectAlgorithm: if different metric and path exists, clear path but keep walls/maze
    if (metric !== this.state.metricState && this.state.pathState) {
      this.clearPath();
      this.setState({ metricState: metric });
    } else {
      this.setState({ metricState: metric });
    }
  }

  updateWeight = (event) => {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }

    const weight = parseFloat(event.target.value);

    // Same logic as selectAlgorithm: if different weight and path exists, clear path but keep walls/maze
    if (weight !== this.state.heuristicWeight && this.state.pathState) {
      this.clearPath();
      this.setState({ heuristicWeight: weight });
    } else {
      this.setState({ heuristicWeight: weight });
    }
  };

  render() {
    return (
      <div>
        {/* Dòng 1: Title và GitHub link */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand h1 mb-0">
              Pathfinding Visualizer
            </span>
            <a
              href="https://github.com/Hepha4438/hepha-pathfinding-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-sm"
            >
              GitHub
            </a>
          </div>
        </nav>

        {/* Dòng 2: Controls */}
        <nav className="navbar navbar-expand navbar-dark bg-secondary">
          <div className="container-fluid">
            <div className="navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                {/* ...existing dropdown code... */}
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  onClick={() => this.toggleDropdown('algorithm')}
                >
                  {this.state.algorithm === "Visualize Algorithm" ? "Algorithms" : this.state.algorithm}
                </button>
                <ul className={`dropdown-menu ${this.state.showAlgorithmDropdown ? 'show' : ''}`}>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Dijkstra"); this.toggleDropdown('');}}
                >
                  Dijkstra's Algorithm
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("A*"); this.toggleDropdown('');}}
                >
                  A* Algorithm
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Greedy BFS"); this.toggleDropdown('');}}
                >
                  Greedy Best First Search
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Bidirectional Greedy"); this.toggleDropdown('');}}
                >
                  Bidirectional Greedy Search
                </button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Breadth First Search"); this.toggleDropdown('');}}
                >
                  Breadth First Search
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Depth First Search"); this.toggleDropdown('');}}
                >
                  Depth First Search
                </button></li>
              </ul>
              </div>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.visualizeAlgorithm()}
              >
                Visualize
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  onClick={() => this.toggleDropdown('maze')}
                >
                  {this.state.maze === "Generate Maze" ? "Mazes" : this.state.maze}
                </button>
                <ul className={`dropdown-menu ${this.state.showMazeDropdown ? 'show' : ''}`}>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Random Maze"); this.toggleDropdown('');}}
                >
                  Random Maze
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Recursive Division Maze"); this.toggleDropdown('');}}
                >
                  Recursive Division Maze
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Vertical Division Maze"); this.toggleDropdown('');}}
                >
                  Vertical Division Maze
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Horizontal Division Maze"); this.toggleDropdown('');}}
                >
                  Horizontal Division Maze
                </button></li>
              </ul>
              </div>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.generateMaze()}
              >
                Generate
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.clearGrid()}
              >
                Reset
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-info dropdown-toggle"
                  type="button"
                  onClick={() => this.toggleDropdown('speed')}
                >
                  {this.state.speedState}
                </button>
                <ul className={`dropdown-menu ${this.state.showSpeedDropdown ? 'show' : ''}`}>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.changeSpeed("Slow"); this.toggleDropdown('');}}
                >
                  Slow
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.changeSpeed("Medium"); this.toggleDropdown('');}}
                >
                  Medium
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.changeSpeed("Fast"); this.toggleDropdown('');}}
                >
                  Fast
                </button></li>
              </ul>
              </div>
            </li>

            {/* Metric Space Dropdown */}
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-warning dropdown-toggle"
                  type="button"
                  onClick={() => this.toggleDropdown('metric')}
                >
                  {this.state.metricState === "Metric Space" ? "Metric Space" : this.state.metricState}
                </button>
                <ul className={`dropdown-menu ${this.state.showMetricDropdown ? 'show' : ''}`}>
                  <li><button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {this.selectMetric("Manhattan"); this.toggleDropdown('');}}
                  >
                    Manhattan
                  </button></li>
                  <li><button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {this.selectMetric("Euclidean"); this.toggleDropdown('');}}
                  >
                    Euclidean
                  </button></li>
                  <li><button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {this.selectMetric("Chebyshev"); this.toggleDropdown('');}}
                  >
                    Chebyshev
                  </button></li>
                </ul>
              </div>
            </li>

            {/* Weight Control */}
            <li className="nav-item">
              <div className="d-flex align-items-center">
                <label className="text-white me-2">Weight:</label>
                <input
                  type="range"
                  className="form-range me-2"
                  min="0"
                  max="1"
                  step="0.1"
                  value={this.state.heuristicWeight}
                  onChange={this.updateWeight}
                  style={{width: "120px"}}
                />
                <span className="text-white">{this.state.heuristicWeight.toFixed(1)}</span>
              </div>
            </li>

            {/* Distance Mode Toggle */}
            <li>
              <button
                type="button"
                className={`btn ${this.props.showDistances ? 'btn-warning' : 'btn-outline-light'}`}
                onClick={() => this.props.toggleDistanceMode()}
                title="Toggle distance values display on visited nodes"
              >
                {this.props.showDistances ? 'Hide Distances' : 'Show Distances'}
              </button>
            </li>

            {/* Set Start/Finish Nodes */}
            <li>
              <button
                type="button"
                className={`btn ${this.props.settingMode === 'start' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => this.props.settingMode === 'start' ? this.props.cancelSettingMode() : this.props.activateSetStartMode()}
                disabled={this.props.visualizingAlgorithm || this.props.generatingMaze}
                title="Click to set new start position"
              >
                {this.props.settingMode === 'start' ? 'Cancel' : 'Set Start Node'}
              </button>
            </li>

            <li>
              <button
                type="button"
                className={`btn ${this.props.settingMode === 'finish' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => this.props.settingMode === 'finish' ? this.props.cancelSettingMode() : this.props.activateSetFinishMode()}
                disabled={this.props.visualizingAlgorithm || this.props.generatingMaze}
                title="Click to set new finish position"
              >
                {this.props.settingMode === 'finish' ? 'Cancel' : 'Set Finish Node'}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </div>
    );
  }
}
export default NavBar;