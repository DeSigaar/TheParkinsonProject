import React, { Component } from "react";
import { Animated } from "react-native";
import { Svg } from "expo";
import PropTypes from "prop-types";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { interpolate } = require("d3-interpolate");

export default class Skeleton extends Component {
  static propTypes = {
    children: PropTypes.any,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    duration: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    x1: PropTypes.number,
    y1: PropTypes.number,
    x2: PropTypes.number,
    y2: PropTypes.number
  };

  static defaultProps = {
    primaryColor: "#DDDDDD",
    secondaryColor: "#CCCCCC",
    duration: 2000,
    width: 300,
    height: 200,
    x1: 0,
    y1: 0,
    x2: 500,
    y2: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      offsetValues: ["-2", "-1.5", "-1"],
      offsets: ["0.0001", "0.0002", "0.0003"],
      frequence: props.duration / 2
    };
    this._isMounted = false;
    this._animate = new Animated.Value(0);
  }

  offsetValueBound(x) {
    if (x > 1) return "1";
    if (x < 0) return "0";
    return x;
  }

  componentDidMount() {
    this._isMounted = true;
    this.loopAnimation();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loopAnimation = () => {
    const { duration } = this.props;
    const { frequence } = this.state;

    if (!this._isMounted) return;
    let interpolator = interpolate(this.state, {
      offsetValues: ["1", "1.5", "2"]
    });

    // start animation
    let start = Date.now();
    this._animation = () => {
      const now = Date.now();
      let t = (now - start) / duration;
      if (t > 1) {
        t = 1;
      }

      let newState = interpolator(t);
      let offsetValues = [];
      offsetValues[0] = this.offsetValueBound(newState.offsetValues[0]);
      offsetValues[1] = this.offsetValueBound(newState.offsetValues[1]);
      offsetValues[2] = this.offsetValueBound(newState.offsetValues[2]);

      // Make sure at least two offsets is different
      if (
        offsetValues[0] !== offsetValues[1] ||
        offsetValues[0] !== offsetValues[2] ||
        offsetValues[1] !== offsetValues[2]
      ) {
        this._isMounted && this.setState({ offsets: offsetValues });
      }
      if (t < 1) {
        requestAnimationFrame(this._animation);
      }
    };
    requestAnimationFrame(this._animation);

    // Setup loop animation
    Animated.sequence([
      Animated.timing(this._animate, {
        toValue: 1,
        duration: frequence
      }),
      Animated.timing(this._animate, {
        toValue: 0,
        duration: frequence
      })
    ]).start(event => {
      if (event.finished) {
        this.loopAnimation();
      }
    });
  };

  render() {
    const { height, width, x1, y1, x2, y2, primaryColor, secondaryColor, children } = this.props;
    const { offsets } = this.state;

    return (
      <AnimatedSvg {...this.props} height={height} width={width}>
        <Svg.Defs>
          <Svg.LinearGradient id="grad" x1={x1} y1={y1} x2={x2} y2={y2}>
            <Svg.Stop offset={offsets[0]} stopColor={primaryColor} stopOpacity="1" />
            <Svg.Stop offset={offsets[1]} stopColor={secondaryColor} stopOpacity="1" />
            <Svg.Stop offset={offsets[2]} stopColor={primaryColor} stopOpacity="1" />
          </Svg.LinearGradient>
          <Svg.ClipPath id="clip">
            <Svg.G>{children}</Svg.G>
          </Svg.ClipPath>
        </Svg.Defs>

        <Svg.Rect x="0" y="0" height={height} width={width} fill="url(#grad)" clipPath="url(#clip)" />
      </AnimatedSvg>
    );
  }
}
