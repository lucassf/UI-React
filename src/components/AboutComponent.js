import React from 'react';
import { Breadcrumb, Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components'
import Skeleton from 'react-loading-skeleton';

function RenderLeaders(leaders, errMsg, isLoading) {
    if (isLoading)
        return (
            <Media>
                <Skeleton circle={true} height={64} width={64} />
                <Media.Body>
                    <h5><Skeleton width={`30%`}/></h5>
                    <p><Skeleton width={`80%`}/>
                    <Skeleton width={`80%`}/></p>
                </Media.Body>
            </Media>
        )
    if (errMsg)
        return <h4>{errMsg}</h4>
    return leaders.map((leader) => {
        return (
            <Fade in key={leader.id}>
                <Media>
                    <img className="align-self-start mr-3"
                        width={64} height={64} src={baseUrl + leader.image} alt={leader.name}
                    />
                    <Media.Body>
                        <h5>{leader.name}</h5>
                        <p>{leader.designation}</p>
                        <p>{leader.description}</p>
                    </Media.Body>
                </Media>
            </Fade>
        );
    })
}

function About(props) {

    const leaders = RenderLeaders(props.leaders, props.errMsg, props.isLoading);

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/home">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <Card.Header className="bg-primary text-white">Facts At a Glance</Card.Header>
                        <Card.Body>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <Card.Body className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <ul className="list-unstyled">
                        <Stagger in>
                            {leaders}
                        </Stagger>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About;
