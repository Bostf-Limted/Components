import { Col, Container, Row } from "react-bootstrap";
import { FaAt, FaPhone, FaAddressBook, FaMapMarkerAlt, FaGithub, FaLink} from "react-icons/fa";
import "../styles/footer.scss";
import React from "react";

export const Footer = () =>{
    return (
        <section id="contacts">
            <div className="px-3 pb-3 pt-5">
                <Container fluid={true} className="px-md-3 px-lg-5">
                    <Row>
                        <Col md={6}>
                            <table style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th className="text-blue"><FaLink size={20}/> Quick Links</th>
                                    </tr>
                                    <tr>
                                        <td><a href="#">Latest Event</a></td>
                                        <td><a href="#">Terms and Conditions</a></td>
                                    </tr>
                                    <tr>
                                        <td><a href="#">Privacy policy</a></td>
                                        <td><a href="#">Contact us</a></td>
                                    </tr>
                                </thead>
                            </table>
                        </Col>
                        <Col md={6}>
                            <table style={{width:"100%"}}>
                                <thead>
                                    <tr>
                                        <th className="text-blue"><FaAddressBook size={24}/> Contacts</th>
                                    </tr>
                                    <tr>
                                        <td><FaAt size={18}/> Bsoftlimited@gmail.com</td>
                                        <td><FaGithub size={18}/><a href="#"> Github.com/bsoftlimited</a></td>
                                    </tr>
                                    <tr>
                                        <td><FaMapMarkerAlt size={18}/> Back of Amarata Yenagoa Bayelsa State</td>
                                        <td><FaPhone size={18}/> +234 708 795 2034</td>
                                    </tr>
                                </thead>
                            </table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr/>
                            <p className="footer-company-name" style={{textAlign:"center"}}>All Rights Reserved. &copy; {new Date().getFullYear()} <a href="#">Bsoft Limited</a> Design By : <a href="https://html.design/">Okelekele Nobel Bobby</a></p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
}