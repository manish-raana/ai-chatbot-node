import axios from "axios";
import * as cheerio from "cheerio";

async function scrapeWebPage(url=''){
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    const pageHead = $('head').html();
    const pageBody = $('body').html();
    
    const internalLinks = [];
    const externalLinks = [];

    $('a').each((_, el)=>{
        const link = $(el).attr('href')
        if(link.startsWith('https') || link.startsWith('http')){
            externalLinks.push(link)
        }else{
            internalLinks.push(link)
        }
    })

    return {head: pageHead, body:pageBody, internalLinks: internalLinks, externalLinks: externalLinks}
}

scrapeWebPage('https://manishrana.in').then(console.log);