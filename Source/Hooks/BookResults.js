import { useState, useEffect } from "react";
import publicapis from '../API/server';


export default () => {
        
        const [books, setBooks] = useState([]);
        const [ errormessage, setErrormessage] = useState('');

        const Api = async () => {
             try{
                 const response = await publicapis.get('/entries');
            
             setBooks(response.data.entries);
             } catch (err) {
                      setErrormessage('U did a mistake');
             }
        };

        useEffect ( () => {
            Api();
       }, [] );

       return [ Api ];

};



