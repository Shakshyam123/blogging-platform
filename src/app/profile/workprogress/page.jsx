import { Progress } from "antd";
import PropTypes from "prop-types";

const WorkProgressIndex = ({ progress }) => {
  return (
    <div style={{ width: "40%" }}>
      <Progress percent={progress} />
    </div>
  );
};

WorkProgressIndex.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default WorkProgressIndex;
