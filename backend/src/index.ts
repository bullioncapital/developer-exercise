import express from "express";
import sqlite3 from "sqlite3";
import cors from 'cors'

const PORT = 3001
const db = new sqlite3.Database("db");
const app = express();
app.use(cors());

app.get("/FarmersMarket", async function (req, res) {
  try {
    const farmersMarketData = await getFarmersMarketDataCache()
    res.send(farmersMarketData)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
  
});

interface FarmersMarketData {
  FMID: any,
  MarketName: any,
  Website: any,
  Facebook: any,
  Twitter: any,
  Youtube: any,
  OtherMedia: any,
  street: any,
  County: any,
  State: any,
  zip: any,
  Season1Date: any,
  Season1Time: any,
  Season2Date: any,
  Season2Time: any,
  Season3Date: any,
  Season3Time: any,
  Season4Date: any,
  Season4Time: any,
  x: any,
  y: any,
  Location: any,
  Credit: any,
  WIC: any,
  WICcash: any,
  SFMNP: any,
  SNAP: any,
  Organic: any,
  Bakedgoods: any,
  Cheese: any,
  Crafts: any,
  Flowers: any,
  Eggs: any,
  Seafood: any,
  Herbs: any,
  Vegetables: any,
  Honey: any,
  Jams: any,
  Maple: any,
  Meat: any,
  Nursery: any,
  Nuts: any,
  Plants: any,
  Poultry: any,
  Prepared: any,
  Soap: any,
  Trees: any,
  Wine: any,
  Coffee: any,
  Beans: any,
  Fruits: any,
  Grains: any,
  Juices: any,
  Mushrooms: any,
  PetFood: any,
  Tofu: any,
  WildHarvested: any,
  updateTime: any,
}

interface Cache<T> {
  expirey: number
  data: Array<T> 
}
const EXPIRY = 1000 * 60 * 60 // Hour Cache
let farmersMarketCache: Cache<FarmersMarketData>

// Would ideally be in a cache package
async function getFarmersMarketDataCache(): Promise<FarmersMarketData[]>  {
  if (farmersMarketCache && farmersMarketCache.expirey > Date.now()) {
    return farmersMarketCache.data
  } else {
    const farmersMarketData = await getFarmersMarketData()
    farmersMarketCache = {
      expirey: Date.now() + EXPIRY,
      data: farmersMarketData
    }
    return farmersMarketData
  }
}

// Would ideally be in a sub folder inside sql package
async function getFarmersMarketData (): Promise<FarmersMarketData[]> {
  return query('SELECT * FROM farmers_markets_from_usda ORDER BY FMID ASC')
}

// Would ideally be in a sql package
function query (sql: string, params?: Array<any>): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, row) => {
      if (error) {
        return reject(error)
      }
      return resolve(row)
    })
  })
}
  

app.listen(PORT, () => {
  console.log(`Opening app on port ${PORT}`)
});

