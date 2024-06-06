import React from 'react';
import Container from 'react-bootstrap/Container';



export default function Home() {

    return (
        <Container className="displaycontainer displaycard">
           <div>
            <h1>CV City</h1>
            <p>A project to meant to practise REACT.</p>
            <img src="/logo512.png" alt="where-is-the-logo" style={{ width: '80%' }} />
            </div> 
        </Container>
    );
}
