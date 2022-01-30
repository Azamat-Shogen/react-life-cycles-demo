import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count1: 0,
      count2: 0,
      hide: false
    };

    console.log("constructor call");
  }

  // This is where you run statements that requires that the component is already placed in the DOM
  // normally used in requests from api
  componentDidMount() {
    console.log("component mounted");
    setTimeout(() => {
      this.setState((prev) => ({ ...prev, count1: this.state.count1 + 1 }));
    }, 100);
  }

  incrementCount1 = () => {
    this.setState((prev) => {
      return { ...prev, count1: this.state.count1 + 1 };
    });
  };

  incrementCount2 = () => {
    this.setState((prev) => {
      return { ...prev, count2: this.state.count2 + 1 };
    });
  };

  toggle = () => {
    this.setState((prev) => ({ ...prev, hide: !this.state.hide }));
  };

  // use this method to find out what the state object looked like before the update
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("prev state: ", prevState);
    document.getElementById("span").innerHTML = " " + prevState.count1;
    return prevState;
  }
  // this  method is called after the update has been rendered in the DOM
  componentDidUpdate() {
    console.log("component updated");
  }

  render() {
    console.log("component rendered");
    return (
      <div id="div1">
        <h1>count is {this.state.count1}</h1>
        <h3>
          count1 used to be : <span id="span"></span>
        </h3>

        <button type="button" onClick={this.incrementCount1}>
          increment1
        </button>
        <button type="button" onClick={this.incrementCount2}>
          increment2
        </button>
        <button type="button" onClick={this.toggle}>
          {" "}
          toogle child
        </button>
        <hr />
        {!this.state.hide && <Child count2={this.state.count2} />}
      </div>
    );
  }
}

class Child extends React.Component {
  // update this component only if props or state change. Also can use React.PureComponent
  shouldComponentUpdate(prevProps, PrevState) {
    return prevProps.count2 !== this.props.count2;
  }

  // this method is called when the component is about to be removed from the DOM
  componentWillUnmount() {
    console.log("Child component unmounted");
  }

  render() {
    console.log("child component is called");
    return (
      <div>
        <h2>I am a child: {this.props.count2}</h2>
      </div>
    );
  }
}
export default App;
