import {css} from '@emotion/react';

export const home_styles = (theme) => {
    const style = css`


        .block1 {

            margin-top: 0;
            padding-bottom: ${theme.container.vertical_padding};

            border-bottom: 1ps solif ${theme.colors.light_gray};

            .alert {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                margin-bottom: 5.2rem;
                .head {
                    margin-right: 1rem;
                    font-family: ${theme.font.didot};
                    font-weight: ${theme.font.bold};
                    font-size: ${theme.font.sm};
                }
                .alert-group {
                    font-family: ${theme.font.quicksand};
                    font-size: ${theme.font.sm};
                    p {
                        font-family: ${theme.font.quicksand};
                        font-size: ${theme.font.sm};
                    }
                }

                :after{
                    flex-basis: 60%;
                    display: block;
                    height: 2px;
                    background-color: red;
                    content: "";
                    border: 1px solid #E1E1E1;
                    width: 80px;

                }
            }

            .cita {
                p{
                    font-family: ${theme.font.didot};
                    font-weight: ${theme.font.bold};
                    font-size: ${theme.font.xl};
                }

                margin-bottom: 6rem;
            }

            .title {
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                font-family: ${theme.font.didot};
                font-weight: ${theme.font.bold};
                margin-bottom: 2.2rem;

                h2 {
                    display: flex;
                    flex-direction: column;
                    margin-right: 1rem;
                    font-size: 2.8rem;
                }

                .litle {
                    color: ${theme.colors.primary};
                    font-size: 1.8rem;
                }
            }

            .subtitle {
                margin-bottom: 4rem;
                p {
                    font-family: ${theme.font.didot};
                    font-weight: ${theme.font.bold};
                    font-size: 1.25rem;
                }
            }



            .more {
                float: right;
                font-family: ${theme.font.didot};
                font-weight: ${theme.font.medium};
                font-size: ${theme.font.sm};
                & > a {
                    display: block;
                    color: black;
                }
            }
        }


        .block2 {
            background-color: #F8F8F8;
            padding-top: 4.5rem;
            padding-bottom: 4.5rem;
            margin-top: 4.5rem;

            > div {
              //  padding: 0 ${theme.container.horizontal_padding};
               > .title {
                    font-family: ${theme.font.didot};
                    font-weight: ${theme.font.medium};
                    margin-bottom: 4.4rem;
                }

            }




        }


        .block3 {
            background-color: #4D4D4D;
            padding-top: 3rem;


            .row {

            /*Columna GRIS*/

            .column:first-of-type {
                color: white;
                padding: 0 2rem;
                flex: 1 0 30%;

                span {
                    margin-bottom: .5rem;
                    font-family: ${theme.font.quicksand};
                    font-weight: ${theme.font.regular};
                    font-size: ${theme.font.s};
                    display: block;
                }

                h4 {
                    font-family: ${theme.font.didot};
                    font-weight: ${theme.font.regular};
                    color: ${theme.colors.primary};
                    font-size: ${theme.font.h3};
                    margin-bottom: 1.7rem;
                }

                p {
                    font-family: ${theme.font.quicksand};
                    font-weight: ${theme.font.regular};
                    font-size: ${theme.font.m};
                    margin-bottom: 3.5rem;
                }

                .descripcio_novetats{
                    color:white;
                    font-size: ${theme.font.sm};
                    text-align: justify;
                }


                p:nth-of-type(3) {
                    width: 80%;
                }

                input {
                    background-color: white;
                    border-radius: 1px;
                    // width: 50%;
                }

            }


            /*Columna BLANCA*/

            .column:nth-of-type(2) {

                background-color: white;
                border-top-left-radius: 23px;
                border-top-right-radius: 23px;

                .normas {

                    p, span{
                        font-family: ${theme.font.quicksand};
                        font-size: ${theme.font.sm};
                        margin-bottom: 0px;
                    }
                    
                    font-size: ${theme.font.sm};
                    color:black;
                    padding:2rem 3rem 0;
                    
                    .n-row {
                        
                        padding-bottom: 1.5rem;
                        margin-bottom: 1.5rem;
                        
                        display: flex;
                        flex-direction: column;
                        
                        ${theme.mq('tablet-landscape')} {
                                flex-direction: row;
                            }
                        
                        &:last-of-type {
                            border-bottom: none;
                        }
                        
                        .fecha {
                            text-align: left; 
                            padding-right: 10px;
                            padding-bottom: 1rem;
                            
                            ${theme.mq('tablet-landscape')} {
                                text-align: right;
                            }
                        }
                        
                        .data_title {
                            margin-bottom: 0.5rem;
                        }
    
    
                        .data_content{
                            margin-bottom: 0rem;
                            padding-left: 10px;
                        }


                        .more {
                            color:${theme.colors.primary}
                        }
                    }

                }
            }

            }

        }


        .block4 {
            padding:  4.5rem 0;
            background-color: #F8F8F8;
            .info{
                font-family: ${theme.font.didot};
                font-weight: ${theme.font.bold};
                font-size: ${theme.font.h5};
            }

            .subscribe{

                p:first-of-type{
                    font-size: 0.9rem;
                    font-weight: ${theme.font.medium};
                }

                p:nth-of-type(2){
                    font-size: 0.6rem;
                }
            }

            .legal-text{
                margin-top: 1rem;
                p{
                    font-size: 0.7rem;
                    line-height: 1.4;
                    text-align: justify;
                }
            }

            .conditions{
                display: flex !important;
                flex-direction: row;
                align-items: flex-start;
                margin-top: 0.75rem;
                gap: 0.5rem;

                input[type='checkbox']{
                    width: 1rem;
                    height: 1rem;
                    min-width: 1rem;
                    margin: 0.2rem 0 0 0;
                    padding: 0;
                    flex-shrink: 0;
                    cursor: pointer;
                }

                p{
                    margin: 0;
                    font-size: ${theme.font.sm};
                    flex: 1;
                }

                a{
                    cursor: pointer;
                }
            }

            button:disabled{
                opacity: 0.5;
                cursor: not-allowed;
            }


            button{
                padding-left: 1rem;
                padding-right: 1rem;
            }




        }



    `;

    return [style];
}



