/* eslint-disable react/prop-types */

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const TooltipWrapper = ({
  tooltip,
  placement = "top",
  delay = { show: 250, hide: 400 },

  children,
}) => {
  const renderTooltip = (props) => (
    <Tooltip id="tooltip" {...props}>
      {tooltip}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={placement} delay={delay} overlay={renderTooltip}>
      <span className="d-inline-block">{children}</span>
    </OverlayTrigger>
  );
};

export default TooltipWrapper;
