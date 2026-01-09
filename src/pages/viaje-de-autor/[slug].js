import React, {useContext, useEffect, useState} from 'react';
import {viatge_fitxa} from "../../styles/pages/fitxa_viatge_autorStyles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "../../../package/components/Image";
import {card_itinerari, card_itinerari_finish} from "../../styles/components/CardStyles";
import Card from "../../../package/components/Card";
import MaxWidthContainer from "../../components/MaxWidthContainer";
import {bicolor_style} from "../../styles/components/BiColorBlock";
import {initializeApollo} from "../../contexts/apollo/ApolloContext";
import {GET_VIATGE_BY_SLUG, GET_VIATGE_DAUTOR_BY_SLUG} from "../../contexts/apollo/queriesTest";
import {Row, Col, Table} from 'antd';
import 'antd/dist/antd.css';
import HeaderInici from "../../components/HeaderInici";
import {LaunguageContext} from "../../contexts/LanguageContext";


const PageViatgeDautor = ({ data, ...props}) => {

    const {language,setLanguage} = useContext(LaunguageContext)

    // ------------------------------------------------------------------------------------------
    const [page, setPage] = useState(null);
    const [campsViatge, setCampsviatge] = useState(null);

    useEffect(() => {
        if (data) {
            setPage(data.viatgedautor);
            setCampsviatge(data.viatgedautor.Campsviatge);
        }
    },[data]);
    // ------------------------------------------------------------------------------------------

    useEffect(() => {
        if (page) {
            setLanguage({ ...language,  pageTranslation: page.translations.length >= 1 ? "viatge-dautor/" + page.translations[0].slug : null});
        }
    }, [page]);

    return (
        <div css={viatge_fitxa}>
            <HeaderInici title={page?.title} img={page?.featuredImage?.node?.mediaItemUrl}/>

            <MaxWidthContainer>
                <div className={"breadcrumb"}>Viajes de autor > {page?.title}</div>
            </MaxWidthContainer>

            <MaxWidthContainer className={"block1"}>

                <Row >
                    <Col className={"left_column"} sm={24} md={12} >
                        <div>
                            <div className={"title"}>
                                <div style={{marginBottom: '1rem'}}>{page?.title}</div>
                                <div style={{fontSize: '1.2rem'}}>{page?.subtitolViatge?.subtitolviatge}</div>
                            </div>
                            <div className={"content"} dangerouslySetInnerHTML={{__html: page?.content}}/>
                            {
                                campsViatge?.fitxa?.mediaItemUrl &&
                                <button><a target={"_blank"} css={{color:'white'}} href={campsViatge?.fitxa?.mediaItemUrl}>Ficha viaje pdf</a></button>
                            }
                            {
                                campsViatge?.notaFitxa &&
                                <span style={{fontStyle: 'italic', fontSize: '.7rem', display: 'block', marginTop: '1rem'}}>{campsViatge?.notaFitxa}</span>
                            }
                        </div>
                    </Col>

                    <Col  className={"right_column"}  sm={24} md={12}>
                        <div>
                            <p>GRUPO: {campsViatge?.grup}</p>
                            <span dangerouslySetInnerHTML={{__html: `PRECIO: ${campsViatge?.preu || ''}`}}/>
                            <span>Tasas de aeropuerto: {campsViatge?.taxes}</span>
                            <span dangerouslySetInnerHTML={{__html: `Suplemento hab. individual: ${campsViatge?.suplement || ''}`}}/>
                        </div>


                        {   campsViatge?.vols &&
                            <Row className={"plane"}>
                                <Col span={2}>
                                    <img className={"mapa"} src={
                                    campsViatge?.vols[0].vol.tipustrajecte === "Vol"
                                        ? "../plane_icon.png"
                                        : "../tren.png"
                                    }/>
                                </Col>
                                <Col span={22}>

                                    <Row gutter={[10,5]} className={'table-parent'}>
                                        <table>
                                            {
                                                campsViatge?.vols.map((item)=>{
                                                    return (
                                                        <>
                                                            {/*<Col css={{width: 'auto'}}><span css={{whiteSpace: 'nowrap'}} key={item.vol.ubicacio} className={"vol"}>{item.vol.ubicacio}</span></Col>
                                                        <Col css={{width: 'auto'}}><span css={{whiteSpace: 'nowrap'}} key={item.vol.datavol} className={"vol"} >{item.vol.datavol}</span></Col>
                                                        <Col css={{width: 'auto'}}><span css={{whiteSpace: 'nowrap'}} key={item.vol.numvol} className={"vol"} >{item.vol.numvol}</span></Col>
                                                        <Col css={{width: 'auto'}}><span css={{whiteSpace: 'nowrap'}} key={item.vol.horari} className={"vol vol-right"} >{item.vol.horari}</span></Col>*/}

                                                            <tr>
                                                                <td><span className={"vol"}>{item.vol.ubicacio}</span></td>
                                                                <td><span className={"vol"}>{item.vol.datavol}</span></td>
                                                                <td><span className={"vol"}>{item.vol.numvol}</span></td>
                                                                <td><span className={"vol vol-right"}>{item.vol.horari}</span></td>
                                                            </tr>

                                                        </>
                                                    )
                                                })
                                            }
                                        </table>
                                    </Row>
                                </Col>
                            </Row>
                        }



                        {/* DIFERENCIA CON DESTINACIONS*/}
                        <div className={"block_mapa"}>
                            <p className={"bold"}>ITINERARIO</p>
                            <Image className={"mapa"} src={campsViatge?.mapa.mediaItemUrl}/>
                        </div>



                    </Col>

                </Row>

            </MaxWidthContainer>


            {
                campsViatge?.inclou &&
                <div className={"block2"} css={bicolor_style}>
                    <MaxWidthContainer>
                        <Row>
                            <Col className={"left"} sm={24} md={12}>

                                <div className={"inclou"}>
                                    <p className={"title"}>Incluye</p>
                                    <p className={""} dangerouslySetInnerHTML={{__html: campsViatge?.inclou}}/>
                                </div>

                            </Col>

                            <Col className={"right"} sm={24} md={12}>
                                <div className={"inclou"}>
                                    <p className={"title"}>No incluye</p>
                                    <p className={""} dangerouslySetInnerHTML={{__html: campsViatge?.noInclou}}/>
                                </div>
                            </Col>
                        </Row>
                    </MaxWidthContainer>
                </div>
            }

            <MaxWidthContainer className={"block3_autor"}>
                <p className={"title"}>Itinerario</p>

                <Row gutter={[60]} className={"row_itinerari"}>
                    <Col sm={24} md={12}>
                        {
                            campsViatge?.etapes.slice(0, (campsViatge?.etapes.length / 2) % 2 === 0 ? campsViatge?.etapes.length / 2 : (campsViatge?.etapes.length / 2)+1).map((item) => {

                                return (
                                    <div css={card_itinerari} key={item.etapa.titol}>
                                        <p className={"etapa_title"}>{item.etapa.dia}  <span className={"etapa_ubicacio"}>{item.etapa.ubicacio}</span></p>
                                        <p className={"etapa_title"} css={{marginBottom: '.2rem'}}><span className={"etapa_ubicacio"}>{item.etapa.titol}</span></p>
                                        <p className={"etapa_title"}> <span className={"etapa_ubicacio"}>{item.etapa.subtTol}</span></p>
                                        <p className={""} dangerouslySetInnerHTML={{__html: item.etapa.descripcio}}/>

                                    </div>)
                            })

                        }
                    </Col>

                    <Col sm={24} md={12} >
                        {

                            campsViatge?.etapes.slice( (campsViatge?.etapes.length / 2) % 2 === 0 ? campsViatge?.etapes.length / 2 : ((campsViatge?.etapes.length / 2)+1)).map((item,i) => {
                                const number = campsViatge?.etapes.length;
                                return (
                                    <div css={ number !== i+1 ? card_itinerari : card_itinerari_finish} key={i}>
                                        <p className={"etapa_title"}>{item.etapa?.dia} <span className={"etapa_ubicacio"}>{item?.etapa?.ubicacio}</span></p>
                                        <p className={"etapa_title"} css={{marginBottom: '.2rem'}}><span className={"etapa_ubicacio"}>{item.etapa.titol}</span></p>
                                        <p className={"etapa_title"}> <span className={"etapa_ubicacio"}>{item.etapa.subtTol}</span></p>
                                        <p className={""} dangerouslySetInnerHTML={{__html: item.etapa.descripcio}}/>
                                    </div>)
                            })

                        }
                    </Col>
                </Row>





            </MaxWidthContainer>



            <Footer/>
        </div>

    );

};


export async function getStaticPaths() {
    return {
        paths: [ { params: { slug:"atapuerca-i-burgos/" } } ],
        fallback: true
    };
}

export async function getStaticProps({ params,...ctx }) {
    const {data, initialState} = await getInitialData(params.slug);
    return { props: { data, slug: params.slug, initialState }, revalidate: 60};
}

const getInitialData = async (slug) => {
    const apolloClient = initializeApollo();
    const {error, data} = await apolloClient.query({query: GET_VIATGE_DAUTOR_BY_SLUG, variables: { slug: slug }});
    return { data: data, initialState: apolloClient.cache.extract()};
}

export default PageViatgeDautor;



