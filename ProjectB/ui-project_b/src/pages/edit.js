import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import musicService from '../services/musicService';

const apiBaseUrl = 'https://appmusicwebapinet8.azurewebsites.net/api';
const service = new musicService(apiBaseUrl);

const genres = [
    { id: 0, name: 'Rock' },
    { id: 1, name: 'Blues' },
    { id: 2, name: 'Jazz' },
    { id: 3, name: 'Metal' }
];

export default function EditGroupDetails() {
    const { musicGroupId } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [editedDetails, setEditedDetails] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const group = await service.readMusicGroupDtoAsync(musicGroupId);
                setGroupDetails(group);
                setEditedDetails({
                    name: group.name,
                    genre: group.genre, // Ensure you use 'genre' here, not 'strGenre'
                    establishedYear: group.establishedYear
                });
            } catch (error) {
                setError('Failed to fetch group details');
            }
        };

        fetchGroupDetails();
    }, [musicGroupId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            try {
                let nGroup = await service.readMusicGroupDtoAsync(musicGroupId);
                nGroup.name = editedDetails.name;
                nGroup.genre = parseInt(editedDetails.genre);
                nGroup.establishedYear = parseInt(editedDetails.establishedYear);
                const updatedData = await service.updateMusicGroupAsync(musicGroupId, nGroup);
                setGroupDetails(updatedData);
                alert('Changes saved successfully');
            } catch (error) {
                alert('Failed to save changes');
                console.error(error);
            }
        } else {
            e.stopPropagation();
        }
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!groupDetails) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="container-wrapper">
            <Row>
                <Col md={6}>
                    <Container className="displaycontainer displaycard">
                        <h2>Edit Group Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={editedDetails.name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">Genre:</label>
                                <select
                                    className="form-control"
                                    id="genre"
                                    name="genre"
                                    value={editedDetails.genre || ''}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a genre</option>
                                    {genres.map(genre => (
                                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="establishedYear" className="form-label">Established Year:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="establishedYear"
                                    name="establishedYear"
                                    value={editedDetails.establishedYear || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    </Container>
                </Col>
                <Col md={6}>
                    <Container className="displaycontainer displaycard">
                        <h2>Group Details</h2>
                        <p>Name: {groupDetails.name}</p>
                        <p>Genre: {genres.find(g => g.id === groupDetails.genre)?.name || 'Unknown'}</p>
                        <p>Established Year: {groupDetails.establishedYear}</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
