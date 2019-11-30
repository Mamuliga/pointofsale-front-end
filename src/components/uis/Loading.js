import React from "react";
import PropType from "prop-types";
import { Spin } from "antd";

const Loading = props => {
  return (
    <div className="loading-container">
      <Spin size={props.size} />
    </div>
  );
};

Loading.propTypes = {
  size: PropType.oneOf(["default", "large", "small"])
};
Loading.defaultProps = {
  size: "large"
};

export default Loading;
