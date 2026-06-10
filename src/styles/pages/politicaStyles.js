import {css} from '@emotion/react';

export const politica_styles = (theme) => {
    const style = css`

        padding-top: 5rem;
        .block1 {

            > img {
                display: block;
                margin:auto;
                margin-bottom: 4rem;
                cursor: pointer;
            }
            h1{
                margin-bottom: 2rem;
                font-size: 1.8rem;
            }

            h2{
                margin-bottom: 1.5rem;
                font-size: 1.4rem;
            }

            h3{
                margin-bottom: 1rem;
                font-size: 1.2rem;
            }

            ul{
                list-style: disc;
                padding-left: 2rem;
                margin: 0 0 1rem;
            }

            ol{
                list-style: decimal;
                padding-left: 2rem;
                margin: 0 0 1rem;
            }

            ul ul, ol ul{
                list-style: circle;
                margin-bottom: 0;
            }

            ul ol, ol ol{
                list-style: lower-alpha;
                margin-bottom: 0;
            }

            li{
                margin-bottom: 0.5rem;
                line-height: 1.4;
            }
        }


    `;

    return [style];
}



