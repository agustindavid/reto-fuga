<script context="module">
    import axios from "axios";
    import axiosRetry from 'axios-retry';
    import Hero from '../components/hero.svelte'
    import { variables } from "../api/variables";


    

    const query = `
    query getHome {
        pageBy(uri: "reto-fuga-2022") {
            id
            title
            content
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
            url:variables.basePath,
            method: 'POST',
            timeout: 9000,
            data: {
                query: query,
            },
        });
    
            responseObj = response.data

            if (responseObj.data.pageBy) {
                const content = responseObj.data.pageBy.content;
                isLoading=false;
                serverDown=false;
                
                return {
                    props: {
                        content,
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
    let title = 'Reto Fuga 2022'

    const seoProps= {
        title,
    }
</script>

{#if !(isLoading)}

<Hero />

<div class="reto-fuga-wrap">
    <div class="container mx-auto px-4">
        <div class="content-page">
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
                <img class=" w-auto max-h-16  mx-auto ">
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

