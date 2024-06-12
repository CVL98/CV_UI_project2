import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import musicService from '../services/musicService';

const apiBaseUrl = 'https://appmusicwebapinet8.azurewebsites.net/api';
const service = new musicService(apiBaseUrl);

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
                    genre: group.strGenre,
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
                const _service = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
                let nGroup = await _service.readMusicGroupDtoAsync(musicGroupId);
                nGroup.name = editedDetails.name;
                nGroup.genre = parseInt(editedDetails.genre);
                nGroup.establishedYear = parseInt(editedDetails.establishedYear);
                console.log(nGroup);
                const updatedData = await _service.updateMusicGroupAsync(musicGroupId, nGroup);
                console.log(updatedData);
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
                                <input type="text" className="form-control" id="name" name="name" value={editedDetails.name || ''} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">Genre:</label>
                                <input type="text" className="form-control" id="genre" name="genre" value={editedDetails.genre || ''} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="establishedYear" className="form-label">Established Year:</label>
                                <input type="text" className="form-control" id="establishedYear" name="establishedYear" value={editedDetails.establishedYear || ''} onChange={handleInputChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    </Container>
                </Col>
                <Col md={6}>
                    {/* Display group details on the right side */}
                    <Container className="displaycontainer displaycard">
                        <h2>Group Details</h2>
                        <p>Name: {groupDetails.name}</p>
                        <p>Genre: {groupDetails.strGenre}</p>
                        <p>Established Year: {groupDetails.establishedYear}</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
