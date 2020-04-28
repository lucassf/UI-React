import React from 'react';
import { Card } from 'react-bootstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMsg }) {
    if (isLoading) {
        return <Loading />
    }
    if (errMsg) {
        return (
            <h4>{errMsg}</h4>
        );
    }
    return (
        <FadeTransform in transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <Card.Img src={baseUrl + item.image} alt={item.name} />
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    {item.designation ? <Card.Subtitle>{item.designation}</Card.Subtitle> : null}
                    <Card.Text>{item.description}</Card.Text>
                </Card.Body>
            </Card>
        </FadeTransform>
    )
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMsg={props.dishesErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} errMsg={props.promosErrMsg} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isLoading={props.leadersLoading} errMsg={props.leadersErrMsg} />
                </div>
            </div>
        </div>
    )
}

export default Home;
