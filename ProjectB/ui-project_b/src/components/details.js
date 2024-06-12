import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export function GroupDetailsCard({ groupDetails, musicGroupId }) {
    const displayDetail = (detail, placeholder) => {
        return detail ? detail : placeholder;
    };

    return (
        <Container className="displaycontainer displaycard">
            {/* Add Edit button here */}
            <Link to={`/edit/${musicGroupId}`} className="btn btn-primary mb-3">Edit</Link>
            
            <h1>{displayDetail(groupDetails.name, 'Name not available')}</h1>
            <p>{displayDetail(groupDetails.description, 'Description not available')}</p>
            <p>Established Year: {displayDetail(groupDetails.establishedYear, 'Year not available')}</p>
            <p>Genre: {displayDetail(groupDetails.strGenre, 'Genre not available')}</p>

            <h2>Albums</h2>
            <ul>
                {groupDetails.albums.length > 0 ? (
                    groupDetails.albums.map(album => (
                        <li key={album.albumId}>{displayDetail(album.name, 'Name not available')} ({displayDetail(album.releaseYear, 'Year not available')}) - {displayDetail(album.copiesSold, 'Copies sold not available')} copies sold</li>
                    ))
                ) : (
                    <li>No albums available</li>
                )}
            </ul>

            <h2>Artists</h2>
            <ul>
                {groupDetails.artists.length > 0 ? (
                    groupDetails.artists.map(artist => (
                        <li key={artist.artistId}>{displayDetail(artist.firstName, 'First name not available')} {displayDetail(artist.lastName, 'Last name not available')}</li>
                    ))
                ) : (
                    <li>No artists available</li>
                )}
            </ul>
        </Container>
    );
}
