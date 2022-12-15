import React, { useEffect } from 'react';

const App: React.FC = () => {
  // const [apiResponse, setApiResponse] = useState<string>();
  useEffect(() => {
    fetch('localhost:3500').then((response) => {
      console.log(typeof response, response);
      // setApiResponse(response)
    })
  }, []);

  const date = new Date();
  return (
    <div>
      <p>The App</p>
      <p>{date.toISOString()}</p>
      <p>
        <button>Download</button>
      </p>
    </div>
  );
};

export default App;
