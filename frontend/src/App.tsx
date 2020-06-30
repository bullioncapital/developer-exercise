import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import * as superagent from "superagent";
import Table from './Table'

function App() {
  const [data, updateData] = useState([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    superagent.get("http://localhost:3001/FarmersMarket?pagination=1").end((error, res) => {
      if (error) {
        setError(true)
      }
      updateData(JSON.parse(res.text));
    });
  }, []);

  

  const columns = useMemo(() => [
      {
        Header: 'Data Table',
        columns: [
          {
            Header: 'FMID',
            accessor: 'FMID',
          },
          {
            Header: 'Market Name',
            accessor: 'MarketName',
          },
          {
            Header: 'Website',
            accessor: 'Website',
          },
          {
            Header: 'Facebook',
            accessor: 'Facebook',
          },
          {
            Header: 'Twitter',
            accessor: 'Twitter',
          },
          {
            Header: 'Youtube',
            accessor: 'Youtube',
          },
          {
            Header: 'Other Media',
            accessor: 'OtherMedia',
          },
          {
            Header: 'Street',
            accessor: 'street',
          },
          {
            Header: 'County',
            accessor: 'County',
          },
          {
            Header: 'State',
            accessor: 'State',
          },
          {
            Header: 'ZIP Code',
            accessor: 'zip'
          },
          {
            Header: 'Season 1 Date',
            accessor: 'Season1Date'
          },
          {
            Header: 'Season 1 Time',
            accessor: 'Season1Time'
          },
          {
            Header: 'Season 2 Date',
            accessor: 'Season2Date'
          },
          {
            Header: 'Season 2 Time',
            accessor: 'Season2Time'
          },
          {
            Header: 'Season 3 Date',
            accessor: 'Season3Date'
          },
          {
            Header: 'Season 3 Time',
            accessor: 'Season3Time'
          },
          {
            Header: 'Season 4 Date',
            accessor: 'Season4Date'
          },
          {
            Header: 'Season 4 Time',
            accessor: 'Season4Time'
          },
          {
            Header: 'X',
            accessor: 'x'
          },
          {
            Header: 'Y',
            accessor: 'y'
          },
          {
            Header: 'Location',
            accessor: 'Location'
          },
          {
            Header: 'Credit',
            accessor: 'Credit'
          },
          {
            Header: 'WIC',
            accessor: 'WIC'
          },
          {
            Header: 'WIC Cash',
            accessor: 'WICcash'
          },
          {
            Header: 'SFMNP',
            accessor: 'SFMNP'
          }, 
          {
            Header: 'SNAP',
            accessor: 'SNAP'
          }, 
          {
            Header:'Organic',
            accessor: 'Organic'
          }, 
          {
            Header:'Baked Goods',
            accessor: 'Bakedgoods'
          }, 
          {
            Header:'Cheese',
            accessor: 'Cheese'
          }, 
          {
            Header:'Crafts',
            accessor: 'Crafts'
          }, 
          {
            Header:'Flowers',
            accessor: 'Flowers'
          }, 
          {
            Header:'Eggs',
            accessor: 'Eggs'
          }, 
          {
            Header:'Seafood',
            accessor: 'Seafood'
          }, 
          {
            Header:'Herbs',
            accessor: 'Herbs'
          }, 
          {
            Header:'Vegetables',
            accessor: 'Vegetables'
          }, 
          {
            Header:'Honey',
            accessor: 'Honey'
          }, 
          {
            Header:'Jams',
            accessor: 'Jams'
          }, 
          {
            Header:'Maple',
            accessor: 'Maple'
          }, 
          {
            Header:'Meat',
            accessor: 'Meat'
          }, 
          {
            Header:'Nursery',
            accessor: 'Nursery'
          }, 
          {
            Header:'Nuts',
            accessor: 'Nuts'
          }, 
          {
            Header:'Plants',
            accessor: 'Plants'
          }, 
          {
            Header:'Poultry',
            accessor: 'Poultry'
          }, 
          {
            Header:'Prepared',
            accessor: 'Prepared'
          }, 
          {
            Header:'Soap',
            accessor: 'Soap'
          }, 
          {
            Header:'Trees',
            accessor: 'Trees'
          }, 
          {
            Header:'Wine',
            accessor: 'Wine'
          }, 
          {
            Header:'Coffee',
            accessor: 'Coffee'
          }, 
          {
            Header:'Beans',
            accessor: 'Beans'
          }, 
          {
            Header:'Fruits',
            accessor: 'Fruits'
          }, 
          {
            Header:'Grains',
            accessor: 'Grains'
          }, 
          {
            Header:'Juices',
            accessor: 'Juices'
          }, 
          {
            Header:'Mushrooms',
            accessor: 'Mushrooms'
          }, 
          {
            Header:'PetFood',
            accessor: 'PetFood'
          }, 
          {
            Header:'Tofu',
            accessor: 'Tofu'
          }, 
          {
            Header:'WildHarvested',
            accessor: 'WildHarvested'
          }, 
          {
            Header:'updateTime',
            accessor: 'updateTime'
          }
        ],
      },
    ],
    []
  )

  let table
  if (data.length) {
    table = <Table columns={columns} data={data} />
  } else {
    if (error) {
      table = <div>An Error Has Occured</div>
    } else {
      table = <div>Loading...</div>
    }
  }


  return (
    <div className="app">
      <div className="filter"></div>

      <div className="table-container">
        {table}
      </div>
    </div>
  );
}

export default App;
