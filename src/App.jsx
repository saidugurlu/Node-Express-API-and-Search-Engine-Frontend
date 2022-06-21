import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { Noun } from './components/Noun';
import { Book } from './components/Book';
import { TechPerson } from './components/TechPerson';

const url = 'http://localhost:3009/all';
const separator = '|';
function App() {
    const [searchItems, setSearchItems] = useState([]);
    const [filteredSearchItems, setFilteredSearchItems] = useState([]);
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
            _siteData.books.forEach((item) => {
                _searchItems.push({
                    kind: 'book',
                    bulkSearch: item.title + separator + item.description,
                    item
                });
            });

            _siteData.techPersons.forEach((item) => {
                _searchItems.push({
                    kind: 'techPerson',
                    bulkSearch:
                        item.fullName +
                        separator +
                        item.quickInfo +
                        separator +
                        item.body,
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
            <h1>Search Info</h1>
            {Object.keys(searchItems).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <>
                    <input
                        className="searchBox"
                        type="text"
                        autoFocus
                        onChange={(e) => handleSearch(e)}
                    />
                    {filteredSearchItems.map((item, i) => {
                        return (
                            <>
                                {item.kind === 'noun' && (
                                    <Noun item={item.item} />
                                )}
                                {item.kind === 'book' && (
                                    <Book item={item.item} />
                                )}
                                {item.kind === 'techPerson' && (
                                    <TechPerson item={item.item} />
                                )}
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}
export default App;