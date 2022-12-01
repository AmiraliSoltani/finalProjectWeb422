
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Button, Card, Col, Row } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if(!favouritesList) return null;

  return (

    <>
    {favouritesList && 
<Row className="gy-4">
{favouritesList?.length > 0 && favouritesList.map(( currentObjectID)=>(
    <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
    ))}
</Row>
}

  {favouritesList?.length == 0 && 
  <div className='mt-4'>
    <Card >
    <Card.Body>
      <Card.Title><h4>Nothing Here</h4></Card.Title>
      <Card.Text>
      Nothing Here Try adding some new artwork to the list
            </Card.Text>
    </Card.Body>
  </Card>
  </div>
}

{!favouritesList && <> </>}

    </>

  )
}