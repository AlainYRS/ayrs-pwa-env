/*---------------------------------------------------------
 ------------- README COMPONENT INSTRUCTIONS: -------------
 The component has to be imported as:
 import PagesHead from 'this component path'
 and implemented as an html element with the tag giving its intarface parameters as:
    <PagesHeadComp 
        faviconURL={"/Icons/NIXINIcon.png"} //URL of icon to be displayed besides the title tab.
        title={LangLegends['Index.title']} //Title to be displayed in the tab. In case of traslations needs to consider the marker and tag to be traslated, such as this sample.
        description={LangLegends['Index.description']} //Description to be read by SEO for this page
        keywords={LangLegends['Index.keywords']} //Keywords to be read by SEO for this page
    />
---------------------------------------------------------*/
//Libraries
import React from 'react' //Import React
import Head from 'next/head' //Import the Head component from nextjs

interface IPagesHead{ //Interface for the Pages Head component
    faviconURL: string, //URL of icon to be displayed besides the title tab.
    title: string, //Title to be displayed in the tab. In case of traslations needs to consider the marker and tag to be traslated, such as this sample.
    description: string, //Description to be read by SEO for this page
    keywords: string, //Keywords to be read by SEO for this page
}
function PageMetadata(props:IPagesHead) { //Pages Head component
    return( //Component with the specific metatags appñicable to every page to be displayed in order to optimize the title, icon, description, and keywords for the SEO in the desired language
        <>
            <Head> {/*Head component*/}
                <title>{props.title}</title> {/*Title to be displayed in the tab. In case of traslations needs to consider the marker and tag to be traslated, such as this sample.*/}
                <link rel="icon" href={props.faviconURL} /> {/*URL of icon to be displayed besides the title tab.*/}
                <meta name="title" content={props.title} /> {/*Title to be displayed in the tab. In case of traslations needs to consider the marker and tag to be traslated, such as this sample.*/}
                <meta name="description" content={props.description} /> {/*Description to be read by SEO for this page*/}
                <meta name="keywords" content={props.keywords}/> {/*Keywords to be read by SEO for this page*/}
                <meta name='viewport' content='minimum-scale=1, initial-scale=1, maximum-scale=5, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover'/> {/*Viewport for mobile devices*/}
            </Head>
        </>
    );
}
export default React.memo(PageMetadata)    //Export the component