import axios, { HttpStatusCode } from "axios";
import { Request, Response } from "express";
//import cheerio from 'cheerio'
import { TBookmark, TDeleteBookmark } from "../../types/apiTs";
import Bookmark from "../../models/Bookmark";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { helper } from "../utils/helper";
import Cheerio  from "cheerio";

export const scrapedController = {
  //scrape products
  // async gets(req: Request, res: Response) {
  //   try{
  //     console.log('****start scraping...');

  //     async function scrapeSite() {
  //       //const url = `https://www.google.com/search?q=${keyword}&tbm=isch`;
  //       const url = `https://coinmarketcap.com`;
  //       const {data} = await axios.get(url);
  //       //console.error(data);
  //       return data;
  //     }

  //     // const keyword = 'hot';
  //     const data = await scrapeSite();
  //     const $ = Cheerio.load(data);

  //     // products
  //     const cryptoPrices = $('.productItem');
  //     const productsData:any = [];

  //     cryptoPrices.each((index:any, element:any) => {
  //       const imageUrl = $(element).find('.product_image img').attr('src');
  //       const beforePrice = $(element).find('.beforePrice').text().trim();
  //       const finalPrice = $(element).find('.finalPrice').text().trim();
  //       const title = $(element).find('.item_title').text().trim();

  //       productsData.push({
  //         imageUrl,
  //         beforePrice,
  //         finalPrice,
  //         title,
  //       })
  //     })

  //     // const spans:any = [];
  //     // DOM('span').each((_idx:any, el:any) => {
  //     //   console.log(_idx);
  //     //   const span = DOM(el).text();
  //     //   spans.push(span);
  //     // })

  //     // get images
  //     // const images:any = [];
  //     // DOM('table.RntSmf').each((i:any, elem:any) => {
  //     //   const imgSrc = DOM(elem).find('img').attr('src');
  //     //   const text = DOM(elem).find('span:first-child').text();
  //     //   images.push({
  //     //     imgSrc, text,
  //     //   });
  //     // })

  //     //console.log(images);

  //     return res.status(HttpStatusCode.Created).json({
  //       msg: 'products!',
  //       results: productsData.slice(0, 5),
  //     });
      
  //   }catch(err:any) {
  //     return res.status(400).json({
  //       msg: 'products failed!',
  //       error: err?.message || err,
  //     });
  //   }
  // },

  async gets(req: Request, res: Response) {
    console.log('****get crypto data...');
    
    try{
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
      
      console.log(response)
      return res.status(HttpStatusCode.Ok).json({
        msg: 'crypto!',
        results: helper.getRandomElements(response.data, 7),
      });
      
    }catch(err:any) {
      return res.status(HttpStatusCode.BadRequest).json({
        msg: 'crypto failed!',
        error: err?.message || err,
      });
    }
  },
  
  async getCryptoHistory(req: Request, res: Response) {
    try{
      console.log('****get crypto history...');
      const {address} = req.body;

      if (!address) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'missing input!',
        success: false,
      })

      const historicalPrice = [];
      const chain = EvmChain.ETHEREUM;

      // get a list crypto prices
      for (let toBlock = 16323500; toBlock < 16323550; toBlock += 10) {
        const response = await Moralis.EvmApi.token.getTokenPrice({
          address,
          chain,
          toBlock,
        });
    
        historicalPrice.push(response?.toJSON());
      }
      
      return res.status(HttpStatusCode.Created).json({
        msg: 'crypto history!',
        results: historicalPrice,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'crypto history failed!',
        error: err?.message || err,
      });
    }
  },

  async getMarks(req: Request, res: Response) {
    try{
      console.log('****fetching bookmarks...');
      //@ts-ignore
      const user = req.user;

      if (!user) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'missing input!',
        success: false,
      })

      const bookmarks = await Bookmark.find({
        user: user._id,
      }).limit(6);

      const edited = bookmarks.map((el:any) => {
        return {
          _id: el.id,
          jsonData: JSON.parse(el.jsonData),
        }
      })

      return res.status(HttpStatusCode.Created).json({
        msg: 'bookmarks!',
        results: edited,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'bookmarks failed!',
        error: err?.message || err,
      });
    }
  },

  async create(req: Request, res: Response) {
    try{
      console.log('****create bookmark...', req.body);
      //@ts-ignore
      const user = req.user;

      const {jsonData}:TBookmark = req.body;

      if (!jsonData || !user) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'missing input!',
        success: false,
      })

      const bookmark = await Bookmark.create({
        jsonData: JSON.stringify(jsonData),
        user: user._id,
      });

      return res.status(HttpStatusCode.Ok).json({
        msg: 'create bookmark!',
        results: bookmark,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'create bookmark failed!',
        error: err?.message || err,
      });
    }
  },

  async delete(req: Request, res: Response) {
    try{
      console.log('****remove bookmark...', req.body);
      //const {itemId}: TDeleteBookmark = req.body;
      //@ts-ignore
      const {itemId}: TDeleteBookmark = req.params;

      if (!itemId) return res.status(HttpStatusCode.BadRequest).json({
        msg: 'missing input!',
        success: false,
      })

      const result = await Bookmark.deleteOne({_id: itemId});

      return res.status(HttpStatusCode.Ok).json({
        msg: 'delete bookmark!',
        results: result,
      });
      
    }catch(err:any) {
      return res.status(400).json({
        msg: 'delete bookmark failed!',
        error: err?.message || err,
      });
    }
  },
}

/*





const tokens = [
        
        { tokenAddress: "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24" },
        { tokenAddress: "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85" },
        { tokenAddress: "0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4" },
        {  tokenAddress: "0x75231F58b43240C9718Dd58B4967c5114342a86c" },
        { tokenAddress: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0" },
        {  tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
        //{tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9EB0cE3606EB48" },
        { tokenAddress: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84" },
        { tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" },
        {  tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" },
        { tokenAddress: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE" },
        { tokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA" },
        {tokenAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" },
        { tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F" },
      ];
      const randTokens = helper.getRandomElements(tokens, 4);
      const chain = EvmChain.ETHEREUM;

      const response = await Moralis.EvmApi.token.getMultipleTokenPrices(
        {
          chain: chain,
          include: 'percent_change',
        },
        {
          tokens: randTokens,
        }
      );
          
      //const res = await fetchPrice();
      //const response = await Promise.all(promises);

      // await Moralis.start({
      //   apiKey: MORALIS_API_KEY,
      // });

      // const address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
      // const chain = EvmChain.ETHEREUM;

      // const response = await Moralis.EvmApi.token.getTokenPrice({
      //   address,
      //   chain,
      // });

      console.log('PRICE**************', response);

*/ 