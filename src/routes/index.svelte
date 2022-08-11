<script context="module">
    import axios from "axios";
    import axiosRetry from 'axios-retry';
    import Hero from '../components/hero.svelte'
    import Carousel from '../components/Carousel.svelte'
    import { variables } from "../api/variables";
    

    const query = `
    query getHome {
        pageBy(uri: "reto-fuga-2022") {
            id
            title
            content
            slidesHome {
                slides {
                    slide {
                        mediaItemUrl
                    }
                }
            }
        }
    }
    `;

    let isLoading = true;
    let serverDown=true;
    
    export async function load({} ) {
        axiosRetry(axios, {
            retries: 3, // number of retries
            retryDelay: (retryCount) => {
                console.log(`retry attempt: ${retryCount}`);
                return retryCount * 2000; // time interval between retries
            },
            retryCondition: (error) => {
                // if retry condition is not specified, by default idempotent requests are retried
            },
        });

        let responseObj;

        try {
            const response = await axios({
            url:'https://mdsmx.xyz/fuga/graphql',
            method: 'POST',
            timeout: 9000,
            data: {
                query: query,
            },
        });
    
            responseObj = response.data

            if (responseObj.data.pageBy) {
                const content = responseObj.data.pageBy.content;
                const slides = responseObj.data.pageBy.slidesHome.slides;
                isLoading=false;
                serverDown=false;
                

                return {
                    props: {
                        content,
                        slides,
                    }
                };
                
            } else {
                return {
                    props: {
                        isLoading,
                    }
                }
            }
        } catch(error) {
            console.log(error);
            console.log(error.code)
            if(error.code=='ECONNABORTED') {
                console.log('aja');
                return {
                    props: {
                        serverDown,
                        isLoading,
                    }
                }
            }
            return {
                props: {
                    isLoading,
                }
            }
        }   
    }

</script>

<script>

    export let content;
    export let slides;
    let title = 'Reto Fuga 2022'

    //console.log(slides);
    const seoProps= {
        title,
    }
</script>

{#if !(isLoading)}

<Hero />


<div class="reto-fuga-wrap mt-8">
    <div class="container mx-auto px-4">
        <div class="content-page">
            <div class=" text-center hidden">
                <a class=" text-gray-800 no-underline "  href="https://mdsmx.xyz/fuga/wp-content/uploads/2022/06/Poster-RETO-FUGA.jpg" download>Ver poster del evento</a>
            </div>
                <p>Conoce la región media de San Luis Potosí y parte de la impresionante Huasteca Potosina mientras das todo sobre la bici en el Reto Fuga 2022.</p>
                <h2>Locación: Ríoverde, San Luis Potosí</h2>
                <p><strong>Rioverde</strong>&nbsp;es el centro agrícola, económico y demográfico más importante de la&nbsp;<strong>Región Media</strong>&nbsp;de San Luis Potosí. Se localiza a aproximadamente 140 km al oriente de la capital del estado.</p>
                <p>Rioverde ofrece unas de las áreas naturales más atractivas de la entidad, la&nbsp;<strong>Laguna de la Media Luna</strong>, ideal para practicar esnórquel, natación, salto en tirolesa y campismo.</p>
                <p>Otro atractivo (no menos espectacular) en Rioverde es la&nbsp;<strong>Gruta de la Catedral</strong>, en la comunidad de Alamitos. Este tesoro subterráneo recibe ese nombre porque en su interior se ha formado, durante miles de años, un enorme salón con formaciones calcáreas semejantes a un púlpito, con altar y sus respectivos reclinatorios. Otro sitio natural de gran interés es el area protegida La Loma, ideal para los amantes del senderismo</p>


                <Carousel slides={slides} />

            {@html content}
        </div>
    </div>
</div>

{:else}

<div class="w-full h-screen text-white bg-fuga-pink flex justify-center items-center text-4xl">
  Cargando

  <div class="sponsors bg-gray-100  text-center text-gray-700 mt-16  py-16 text-6xl hidden">
    <h2 class=" font-ubuntu font-medium text-5xl text-fuga-pink mb-16">Nuestros patrocinantes:</h2>
    <div class="container mx-auto">
      <div class="flex flex-wrap flex-row items-center">
            <div class=" basis-6/12 py-6 lg:py-0 lg:basis-3/12 px-4 lg:px-10 my-8">
                <img class=" w-auto max-h-16  mx-auto " alt="none">
            </div>
      </div>
    </div>
  </div>
</div>

{/if}

<style>
    .reto-fuga-wrap {
        font-size: 1.3rem;
    }
</style>

