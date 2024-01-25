import { Col } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const NoteSkeleton = (props) => (
  <Col>
    <ContentLoader
      speed={2}
      width={320}
      height={525}
      viewBox="0 0 360 525"
      backgroundColor="#f3f3f3"
      foregroundColor="#dedede"
      {...props}
    >
      <rect x="133" y="103" rx="0" ry="0" width="2" height="1" />
      <rect x="0" y="0" rx="0" ry="0" width="360" height="190" />
      <rect x="0" y="235" rx="6" ry="6" width="360" height="25" />
      <rect x="1" y="270" rx="6" ry="6" width="360" height="25" />
      <rect x="0" y="205" rx="6" ry="6" width="150" height="15" />
      <rect x="0" y="320" rx="6" ry="6" width="360" height="10" />
      <rect x="0" y="340" rx="6" ry="6" width="360" height="10" />
      <rect x="0" y="360" rx="6" ry="6" width="360" height="10" />
    </ContentLoader>
  </Col>
);

export default NoteSkeleton;
