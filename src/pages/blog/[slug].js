import React, {useContext, useEffect, useState} from 'react';
import {viatge_autor_fitxa} from "../../styles/pages/fitxa_viatge_autorStyles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "../../../package/components/Image";
import {card_itinerari, card_itinerari_finish} from "../../styles/components/CardStyles";
import Card from "../../../package/components/Card";
import MaxWidthContainer from "../../components/MaxWidthContainer";
import {bicolor_style} from "../../styles/components/BiColorBlock";
import {initializeApollo} from "../../contexts/apollo/ApolloContext";
import {GET_VIATGE_BY_SLUG, GET_VIATGE_DAUTOR_BY_SLUG} from "../../contexts/apollo/queriesTest";
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
import {blog_article_styles} from "../../styles/pages/blog_articleStyles";
import {GET_BLOG_ENTRY_BY_SLUG} from "../../contexts/apollo/queries/blog";
import HeaderInici from "../../components/HeaderInici";
import {LaunguageContext} from "../../contexts/LanguageContext";


const PageBlogEntry = ({ data, slug, ...props }) => {

    const [page, setPage] = useState(null);
    const {setLanguage} = useContext(LaunguageContext);

    useEffect(() => {
        setLanguage({ language: 'CA', pageTranslation: 'blog-2' });
    }, []);

    useEffect(() => {
        if (data) {
            setPage(data.postBy);
        }
    },[data]);

    return (
        <>
            <div css={blog_article_styles}>

                <HeaderInici title={"ESPAI DE DIVULGACIÓ"} img={"/blog_card.png/"}/>

                <MaxWidthContainer>

                    <div className={"block_text"}>

                        <div className={"notice"}>
                            <Row>
                                <Image src={page?.featuredImage?.node.mediaItemUrl}/>
                            </Row>
                            <Row>
                               <p className={"title"}>{page?.title}</p>
                               <p  className={"content"} dangerouslySetInnerHTML={{__html: page?.content}}/>
                            </Row>
                        </div>

                    </div>

                </MaxWidthContainer>

            </div>

            <Footer/>

        </>
    );

};


export async function getStaticPaths() {

    return {
        paths: [
            {params: {slug: "expo-dubai-2021"}}
        ],
        fallback: true
    };
}

export async function getStaticProps({params, ...ctx}) {
    const {data, initialState} = await getInitialData(params.slug);
    return {props: {data, slug: params.slug, initialState}, revalidate: 60};
}

const getInitialData = async (slug) => {
    const apolloClient = initializeApollo();
    const {error, data} = await apolloClient.query({query: GET_BLOG_ENTRY_BY_SLUG, variables: { slug }});
    return { data: data, initialState: apolloClient.cache.extract()};
}

export default PageBlogEntry;



