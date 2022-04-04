import { Box } from "@chakra-ui/react";
import {
  useAnimation,
  useMotionValue,
  useTransform,
  MotionValue,
  motion
} from "framer-motion";

import { useEffect, useRef } from "react";

interface CardProps {
  src: string,
  isActive: boolean,
  onRemove: () => void,
  backgroundTransformer: MotionValue<any>
}

export var Card = function({ src, isActive, onRemove, backgroundTransformer }: CardProps) {

  const cardRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const x = useMotionValue(0);

  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5]);

  const THRESHOLD = 50;

  if (isActive) {
    controls.start({ scale: 1 });
  }

  useEffect(() => {
    x.onChange(currVal => {
      if (Math.abs(currVal) <= THRESHOLD) {
        backgroundTransformer.set(currVal);
      }
    });
  }, [x, backgroundTransformer]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > THRESHOLD) {
      backgroundTransformer.set(0);
      onRemove();
    } else {
      controls.start({ x: 0, y: 0 });
    }
  }

  const backgroundImage = `url(${src})`;

  return (
      <motion.div
        ref = {cardRef}
        className = "item"
        style = {{ x, rotate, backgroundImage }}
        drag
        onDragEnd = {handleDragEnd}
        initial={{ scale: 0.9 }}
        animate={controls}
        custom={x}
      >
        <Box>
          test
        </Box>
      </motion.div>
  );
}
