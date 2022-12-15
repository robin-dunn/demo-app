import React, { useEffect } from 'react';

const App: React.FC = () => {
  // const [apiResponse, setApiResponse] = useState<string>();
  useEffect(() => {
    fetch('localhost:3500').then((response) => {
      console.log(typeof response, response);
      // setApiResponse(response)
    })
  }, []);

  const downloadFile = async (fileUrl) => {
    const fileResponse = await fetch(fileUrl)
    const blob = await fileResponse.blob();
    console.log('BLOB', blob);
    const objectUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    anchor.href = objectUrl;
    anchor.download = 'test_file';
    anchor.click();
    window.URL.revokeObjectURL(objectUrl);
  };

  const date = new Date();
  return (
    <div>
      <p>The App</p>
      <p>{date.toISOString()}</p>
      <p>
        <button 
          data-qa="btn-download"
          onClick={ () => void (async () => downloadFile("http://localhost:3500/download"))() }>Download</button>
      </p>
    </div>
  );
};

export default App;
