import React, {useContext, useState, useEffect} from 'react';
import {useRouter} from "next/router";
import {header_styles} from "../styles/HeaderStyles";
import Image from "../../package/components/Image";
import Menu from "./Menu";
import {footer_styles} from "../styles/FooterStyles";
import MaxWidthContainer from "./MaxWidthContainer";
import {Col, Row} from "antd";
import 'antd/dist/antd.css';
import {LaunguageContext} from "../contexts/LanguageContext";

const Footer = ({img = true, children, ...props}) => {

    const router = useRouter();
    const {language,setLanguage} = useContext(LaunguageContext);

    useEffect(() => {

    }, []);

    const {language:lang} = language

    return (
        <MaxWidthContainer>
            <div css={footer_styles}>
                <p className={"info_contact fs-14 sbold"}>{lang === "CA" ? "Informació de contacte" : "Información de contacto" } </p>

                <Row gutter={[10, 40]} justify={"space-between"} align={"middle"}>

                    <Col  xs={24} sm={24} md={12} lg={8}>
                        <div className={"contact"}>
                            <span className={"address"}>Carrer de París, 209, Pral 2a</span>
                            <span className={"address"}>08008 BARCELONA</span>

                            <div className={"phone"}>
                                <img src={"/phone_icon.png"}/>
                                <a css={{color:'black'}} href={"tel:+34 930 011 176"}><span  css={{color:'black'}} className={"db"}>+34 930 011 176</span></a>
                            </div>

                            <a target={"_blank"} href="mailto:aayats@malaikaviatges.com" >aayats@malaikaviatges.com</a>
                        </div>

                    </Col>

                    {/*<Col xs={24} sm={24} md={12} lg={5}>
                        <div className={"contact"}>
                            <span  className={"address"}>Camí dels Horts, 8</span>
                            <span  className={"address"}>17124 Llofriu, Girona</span>
                            <div className={"phone"}>
                                <img src={"/phone_icon.png"}/>
                                <a css={{color:'black'}} href={"tel:+34 872 503 266"}><span  css={{color:'black'}} className={"db"}>+34 872 503 266</span></a>
                            </div>

                            <a target={"_blank"} href="mailto:mtribulietx@malaikaviatges.com">mtribulietx@malaikaviatges.com</a>
                        </div>
                    </Col>*/}

                    <Col xs={24} sm={24} md={12} lg={8}>
                        <div className={"logos"}>
                            <div>
                                <a css={{cursor: 'default'}} target={"_blank"}><Image className={"logo-item"} src={"/locos-por-viajar.jpg"}></Image> </a>
                                <a css={{cursor: 'default'}} target={"_blank"}><Image className={"logo-item"} src={"/avasa-logo.jpg"}></Image> </a>
                            </div>
                            <div>
                                <a target={"_blank"} href={"http://animalesinvisibles.com/"}><Image className={"logo-item"} src={"/animal-invisibles.png"}></Image> </a>
                            </div>
                        </div>

                    </Col>

                    <Col xs={24} sm={24} md={12} lg={8}>
                        <div className={" last"}>
                            {
                                lang === "CA" &&
                                <span className={"politicas"}><a target={"_blank"} href={"/avis-legal"}>Avís legal</a> / <a target={"_blank"} href={"/condicions-generals-de-contractacio"}>Condicions generals</a> / <a target={"_blank"} href={"/politica-privacitat"}>Política de privacitat</a></span>

                            }

                            {
                                lang === "ES" &&
                                <span className={"politicas"}><a target={"_blank"} href={"/aviso-legal"}>Aviso legal</a> / <a target={"_blank"} href={"/condiciones-generales-de-contratacion"}>Condiciones generales</a> / <a target={"_blank"} href={"/politica-privacitat"}>Política de privacidad</a></span>

                            }
{/*
                            <span className={"politicas"}><a target={"_blank"} href={"avis-legal"}>{lang === "CA" ? "Avís legal" : "Aviso legal" }</a> / <a target={"_blank"} href={"condicions-generals"}>{lang === "CA" ? "Condicions generals" : "Condiciones generales" }</a></span>
*/}
                            <div className={"social"}>
                                <a target={"_blank"} href={"https://www.facebook.com/malaikaviatges"}><img src={"/facebook_icon.png"}/></a>
                                <a target={"_blank"} href={"https://www.instagram.com/malaikaviatges/"}><img src={"/instagram_icon.png"}/></a>
                            </div>

                        </div>
                    </Col>
                </Row>


            </div>
        </MaxWidthContainer>

    );

};


export default Footer;



