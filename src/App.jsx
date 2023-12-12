import { useState } from 'react';
import { Badge } from './components/common/Badge';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className='title-24'>Rolling</h1>
      <Badge />
    </>
  );
}

export default App;
