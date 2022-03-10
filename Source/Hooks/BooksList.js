import { useState, useEffect } from "react";
import publicapis from '../API/server';


export default () => {

    const [books, setBooks] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    
    const Allbooks = async () => {
       try{
           const response = await publicapis.get('/entries?category=books&https=true',
           { params: { limit: 50 }
           });
           setBooks(response.data.entries);
       } catch (err) {
           setErrorMessage('u did miatake');
       }
    };

    

    useEffect( () => {
        Allbooks()
    }, [] );

    return [ Allbooks, books, errorMessage ];
};