import React, {useContext, useEffect} from 'react';
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


const PageBlogEntry = ({children,title,slug,content,featuredImage,date, ...props}) => {

    const {setLanguage} = useContext(LaunguageContext);

    useEffect(() => {
        setLanguage({ language: 'ES', pageTranslation: 'blog' });
    }, []);

    if(title === undefined){
        return null
    }

    return (
        <>

            <div css={blog_article_styles}>

                <HeaderInici
                    title={"ESPACIO DE DIVULGACIÓN"}
                    img={"/blog_card.png/"}/>

                <MaxWidthContainer>

                    <div className={"block_text"}>

                        <div className={"notice"}>
                            <Row>
                                <Image src={featuredImage.node.mediaItemUrl}/>
                            </Row>
                           <Row>
                               <p className={"title"}>{title}</p>
                               <p  className={"content"} dangerouslySetInnerHTML={{__html: content}}/>
                           </Row>

                        </div>


{/*                        <Row gutter={[40]}>
                            <Col span={4}>
                                <div className={"border_top"}>
                                </div>
                            </Col>
                            <Col span={20}>
                                <p className={"text_border"}>Las Vegas has more than 100,000 hotel rooms to choose from. There is something for every budget, and enough entertainment within walking distance to keep anyone occupied for months, never mind the usual weekend stay or honeymoon.</p>
                            </Col>
                        </Row>

                        <p>The Centers for Disease Control & Prevention (CDC) on Saturday began distributing cards at airports receiving flights returning directly from Hong Kong warning travelers returning to the United States from Hong Kong & Guangdong Province, People’s Republic of China & Hanoi, Vietnam that they may have been exposed to cases of severe acute respiratory syndrome (SARS).</p>
                        <p>The cards are being handed out by quarantine officials at Chicago, O’Hare International Airport; Los Angeles; old York City, JFK International Airport; Newark; & San Francisco. These airports are the only U.S. airports receiving direct flights from Hong Kong. No U.S. airports receive direct flights from Hanoi or the Guangdong Province. CDC officials expect to expand the distribution of cards to Anchorage, Alaska & the territory of Guam later today.</p>


                        <Row className={"doble_image"} gutter={[40, 40]}>
                            <Col span={12}>
                                <Image src={"/blog_card.png"}></Image>
                            </Col>
                            <Col span={12}>
                                <Image src={"/blog_card.png"}></Image>
                            </Col>
                        </Row>


                        <div className={"steps_block"}>

                            <div>
                                <p className={"step"}>1) Try not to get drunk</p>
                                <p>Some of the people that are playing, and that have few rounds to play in the tournament don’t count the drinks they have during their games and at the very end of the day they don’t have power to continue till the last game, which is a pity to loose such a big opportunity, so, don’t drink a lot and be prepare for the last round, also come up with all your senses in order. If you drink, do it measurable and just to loose the nerves before the games but also have some other drinks like soda, water, coffee and others to hydrate your self. 2) Is it important where I sit? Yes it is, in a tournament try not to sit next to the dealer, take a place in where you will feel that you are in front of the dealer to have the feeling that he is giving you a game. Also in a place where you will feel comfortable with your self and you will have a perspective of the other players.</p>
                            </div>

                            <div>
                                <p className={"step"}>3) Make your self comfortable while playing</p>
                                <p>Some of the people that are playing, and that have few rounds to play in the tournament don’t count the drinks they have during their games and at the very end of the day they don’t have power to continue till the last game, which is a pity to loose such a big opportunity, so, don’t drink a lot and be prepare for the last round, also come up with all your senses in order. If you drink, do it measurable and just to loose the nerves before the games but also have some other drinks like soda, water, coffee and others to hydrate your self. 2) Is it important where I sit? Yes it is, in a tournament try not to sit next to the dealer, take a place in where you will feel that you are in front of the dealer to have the feeling that he is giving you a game. Also in a place where you will feel comfortable with your self and you will have a perspective of the other players.</p>
                            </div>

                            <div>
                                <p className={"step"}>5) Also your words and mimic are important during the game.</p>
                                <p>Some of the people that are playing, and that have few rounds to play in the tournament don’t count the drinks they have during their games and at the very end of the day they don’t have power to continue till the last game, which is a pity to loose such a big opportunity, so, don’t drink a lot and be prepare for the last round, also come up with all your senses in order. If you drink, do it measurable and just to loose the nerves before the games but also have some other drinks like soda, water, coffee and others to hydrate your self. 2) Is it important where I sit? Yes it is, in a tournament try not to sit next to the dealer, take a place in where you will feel that you are in front of the dealer to have the feeling that he is giving you a game. Also in a place where you will feel comfortable with your self and you will have a perspective of the other players.</p>
                            </div>

                        </div>*/}


                    </div>

                </MaxWidthContainer>



{/*

                <div className={"video_blog"}>
                    <Image src={"/blog_article.png"}></Image>
                </div>

                <MaxWidthContainer className={"last_block"}>
                    <p>The rules of travel have altered so much in the last few years, with strict regulation regarding air travel, questionable car searches that may vary in regulation from state to state, and the feeling of never really being ultimately sure what is appropriate or improper in the travel world any longer. In most cases, if you decide to fly the formerly affable skies, your airline or airport website will have an accurate and up to date list regarding what is okay and what is not okay regarding your luggage. As if packing for a trip wasnt difficult enough, now we all have to do it with cloudy and blurry regulations and a list we print out from the airlines.</p>
                    <p>The first measure of travel complacency is simple; dont try to squeeze on a carry on that you know is not really a carry on. You will get yourself into the frustrating position of trying to argue your way onto the airplane with an large bag that just wont do. Youre not going to succeed. Once upon a time you would, but not anymore. Now, you will simply be forced to check it and risk being charged an additional fee for having too many luggage items. Plus, youre going to end up travelling without your usual band of comfort items that you could have had if you just scaled down into standard sized carry on luggage. The simple fact is that there used to be wiggle room, and now, there is none.</p>
                </MaxWidthContainer>
*/}


            </div>
            <Footer/>

        </>
    );

};


export async function getStaticPaths() {

    return {
        paths: [
            {params: {slug: "expo-dubai-2021"}} // See the "paths" section below
        ],
        fallback: true // See the "fallback" section below
    };
}

export async function getStaticProps({params, ...ctx}) {

    const client = initializeApollo();

    const {error, data} = await client.query({query: GET_BLOG_ENTRY_BY_SLUG, variables: {slug: params.slug}});
    const page = data.postBy;
    return {props: {...page}, revalidate: 60};
}


export default PageBlogEntry;



