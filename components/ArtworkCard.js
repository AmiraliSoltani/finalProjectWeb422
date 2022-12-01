import useSWR from 'swr';
import Error from 'next/error';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

export default function ArtworkCard(props) {

    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

    return (
        <>
    {!data && <></>}
    {error && <Error statusCode={404} />}

    {data &&  
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.primaryImageSmall? data.primaryImageSmall:"https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"} />
      <Card.Body>
        <Card.Title>{data.title? data.title:"N/A" }</Card.Title>
        <Card.Text>
        <div><b>Date:&nbsp;</b>{data.objectDate? data.objectDate:"N/A" }</div>
        <div><b>Classification:&nbsp;</b>{data.classification? data.classification:"N/A" }</div>
        <div><b>Medium:&nbsp;</b>{data.medium? data.medium:"N/A" }</div>

        </Card.Text>
        <Link href={`artwork/${props.objectID}`} passHref> <Button style={{backgroundColor:"#2c3e50"}}>ID: {data.objectID}</Button> </Link> 
      </Card.Body>
    </Card>
}
    </>
     )
  }