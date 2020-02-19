import { default as React,useState,useEffect} from 'react'

const SearchGroup = ({onSearch}) => {
    const [search,setSearch] = useState('');

    useEffect(()=>{
        onSearch(search);
    },[search]);

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button className="btn btn-primary" type="button" id="button-addon1" onClick={()=>setSearch('')}>Limpiar</button>
            </div>
            <input type="text" className="form-control" value={search} onChange={(e)=>setSearch(e.currentTarget.value)} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
        </div>
    )
}

export default SearchGroup;