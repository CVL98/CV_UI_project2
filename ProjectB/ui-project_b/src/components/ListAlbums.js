import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import musicService from '../services/musicService';
import '../css/musicGroups.css';

const apiBaseUrl = 'https://appmusicwebapinet8.azurewebsites.net/api';
const service = new musicService(apiBaseUrl);

export function ListMusicGroups() {
    const [musicGroups, setMusicGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNr, setPageNr] = useState(0);
    const [error, setError] = useState(null);
    const [totalItems, setTotalItems] = useState(0);

    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, [pageNr]);

    const fetchData = async () => {
        try {
            const musicGroupsData = await service.readMusicGroupsAsync(pageNr, true, searchTerm, itemsPerPage);
            setMusicGroups(musicGroupsData.pageItems);
            setTotalItems(musicGroupsData.dbItemsCount);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSearch = () => {
        setPageNr(0);
        fetchData();
    };

    const handleNext = () => {
        setPageNr(prevPageNr => prevPageNr + 1);
    };

    const handlePrev = () => {
        setPageNr(prevPageNr => Math.max(prevPageNr - 1, 0));
    };

    const getMatchingText = () => {
        if (totalItems === 0) {
            return 'There are no music groups matching the current search term.';
        } else if (totalItems === 1) {
            return 'There is 1 music group matching the current search term.';
        } else {
            return `There are ${totalItems} music groups matching the current search term.`;
        }
    };

    const getTotalPages = () => {
        return Math.ceil(totalItems / itemsPerPage);
    };

    return (
        <Container className="container card">
            <p>{getMatchingText()}</p>

            <form className="d-flex mt-3 mt-lg-0" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

            <div className="button-container">
                <button id="btnPrev" className="arrow-button" onClick={handlePrev} disabled={pageNr === 0}>&#x1F828;</button>
                <p id="currentPageNumber" className="PageNumber">Page {pageNr + 1} / {getTotalPages()}</p>
                <button id="btnNext" className="arrow-button" onClick={handleNext} disabled={pageNr + 1 >= getTotalPages()}>&#x1F82A;</button>
            </div>

            <div className='musicGroupList'>
                {musicGroups.map(group => (
                    <div key={group.id} className="row mb-2 text-center">
                        <a href={`#view-group-${group.id}`}>{group.name}</a>
                    </div>
                ))}
            </div>

            {error && <p className="error">{error}</p>}
        </Container>
    );
}
