import React from 'react';
import Prismic from 'prismic-javascript';
import Head from 'next/head'

const Index = ({ data }) => {
    console.log('client');

    return (
        <div className="relative bg-gray-400 h-screen" style={{  
            color: data.cortexto 
        }}>
            <Head>
                <title>{data.titulo_da_pagina}</title>
            </Head>
            <div className="w-1/2 mx-auto text-center" >
                <h1 className="font-bold text-4xl p-8">{data.titulo}</h1>
                <img src={data.logo.url} className="mx-auto rounded-full shadow-2xl w-1/5"></img>
                
                    { data.body.map((item) => {
                        if(item.slice_type === "secao"){
                            return <h2 className="mx-auto font-bold pt-4 text-2xl">{item.primary.nome}</h2>
                        }
                        // if(item.slice_type === "imagem"){
                        //     return <img src={item.primary.imagem.url} className="mx-auto"></img>
                        // }
                        // if(item.slice_type === "icone"){
                        //     return <img src={item.primary.icone1.url}></img>
                        // }
                    
                        if(item.slice_type === "link"){
                            return(
                                
                                    <a href={item.primary.destino} className="bg-blue-500 hover:bg-blue-700 test-white font-bold py-2 px-4 m-2 inline-block rounded">{item.primary.texto_do_botao}</a>
                            
                        );
                        }
                        return null;
                    
                    })}
            </div>   

            <div className="absolute bottom-0 w-full text-center my-4 py-4" >
               <p className="">Projeto desenvolvido no DEV 10K - DevPleno</p> 
            </div>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre>    */}
        </div> 
    );
};

export async function getServerSideProps(){
    console.log('server');

    const client = Prismic.client("https://raimundojunior.cdn.prismic.io/api/v2");
    const centralLinks = await client.getSingle("centrallinks");
    //console.log(centralLinks)
    return{ 
        props: {
            data: centralLinks.data,
        },
    };
}

export default Index;