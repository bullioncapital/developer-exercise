import express from "express";
import sqlite3 from "sqlite3";
import cors from 'cors'

const PORT = 3001
const db = new sqlite3.Database("db");
const app = express();
app.use(cors());

app.get("/FarmersMarket", async function (req, res) {
  try {
    const pagination: number = Math.round((req?.query?.pagination || 0) as number)
    const limit: number = (req?.query?.limit || 20) as number
    const farmersMarketData = await getFarmersMarketDataCache(pagination, limit)
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
  [key: number]: Array<T> 
}

const farmersMarketCache: Cache<FarmersMarketData> = {}
async function getFarmersMarketDataCache(pagination: number, limit: number): Promise<FarmersMarketData[]>  {
  if (farmersMarketCache[pagination]) {
    return farmersMarketCache[pagination]
  } else {
    return await getFarmersMarketData(pagination, limit)
  }
}

async function getFarmersMarketData (pagination: number, limit: number): Promise<FarmersMarketData[]> {
  let base = 'SELECT * FROM farmers_markets_from_usda'
  let limitQuery = ''
  const data = []

  if (pagination) {
    const start = (pagination - 1) * limit
    const end = pagination * limit
    limitQuery = 'LIMIT ?, ?'
    data.push(start, end)
  }

  const stmt = `${base} ORDER BY FMID ASC ${limitQuery}`
  return await query(stmt, data)
}

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

