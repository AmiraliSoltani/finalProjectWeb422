import useSWR from 'swr';
import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useEffect, useState} from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '../lib/userData';

export default function ArtworkCardDetail(props) {
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    //const [showAdded, setShowAdded] = useState(favouritesList.includes(props.objectID));
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{
      setShowAdded(favouritesList?.includes(props.objectID))
     }, [favouritesList])

     async function favouritesClicked (){
if (showAdded) {
  setFavouritesList(await removeFromFavourites(props.objectID))
  //setFavouritesList(current => current.filter(fav => fav != props.objectID));
  setShowAdded(false)
}
else{
  setFavouritesList(await addToFavourites(props.objectID))
  //setFavouritesList(current => [...current, props.objectID]);
  setShowAdded(true)

}
    }
    return (
        <>
        {!data && <> </>}
        {error && <Error statusCode={404} />}
    {data&& 
    <>
   <Card>
   {data.primaryImage&& <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title? data.title:"N/A" }</Card.Title>
        <Card.Text>
        <div><b>Date:&nbsp;</b>{data.objectDate? data.objectDate:"N/A" }</div>
        <div><b>Classification:&nbsp;</b>{data.classification? data.classification:"N/A" }</div>
        <div><b>Medium:&nbsp;</b>{data.medium? data.medium:"N/A" }</div>
<br></br>
<div><b>artistDisplayName:&nbsp;</b>{data.artistDisplayName? data.artistDisplayName :"N/A" }
&nbsp;{data.artistWikidata_URL&& <>(<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>)</> }
</div>
<div><b>creditLine:&nbsp;</b>{data.creditLine? data.creditLine:"N/A" }</div>
<div><b>dimensions:&nbsp;</b>{data.dimensions? data.dimensions:"N/A" }</div>
<br></br>
<Button onClick={favouritesClicked} variant={showAdded? "primary":"outline-primary" }>{showAdded? "+ Favourite (added)":"+ Favourite" }</Button>
        </Card.Text>
      </Card.Body>
    </Card>
    </>
    }
    </>
     )
  }