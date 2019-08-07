import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Bucket = function BucketComponent({ percentage, className }) {
  const water = useRef();
  const grayPercentage = useRef();
  const bluePercentage = useRef();

  // TODO: use state as conditional to prevent trigger on additional renders
  useLayoutEffect(() => {
    setTimeout(() => {
      water.current.style.transformOrigin = "center bottom";
      //grayPercentage.current.style.transformOrigin = 'center bottom';
      //bluePercentage.current.style.transformOrigin = 'center bottom';
    }, 6000);
  });

  return (
    <svg viewBox={"0 0 100 400"} className={className}>
      <motion.rect
        ref={water}
        width={"100%"}
        height={"100%"}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: percentage }}
        transition={{ duration: 5 }}
      />
      <motion.text
        ref={grayPercentage}
        id="gray"
        x={"50%"}
        initial={{ translateY: 0 }}
        animate={{ translateY: `${(1 - percentage) / 2 * 100}%` }}
        transition={{ duration: 5 }}
      >
        {`${(1 - percentage) * 100}%`}
      </motion.text>
      <motion.text
        ref={bluePercentage}
        id="blue"
        x={"50%"}
        initial={{ translateY: '100%' }}
        animate={{ translateY: `${(1 - percentage / 2) * 100}%` }}
        transition={{ duration: 5 }}
      >
        {`${percentage * 100}%`}
      </motion.text>
    </svg>
  );
};

const StyledBucket = styled(Bucket)`
  width: 100px;
  background-color: lightgray;

  > * {
    transform-origin: bottom;
  }

  rect {
    fill: #4381c1;
  }

  text {
    text-anchor: middle;
  }

  #blue {
    fill: white;
  }
`;

export default StyledBucket;
