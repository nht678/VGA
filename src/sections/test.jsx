import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const CounterComponent = () => {
  const counter = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <Button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </Button>
      <Button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement
      </Button>
    </div>
  );
};
export default CounterComponent;