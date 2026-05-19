import React, {useContext, useEffect, useState} from 'react';
import {nosaltres_styles} from "../styles/pages/nosaltresStyles";
import Header from "../components/Header";
import Image from "../../package/components/Image";
import Footer from "../components/Footer";
import {blog_styles} from "../styles/pages/blogStyles";
import {card_blog, card_blog_thumbnail} from "../styles/components/CardStyles";
import {useRouter} from "next/router";
import MaxWidthContainer from "../components/MaxWidthContainer";
import {Col, Row} from "antd";
import {useLazyQuery} from "@apollo/client";
import {GET_VIATGES_DESTACATS} from "../contexts/apollo/queriesTest";
import {GET_BLOG_ENTRY_BY_SLUG, GET_BLOG_ENTRYS} from "../contexts/apollo/queries/blog";
import moment from "moment";
import HeaderInici from "../components/HeaderInici";
import {initializeApollo} from "../contexts/apollo/ApolloContext";
import {GET_PAGE_BY_URI} from "../contexts/apollo/queries";
import {LaunguageContext} from "../contexts/LanguageContext";


const Page = ({data, ...props}) => {

    const elements = ['one', 'two', 'three'];
    const router = useRouter();

    const {setLanguage} = useContext(LaunguageContext);
    useEffect(() => {
        setLanguage({ language: 'CA', pageTranslation: 'blog-2' });
    }, []);

    const goTo = (slug) => (e) =>{
        router.push(slug)
    }

    const [posts, setPosts] = useState([]);
    const [loadPosts, { loading, errorD, data: dataEntrys }] = useLazyQuery(GET_BLOG_ENTRYS);
    useEffect(() => {
        if (dataEntrys) {
            setPosts(dataEntrys.posts.nodes);
        }
    },[dataEntrys]);

    const [recentPost, setRecentPosts] = useState([]);
    const [loadRecentPosts, { loading: loadingRecents, error: errorRecents, data: dataRecents }] = useLazyQuery(GET_BLOG_ENTRYS);
    useEffect(() => {
        if (dataRecents) {
            setRecentPosts(dataRecents.posts.nodes);
        }
    },[dataRecents]);

    useEffect(() => {
        loadPosts({variables: { where: "CA" }});
        loadRecentPosts({ variables: { where:"CA" }});
    }, []);

    return (
        <div css={blog_styles}>
            <HeaderInici
                title={"Blog"}
                img={"palmeras.png/"}/>

            <MaxWidthContainer>
                <div className={"block1"}>

                    <Row gutter={[40]}>
                        <Col className={"left_column"} sm={24} md={16} lg={14} >
                            {
                                posts &&
                                posts.map((element)=>{

                                    const{content,title,slug,featuredImage,date,excerpt} = element;
                                    return(
                                        <div  onClick={goTo("/blog/"+slug)} css={card_blog} >
                                            <span><Image  src={featuredImage?.node?.mediaItemUrl}/></span>
                                            <p>{moment(date).format('DD-MM-YYYY')}</p>
                                            <p className={"title_entry"}>{title}</p>
                                            <p  className={""} dangerouslySetInnerHTML={{__html: excerpt}}/>
                                            <p >Més informació &#8594;</p>
                                        </div>
                                    )
                                })
                            }

                        </Col>

                        <Col className={"right_column recent"} sm={24} md={8} lg={10}  >
                            <input className={"search_input"} placeholder={"cercar..."} type={"text"}/>

                            <div >
                                <p className={"recent_post"}>Articles recents</p>

                                {
                                    recentPost.map((element)=>{
                                        const{content,title,slug,featuredImage,date} = element;
                                        return(
                                            <Row gutter={[20]} onClick={goTo("/blog/"+slug)} css={card_blog_thumbnail}>
                                                <Col span={8}><Image  src={featuredImage?.node?.mediaItemUrl}/></Col>
                                                <Col span={16}>
                                                    <span className={"title_entry"}>{title}</span>
                                                    <span className={"date"}>{moment(date).format('DD-MM-YYYY')}</span></Col>

                                            </Row>
                                        )
                                    })
                                }
                            </div>

                        </Col>
                    </Row>

                </div>

            </MaxWidthContainer>

            <Footer/>

        </div>

    );

};

export const getStaticProps = async (ctx) => {
    const {data, initialState} = await getInitialData();
    return {props: {data, initialState}, revalidate: 60};
}

const getInitialData = async (slug) => {
    const apolloClient = initializeApollo();
    const {error, data} = await apolloClient.query({query: GET_PAGE_BY_URI, variables: { uri: '/blog/' }})
    return { data: data, initialState: apolloClient.cache.extract()};
}

export default Page;



