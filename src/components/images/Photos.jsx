import React from 'react';

import {Collection} from './Collection';

 const categs = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
 ]

function Photos() {

    const [collections, setCollections] = React.useState([])
    const [searchValue, setSearchValue] = React.useState('')
    const [categoryId, setCategoryId] = React.useState(1)
    const [isLoading, setIsLoading] = React.useState(true)
    const [page, setPage] = React.useState(1)

    React.useEffect(() => {
    setIsLoading(true)

        const category = categoryId ? `category=${categoryId}` : ''
        

        fetch(`https://6367fe49d1d09a8fa61eeef0.mockapi.io/photos?page=${page}&limit=3&${category}`)
        .then((res) => res.json())
        .then((json) => {
            setCollections(json)
        }).catch((err) => {
            console.warn(err)
            alert('Missing in using of files')
        }).finally(() => setIsLoading(false))
    }, [categoryId, page])


  return (

    <div className="photos">
      <h1 className='photos__title'>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categs.map((obj, i) => <li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>)}
        </ul>
        <input 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
            className="search-input" 
            placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoading ? (<h2>Loading...</h2>) : (collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
                <Collection
                    key={index}
                    name={obj.name}
                    images={obj.photos}
                />
        )))}

      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
                <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
            ))}
      </ul>
    </div>
  );
}


export default Photos