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
  };

  toggleDropdown = (type) => {
    this.setState({
      showAlgorithmDropdown: type === 'algorithm' ? !this.state.showAlgorithmDropdown : false,
      showMazeDropdown: type === 'maze' ? !this.state.showMazeDropdown : false,
      showSpeedDropdown: type === 'speed' ? !this.state.showSpeedDropdown : false,
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
      this.clearTemp();
      return;
    }
    if (
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: "Select an Algorithm!" });
    } else {
      this.setState({ pathState: true });
      if (this.state.algorithm === "Visualize Dijkstra")
        this.props.visualizeDijkstra();
      else if (this.state.algorithm === "Visualize A*")
        this.props.visualizeAStar();
      else if (this.state.algorithm === "Visualize Greedy BFS")
        this.props.visualizeGreedyBFS();
      else if (this.state.algorithm === "Visualize Bidirectional Greedy")
        this.props.visualizeBidirectionalGreedySearch();
      else if (this.state.algorithm === "Visualize Breadth First Search")
        this.props.visualizeBFS();
      else if (this.state.algorithm === "Visualize Depth First Search")
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
      this.setState({ mazeState: true });
      if (this.state.maze === "Generate Random Maze")
        this.props.generateRandomMaze();
      else if (this.state.maze === "Generate Recursive Maze")
        this.props.generateRecursiveDivisionMaze();
      else if (this.state.maze === "Generate Vertical Maze")
        this.props.generateVerticalMaze();
      else if (this.state.maze === "Generate Horizontal Maze")
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
    this.setState({ speedState: speed });
    this.props.updateSpeed(value[0], value[1]);
  }

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
                  onClick={() => {this.selectAlgorithm("Visualize Dijkstra"); this.toggleDropdown('');}}
                >
                  Dijkstra's Algorithm
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Visualize A*"); this.toggleDropdown('');}}
                >
                  A* Algorithm
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Visualize Greedy BFS"); this.toggleDropdown('');}}
                >
                  Greedy Best First Search
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Visualize Bidirectional Greedy"); this.toggleDropdown('');}}
                >
                  Bidirectional Greedy Search
                </button></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Visualize Breadth First Search"); this.toggleDropdown('');}}
                >
                  Breadth First Search
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectAlgorithm("Visualize Depth First Search"); this.toggleDropdown('');}}
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
                {this.state.algorithm}
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
                  onClick={() => {this.selectMaze("Generate Random Maze"); this.toggleDropdown('');}}
                >
                  Random Maze
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Generate Recursive Maze"); this.toggleDropdown('');}}
                >
                  Recursive Division Maze
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Generate Vertical Maze"); this.toggleDropdown('');}}
                >
                  Vertical Division Maze
                </button></li>
                <li><button
                  className="dropdown-item"
                  type="button"
                  onClick={() => {this.selectMaze("Generate Horizontal Maze"); this.toggleDropdown('');}}
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
                {this.state.maze}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.clearGrid()}
              >
                Clear Grid
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
          </ul>
        </div>
      </div>
    </nav>
  </div>
    );
  }
}
export default NavBar;