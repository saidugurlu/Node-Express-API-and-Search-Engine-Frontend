import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const url = 'http://localhost:3009/all';

function App() {
    const [searchItems, setSearchItems] = useState([]);
    const [filteredSearchItems, setFilteredSearchItems] = useState([]);

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
            setFilteredSearchItems([]);
        })();
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value;
        if (searchText === '') {
            setFilteredSearchItems([]);
        } else {
            const _filteredSearchItems = searchItems.filter((m) =>
                m.bulkSearch.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredSearchItems(_filteredSearchItems);
        }
    };

    return (
        <div className="App">
            <div>Testing</div>
            {Object.keys(searchItems).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <input
                        type="text"
                        autoFocus
                        onChange={(e) => handleSearch(e)}
                    />
                    {filteredSearchItems.map((item, i) => {
                        return (
                            <li key={i}>
                                {item.kind} {item.item.singular}
                            </li>
                        );
                    })}
                </>
            )}
        </div>
    );
}
export default App;