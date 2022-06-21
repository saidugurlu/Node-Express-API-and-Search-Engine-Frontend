import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const url = 'http://localhost:3007/all';

function App() {
    const [searchItems, setSearchItems] = useState([]);

    // searchItems:
    /*
	[
	{
		kind: "noun",
		bulkSearch: "Notiz",
		item: {
						"article": "die",
						"singular": "Notiz",
						"plural": "die Notizen"
				},
	},
	...
]
	*/

    useEffect(() => {
        (async () => {
            const _siteData = (await axios.get(url)).data;
            const _searchItems = [];

            _siteData.nouns.forEach((item) => {
                _searchItems.push({
                    kind: 'noun',
                    bulkSearch: item.singular,
                    item
                });
            });

            setSearchItems(_searchItems);
        })();
    }, []);

    return (
        <div className="App">
            <div>Testing</div>
            {Object.keys(searchItems).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div>There are {searchItems.length} items.</div>
                    {searchItems.map((item, i) => {
                        return <li key={i}>{item.kind}</li>;
                    })}
                </>
            )}
        </div>
    );
}
export default App;