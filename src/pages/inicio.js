import React, {useContext, useEffect, useRef, useState} from 'react';
import {home_styles} from "../styles/pages/homeStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Image from "../../package/components/Image";
import {card_viatge_autor_small, top_img_tagged_card} from "../styles/components/CardStyles";
import Grid from "../components/Grid";
import {useRouter} from "next/router";
import MaxWidthContainer from "../components/MaxWidthContainer";
import {useLazyQuery, useQuery} from "@apollo/client";
import {GET_PAGE_BY_URI, GET_POSTS, GET_VIATGES_AUTOR} from "../contexts/apollo/queries";
import {apolloClient, initializeApollo} from "../contexts/apollo/ApolloContext";
import {GET_VIATGES_DESTACATS} from "../contexts/apollo/queriesTest";
import {Card, Carousel, Col, Form, List, Row} from "antd";
import 'antd/dist/antd.css';
import {css} from "@emotion/react";
import Menu from "../components/Menu";
import HeaderInici from "../components/HeaderInici";
import {grid_style} from "../styles/components/GridStyles";
import {Meta} from "antd/lib/list/Item";
import {GET_NOVETATS} from "../contexts/apollo/queries/novetats";
import {LaunguageContext} from "../contexts/LanguageContext";
import axios from "axios";


const Page = ({title, uri, status, slug, featuredImage, notadestacada, descripcioviatgesdautor, Novetats,novetats,galeria,translations, content:contenido,page,...props}) => {



    /*PAGE INFO*/
    // const {title, uri, status, slug, featuredImage, notadestacada, descripcioviatgesdautor, Novetats} = page;



    const router = useRouter();
    const {language,setLanguage} = useContext(LaunguageContext);


    const PER_PAGE = 6;
    const LANG = 'ES';

    const [loadViatgesAutor, {loading: loadingVA, error: errorVA, data: dataVA}] = useLazyQuery(GET_VIATGES_AUTOR);
    const [loadViatgesDestacats, {loading: loadingVD, error: errorVD, data: dataVD}] = useLazyQuery(GET_VIATGES_DESTACATS);


    const [viatgesAutor, setViatgesAutor] = useState([]);
    const [viatgesDestacats, setViatgesDestacats] = useState([]);
    //const [pageInfo, setPageInfo] = useState(null);

    useEffect(() => {
        loadViatgesAutor({variables: {first: PER_PAGE, where:LANG} });
        loadViatgesDestacats({variables:{first:1600,language:LANG,categoryName:"destacat-es"}  });
        setLanguage({language: {...props.language}, pageTranslation:translations[0].slug})
    }, []);

    useEffect(() => {
        if (dataVA) {
            const {nodes, pageInfo} = dataVA.viatgesdautor;
            // setPageInfo(pageInfo);


            setViatgesAutor(viatgesAutor.concat(nodes));
        }
    }, [dataVA]);

    useEffect(() => {
        if (dataVD) {
            setViatgesDestacats(dataVD.viatges)


        }
    }, [dataVD]);


    const goTo = (url) => (e) => {
        router.push(url)
    }


/*    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        rows: 2,

    };

    const carrosusel = (theme) => {
        const style = css`
            .slick-slide{
                padding:1rem;
            }

        `;
        return [style];
    }

    const slider = useRef();
    const [slide, setSlide] = useState(0);

    const images =[featuredImage?.node?.mediaItemUrl,'/foto1.png'];
*/
    const images2 = galeria.slider.map((image=> image.slide.image.mediaItemUrl))

    const  fraseInici = galeria.slider.map((image=> image.slide.text))
    const  titolsInici = galeria.slider.map((image => image.slide.title))

    const [acceptComms, setAcceptComms] = useState(false);
    const [acceptPolicy, setAcceptPolicy] = useState(false);

    const mdirector = (e) => {
        e.preventDefault();

        if (!acceptComms || !acceptPolicy) {
            return;
        }

        console.log(e);

        const headers = {
            "Content-Type": "application/json"
        }

        const MDATA = {
            grant_type:"password",
            client_id:"webapp",
            username:"7619",
            password:"a1c1c04cd0f61adf24ee",
        }

        const config = {
            headers: {
               "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://malaikaviatges.com",
       /*         'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*",*/
             /*   'Content-Type': 'text/plain',*/
                'Connection':'keep-alive',
                'Accept':'*',

            },
        };

        var formdata = new FormData();

        formdata.append("grant_type", "password");
        formdata.append("client_id", "webapp");
        formdata.append("username", "7619");
        formdata.append("password", "a1c1c04cd0f61adf24ee");

        /*  http://www.mdirector.com/api_contact  */
        /*   https://app.mdirector.com/oauth2  */


           axios.post("https://app.mdirector.com/oauth2/",MDATA,config).then((resp) => {
                    console.log(resp)

            })  .catch(error => {

               console.error('There was an error!', error);
           });

        };



    return (

        <div css={home_styles}>

           <HeaderInici title={titolsInici} fraseInici={fraseInici} img={images2}/>

            <MaxWidthContainer className={"block1"}>

                {
                    notadestacada.avisos &&
                    notadestacada.avisos.length > 0 &&
                    <div className={"alert"}>
                        <div className={'head'}>
                            <span css={{color: 'red'}}>*</span>
                            <span className={""}>AVISOS:</span>
                        </div>
                        <div className={'alert-group'}>
                            {
                                notadestacada.avisos.map((item) => {
                                    const {avis} = item;
                                    return (
                                        <div dangerouslySetInnerHTML={{__html: avis}}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                }



                    <div className={"cita"}>
                        <div dangerouslySetInnerHTML={{__html: contenido }}/>
                    </div>



                <div className={'title'}>
                    <h2>
                        <span>Viajes</span><span>de autor /</span>
                    </h2>
                    <h5 className={'litle'}>Grupos reducidos</h5>
                </div>
                {
                    descripcioviatgesdautor && descripcioviatgesdautor.descripcioViatgesDautor &&
                    <div css={{width: '60%'}} className={"subtitle fs-25 bold didot"}
                         dangerouslySetInnerHTML={{__html: descripcioviatgesdautor.descripcioViatgesDautor}}/>
                }



                <Grid css={grid_style("400px")}>
                    {
                        viatgesAutor.map((viatge) => {
                            const {
                                content,
                                date,
                                id,
                                slug,
                                status,
                                title,
                                viatgedautorId,
                                Campsviatge: customFields,
                                featuredImage: image
                            } = viatge;
                            const {
                                autor,
                                durada,
                                preu,
                                taxes,
                                suplement,
                                etapes,
                                fitxa,
                                vols,
                                sortides
                            } = customFields;


                            return (
                                <div  css={card_viatge_autor_small}>
                                    <div className={"card-text"}>
                                        <span className={"card-title"}>{title}</span>
                                        <div className={"card-data"}><img src={"/calendar_icon.png"}/>
                                            <span>
                                            {sortides.map((item) => item.datasortida)}
                                            </span>
                                        </div>
                                        <span className={"more-info"} onClick={goTo("viaje-de-autor/" + slug)}>Más información    &#8594;</span>
                                    </div>
                                    <Image className={"photo"} alt={image?.altText} src={image?.node?.mediaItemUrl}/>
                                </div>
                            )
                        })
                    }

                </Grid>

                <div className={"more"}><a href={"viajes-de-autor"} onClick={(e) => {
                    loadViatgesAutor({
                        variables: {
                            first: PER_PAGE,
                           /* after: pageInfo.endCursor,
                            last: null,
                            before: null*/
                        }
                    })
                }}>Ver más viajes de autor  &#8594;</a></div>

            </MaxWidthContainer>



            <div className={"block2"}>

                <MaxWidthContainer className={'container'}>

                    <h2 className={"title"}>Destinaciones /</h2>

                    <Grid css={grid_style("300px")}>
                        {
                            viatgesDestacats?.nodes?.map((item) => {
                                const {dates} = item.Campsviatge;
                                return (
                                    <div onClick={goTo("viaje-destinacion/" + item.slug)} css={top_img_tagged_card}>
                                        <Image className={"image_card"} src={item.featuredImage.node.mediaItemUrl}></Image>
                                        <div className={"text"}>
                                            <span className={"title"}>{item.title}</span>
                                            <span className={"tags"}>{item.subtitolViatge.subtitolviatge}</span>
                                            <span className={"calendar"}><img src={"/calendar_icon.png"}/> {dates}</span>
                                            <span className={"more_info"}>Más información<span className={"arrow"}>&#8594;</span>	</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Grid>

                    {/*<div className={"next_prev"}>
                         //onClick={e => { setSlide(e); slider.current.prev(); }}
                        <button > &#60; </button>
                        <button disabled>
                            <i className="fas fa-slash"></i>
                        </button>
                        <button> > </button>
                    </div>*/}

                </MaxWidthContainer>

            </div>

            <div className={"block3"}>
                <MaxWidthContainer>
                    <Row className={"row"}>

                        <Col sm={20} md={8} lg={6} className={"column"}>
                            <span css={{color: '#9B9B9B'}}>Malaika</span>
                            <h4 className={"title-novetats"}>{Novetats.titolNovetats}</h4>
                            <p className={"descripcio_novetats"}>{Novetats.descripcioNovetats} </p>

                        </Col>

                        <Col sm={20} md={16} lg={18} className={"column"}>

                            <div className={"normas"}>
                                {
                                    novetats?.edges?.slice(0,3).map((item) => {
                                        let novetat = item.node;
                                        let date = new Intl.DateTimeFormat('es',{day: 'numeric', month: 'numeric', year: 'numeric'}).format(new Date(Date.parse(novetat.date)));

                                        return (
                                            <div className={'n-row'} css={{borderBottom: '1px solid grey'}}>
                                                <div sm={24} md={4} lg={4} className={'fecha'}>{date}</div>
                                                <div sm={24} md={20} lg={19} className={'data'}>
                                                    <div className={"data_title"}>{novetat.title}</div>
                                                    <div dangerouslySetInnerHTML={{__html: novetat.content}}
                                                         className={"data_content"}/>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                        </Col>


                    </Row>


                </MaxWidthContainer>
            </div>


            <div className={"block4"}>

                <MaxWidthContainer>

                    <Row className={"row"}>

                        <Col sm={20} md={24} lg={12}>
                            <p className={"info"}>Y si quieres estar informado de todo</p>
                        </Col>

                        <Col sm={20} md={24} lg={12}>

                            <div className={"subscribe"}>
                                <p>Suscríbete a nuestro Newsletter</p>
                                <p>Registrarse en nuestras listas de correo y recibirá las novedades
                                    ofertas y promociones directamente en la bandeja de entrada.</p>
                            </div>

                            <div>
                                <form onSubmit={mdirector}>
                                    <input name={"email-news"} css={{margin:'0'}} type={"text"} placeholder={"Tu email"}/>
                                    <button htmlType="submit" disabled={!acceptComms || !acceptPolicy}>Suscríbete</button>

                                    <div className={"legal-text"}>
                                        <p>Al pulsar en el botón “enviar” se subscribe a nuestro boletín de noticias que le enviaremos puntualmente a través de email a la dirección indicada, resultando su acción una clara acción afirmativa. Así mismo le informamos que Assessors Malaika Viatges, S.L. conocida comercialmente como MALAIKA VIATGES, actúa como responsable del tratamiento de datos, y que la finalidad de estas comunicaciones será dar respuesta a su solicitud y mantenerle informado de nuestras novedades en los productos que ofrecemos. En cualquier momento puede darse de baja enviando su solicitud siguiendo las instrucciones indicadas en cada correo de nuestro newsletter.</p>
                                    </div>

                                    <div className={"conditions"}>
                                        <input
                                            type={"checkbox"}
                                            checked={acceptComms}
                                            onChange={(e) => setAcceptComms(e.target.checked)}
                                            required
                                        />
                                        <p>Acepto el envío de comunicaciones comerciales de otras empresas asociadas.</p>
                                    </div>

                                    <div className={"conditions"}>
                                        <input
                                            type={"checkbox"}
                                            checked={acceptPolicy}
                                            onChange={(e) => setAcceptPolicy(e.target.checked)}
                                            required
                                        />
                                        <p>He leído y acepto la <a target={"_blank"} href={"/politica-privacidad"}>política de privacidad</a> y el <a target={"_blank"} href={"/aviso-legal"}>aviso legal</a>.</p>
                                    </div>
                                </form>

                            </div>
                        </Col>
                    </Row>

                </MaxWidthContainer>

            </div>

            <Footer/>

        </div>
    );
};

export const getStaticProps = async (ctx) => {
    const client = initializeApollo();
    const page = await client.query({query: GET_PAGE_BY_URI, variables: {uri: '/inicio/'}})
        .then((data) => {
            return data.data.pageBy;
        });

    const novetats = await client.query({query: GET_NOVETATS, variables: {lang: 'ES'} })
        .then((data) => {
            return data.data.novetats;
        });


    return {props: {...page,novetats}, revalidate: 60};
}

export default Page;



