// App.js
import { useRef, useState, useEffect } from 'react';
import './App.css';
import { uploadFile } from '../services/api';

function App() {
  const [file, setFile] = useState('');
    const [result, setResult] = useState('');
    const [downloadMessage, setDownloadMessage] = useState('');

    const fileInputRef = useRef();

    const logo = 'https://i.pinimg.com/originals/8c/20/23/8c20239f1ec5777e42ae627590419576.jpg';

    useEffect(() => {
        const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append('name', file.name);
            data.append('file', file);

            try {
            let response = await uploadFile(data);
            setResult(response.path);
            setDownloadMessage('');
            } catch (error) {
            console.error(error);
            setDownloadMessage('Error uploading file. Please try again.');
            }
        }
        };

        getImage();
    }, [file]);

    const onUploadClick = () => {
        fileInputRef.current.click();
    };

    const onDownloadClick = () => {
        // Display "Download in progress" message when the Download button is clicked
        setDownloadMessage('Download in progress...');

        // Make a request to the server to initiate the download
        // Replace 'YOUR_DOWNLOAD_API_ENDPOINT' with the actual endpoint
        fetch('YOUR_DOWNLOAD_API_ENDPOINT', {
        method: 'GET',
        })
        .then(() => {
            // Download is complete
            setDownloadMessage('Download complete!');
        })
        .catch((error) => {
            console.error(error);
            setDownloadMessage('Error during download. Please try again.');
        });
    };


    return (
      <div className='container'>
        <img src={logo} alt='banner' />
        <div className='wrapper'>
          <h1>Simple File Sharing App!</h1>
          <p>Upload and share the download link.</p>
  
          <button onClick={() => onUploadClick()} style={{ backgroundColor: 'beige', color: 'black', borderRadius: '20px', marginBottom: '40px' }}>Upload</button>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
  
          {result && (
            <div>
              <div style={{ display: 'inline' }}>
                Download Link: 
              </div>
              <div style={{ display: 'inline', borderRadius: '20px' }}>
                <a href={result} target='_blank' onClick={onDownloadClick} style={{ border: '3px solid darkorange', padding: '4px', borderRadius: '20px' }}>
                  {result}
                </a>
              </div>
            </div>
          )}
  
          {downloadMessage && <div className='download-message'>{downloadMessage}</div>}
        </div>
      </div>
    );
  }
  
  

export default App;