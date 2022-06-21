import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const url = 'http://localhost:3007/all';

function App() {
    const [siteData, setSiteData] = useState({});

    useEffect(() => {
        (async () => {
            const _siteData = (await axios.get(url)).data;
            setSiteData(_siteData);
        })();
    }, []);

    return (
        <div className="App">
            <div>Testing</div>
            {Object.keys(siteData).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div>There are {siteData.nouns.length} nouns.</div>
                    {siteData.nouns.map((noun, i) => {
                        return <li key={i}>{noun.singular}</li>;
                    })}
                </>
            )}
        </div>
    );
}
export default App;
