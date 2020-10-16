import React, { useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useRouter } from 'next/router';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Head from 'next/head'

const RedirectTo = () => {
    const router = useRouter()
    useEffect(() => {
      console.log("carregou");
    //   setTimeout(() => {
    //       console.log("redirecionar")
    //       router.push("/")
    //   }, 1000)
    }, [])

    return (
        
        <div className="w-1/2 mx-auto text-center mt-8">
            <Head>
                <title>JSoftware</title>
            </Head>

            <h1 className="font-bold text-4xl">URL não encontrada</h1>
            <p>Estamos redirecionando você para a central de links.</p>
        </div>
            );
};

export async function getServerSideProps({ params, res }){
    console.log(params);

    const client = Prismic.client("https://raimundojunior.cdn.prismic.io/api/v2");
    const link = await client.getByUID("shortlink", params.slug);

    if(link){
        res.statusCode = 301 //conteudo movido permanentimente
        res.setHeader('Location', link.data.destino.url) //redirecionar
        res.end();
        return;
    }
    
    //console.log(link)

    return{
        props: {},
    };
}

export default RedirectTo;