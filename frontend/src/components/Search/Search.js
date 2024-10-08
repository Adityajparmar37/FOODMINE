import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';


Search.defaultProps = {
    searchRoute: '/search/',
    defaultRoute: '/',
};

export default function Search({searchRoute , defaultRoute,margin}) {

    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchTerm } = useParams();


    const search = async () => {
        term ? navigate(searchRoute + term) : navigate(defaultRoute);
    };

    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm])
    return (
        <div className={classes.container} style={{margin}}>

            <input
                type="text"
                placeholder='Search Your food'
                onChange={e => setTerm(e.target.value)}
                onKeyUp={e => e.key === 'Enter' && search()}
                value={term} />

            <button onClick={search}>Search</button>
        </div>
    )
}
