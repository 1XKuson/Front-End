import React, { useState , useEffect } from 'react'
import '../css/SearchProfile.css'
import { Dropdown } from 'primereact/dropdown';
import api from '../../api/api';

function SearchBar() {
    const [searchBox,setSearchbox] = useState('')
    const [searchData,setSearchData] = useState(null)

    useEffect(() => {
        console.log('searchData:', searchData);
    }, [searchData]);

    async function search(){
        try{
            const datasearch = await api.post('/filters/search',{
                searchInput : searchBox
            })
            setSearchData(datasearch.data.results);
        }catch(error){
            console.log('err: ' ,error);
            setSearchData('')
        }
    }

  return (
    <>
        <div className='contentSearch'>
            <div className='headerSearch'>ค้นหาอาจารย์</div>
            <div className='searchInputBox'>
                <input 
                    type='text' 
                    placeholder='คำค้นหา' 
                    className='searchInput'
                    value={searchBox}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setSearchbox(e.target.value)
                    }}
                />
            </div>
            <button className='toSearch' onClick={search}>ค้นหา</button>
        </div>
    </>
  )
}

export default SearchBar