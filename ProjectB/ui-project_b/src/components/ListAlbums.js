import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import musicService from '../services/musicService';

const apiBaseUrl = 'https://appmusicwebapinet8.azurewebsites.net/api';
const service = new musicService(apiBaseUrl);

export function ListAlbums() {
    const [albums, setAlbums] = useState([]); // State for album data
    const [error, setError] = useState(null); // State for error messages

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch albums data from the API
                const albumsData = await service.readAlbumsAsync(1, true, null, 10);
                console.log('Fetched albums data:', albumsData);
    
                // Extract the pageItems array from the fetched data
                const { pageItems } = albumsData;
    
                // Update state with fetched albums
                setAlbums(pageItems);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message); // Update state with error message
            }
        }
    
        fetchData(); // Call fetchData function when component mounts
    }, []);
    

    return (
        <Container className="px-4 py-4" id="list-of-items">
            <h2 className="pb-2 border-bottom">List of Music Bands</h2>

            <p>Below are some of the world's most famous music bands.</p>
            <p>The database now contains {albums.length} music groups</p>

            <div className="row mb-1 text-center">
                <div className="col-md-8">
                    <form className="d-flex mt-3 mt-lg-0" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
                <div className="col-md-7 col-lg-10">
                    <div className="row mb-2 text-center">
                        <div className="col-md-10 themed-grid-head-col">Group Name</div>
                        <div className="col-md-2 themed-grid-head-col">
                            <a href="#add-edit-artist" className="btn btn-success btn-sm m-1" type="button">New</a>
                        </div>
                    </div>
                    {Array.isArray(albums) && albums.map(album => (
    <div key={album.id} className="row mb-2 text-center">
        <div className="col-md-10 themed-grid-col">
            <a href={`#view-album-${album.id}`}>{album.name}</a>
        </div>
        <div className="col-md-2 themed-grid-col">
            <a href={`#edit-album-${album.id}`} className="btn btn-secondary btn-sm m-1" type="button">Edit</a>

            <Button type="button" className="btn btn-danger btn-sm m-1" data-bs-toggle="modal" data-bs-target="#dangerModal"
                data-modal-body={`Should ${album.name} be deleted?`}
                data-seido-modal-post-data={album.id} data-seido-modal-post-url={`./albums/${album.id}`}>
                Del
            </Button>
        </div>
    </div>
))}
                </div>
            </div>

            <nav aria-label="Standard pagination example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#list-of-friends" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#list-of-friends">1</a></li>
                    <li className="page-item"><a className="page-link" href="#list-of-friends">2</a></li>
                    <li className="page-item"><a className="page-link" href="#list-of-friends">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#list-of-friends" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Container>
    );
}
