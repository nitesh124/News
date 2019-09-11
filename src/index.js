import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import axios from 'axios';
import xml2js from 'xml2js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Media from 'react-bootstrap/Media';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import * as serviceWorker from './serviceWorker';

class Mynewscomp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nowavailable: false,
            lgShow: false,
            setLgShow: false,
            itemtitle: '',
            itemimg: '',
            itemtext: '',
            itemdate: '',
            items: []
        };
    }

    componentDidMount() {

        axios.get('Paste Required API')
            .then((response) => {
                // console.log(response.data);
                var parseString = require('xml2js').parseString;
                var xml = response.data;
                var allitems;
                parseString(xml, function (err, result) {
                    console.log(result.items.item);
                    allitems = result.items.item;
                });
                this.setState({
                    nowavailable: true,
                    items: allitems,
                })

            })
            .catch((error) => {
                console.log(error);
            });

    }
    shoot = (a, b, c, d) => {
        if (!b) {
            b = 'logo192.png';
        }
        this.setState({
            setLgShow: true,
            itemtitle: a,
            itemimg: b,
            itemtext: c,
            itemdate: d,
        })
    }
    shootend = () => {
        this.setState({
            setLgShow: false,
            itemtitle: '',
            itemimg: '',
            itemtext: '',
            itemdate: '',
        })
    }


    render() {

        var { itemtitle, itemimg, itemtext, itemdate, lgShow, setLgShow, nowavailable, items } = this.state;
        console.log(setLgShow);
        if (!nowavailable) {
            return <div>Loading...</div>;
        } else {
            console.log(items[0].published_at[0]);
            return (
                <>
                    <Col xs={12} md={12}>
                        <h5 className="listboxheader"> News Flow </h5>
                    </Col>
                    <Container>
                        <Row>



                            {items.map(item => (

                                <Col xs={12} md={2} className="listbox" key={item.id[0]}>
                                    <Col xs={12} className="listboxin" key={item.id[0]}>
                                        <Image src={item.image_thumbnail_medium} fluid />
                                        <h6 id={item.id[0]} onClick={() => this.shoot(item.header, item.image, item.body[0], item.published_at[0]._)}>{item.header}</h6>
                                        <span>{item.published_at[0]._}</span>
                                    </Col>
                                </Col>


                            ))}


                            <Modal size="lg" show={setLgShow} onHide={() => this.shootend()} aria-labelledby="example-modal-sizes-title-lg" >

                                <Modal.Body>

                                    <h4>{itemtitle}</h4>
                                    <center>
                                        <Image fluid src={itemimg} />
                                    </center>
                                    <br />
                                    <p>
                                        <b>Published: </b> {itemdate}
                                    </p>
                                    {ReactHtmlParser(itemtext)}



                                </Modal.Body>
                            </Modal>

                        </Row>
                    </Container>
                </>
            );
        }
    }
}
ReactDOM.render(<Mynewscomp />, document.getElementById('root'));


serviceWorker.unregister();
