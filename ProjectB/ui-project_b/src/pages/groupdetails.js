import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import musicService from '../services/musicService';
import Musicalbums from './musicalbums';
import {GroupDetailsCard} from '../components/details'; // Import the details card component

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

    return (
        <Container className="container-wrapper">
            <Row>
                <Col md={6}>
                    <Container style={{ margin: '3% auto' }}>
                        <Musicalbums />
                    </Container>
                </Col>
                <Col md={6}>
                    {/* Use the details card component here */}
                    <GroupDetailsCard groupDetails={groupDetails} musicGroupId={musicGroupId} />
                </Col>
            </Row>
        </Container>
    );
}
