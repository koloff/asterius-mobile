export default function(e, gestureState) {



  const belowDx = Math.abs(gestureState.dx) < 2.5;
  const belowDy = Math.abs(gestureState.dy) < 2.5;
  const belowVx = Math.abs(gestureState.vx) < 0.1;
  const belowVy = Math.abs(gestureState.vy) < 0.1;


  return e.nativeEvent.touches.length === 1 &&
    ((belowDx || belowVx) && (belowDy || belowVy));
}

