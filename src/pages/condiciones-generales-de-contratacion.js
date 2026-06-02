import React from 'react';
import {nosaltres_styles} from "../styles/pages/nosaltresStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "../../package/components/Image";
import MaxWidthContainer from "../components/MaxWidthContainer";
import {apolloClient, initializeApollo} from "../contexts/apollo/ApolloContext";
import {GET_PAGE_BY_URI} from "../contexts/apollo/queries";
import {Col, Row} from "antd";
import HeaderInici from "../components/HeaderInici";
import {politica_styles} from "../styles/pages/politicaStyles";
import {useRouter} from "next/router";


const Page = ({title, content, ...props}) => {

    const router = useRouter();
    const goTo = (e) => {
        router.push("inici")
    }

    return (
        <div css={politica_styles}>

            {/*  <HeaderInici title={title} />*/}

            <MaxWidthContainer className={"block1"}>
                <Image onClick={goTo} src={"logoMalaika.png"}></Image>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{__html: content}}/>

            </MaxWidthContainer>

            <Footer/>
        </div>

    );

};

export const getStaticProps = async (ctx) => {
    const client = initializeApollo();
    const data = await client.query({query: GET_PAGE_BY_URI, variables: {uri: '/condiciones-generales-de-contratacion/'}})
        .then((data) => {
            console.log(data)
            return data.data.pageBy;
        });
    return {props: {...data}, revalidate: 10};
}

export default Page;











