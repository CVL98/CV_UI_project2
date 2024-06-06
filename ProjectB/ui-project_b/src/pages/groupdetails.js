import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import musicService from '../services/musicService';
import Musicalbums from './musicalbums';

const apiBaseUrl = 'https://appmusicwebapinet8.azurewebsites.net/api';
const service = new musicService(apiBaseUrl);

export default function GroupDetails() {
    const { musicGroupId } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const musicGroupsData = await service.readMusicGroupsAsync(0, false, '', 100); // fetch all groups
                const group = musicGroupsData.pageItems.find(group => group.musicGroupId === musicGroupId);
                if (group) {
                    setGroupDetails(group);
                } else {
                    setError('Music group not found');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGroupDetails();
    }, [musicGroupId]);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!groupDetails) {
        return <p>Loading...</p>;
    }

    const displayDetail = (detail, placeholder) => {
        return detail ? detail : placeholder;
    };

    return (
        <Container className="container-wrapper">
            <Row>
                <Col md={6}>
                    <Container style={{ margin: '3% auto' }}>
                        <Musicalbums />
                    </Container>
                </Col>
                <Col md={6}>
                    <Container className="displaycontainer displaycard">
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
                </Col>
            </Row>
        </Container>
    );
}
