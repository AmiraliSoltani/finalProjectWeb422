import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Button, Card, Col, Pagination, Row } from 'react-bootstrap';
import useSWR from 'swr';
import ArtworkCard from '../../components/ArtworkCard';
import validObjectIDList from '../../public/data/validObjectIDList.json';

export default function artwork() {


const  PER_PAGE = 12
const [artworkList, setArtworkList] = useState();
const [page, setPage] = useState(1);

const router = useRouter();
let finalQuery = router.asPath.split('?')[1];

const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);


useEffect(() => {
  if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
        let results=[]
           for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
            const chunk = filteredResults.slice(i, i + PER_PAGE);
            results.push(chunk);
           }
           setArtworkList(results);
           setPage(1)
    }

   }, [data]);

   function previousPage(e){
     if (page>1) setPage(prev=>prev - 1); //recommended (previous value + 1)
   }

   function nextPage(e){
   if (page < artworkList.length) setPage(prev=>prev + 1); 
  }

    return (
        
        <>
        {data?.length==0 && <Error statusCode={404} />}
        {artworkList && 
    <Row className="gy-4">
    {artworkList?.length > 0 && artworkList[page - 1].map(( currentObjectID)=>(
        <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>
        ))}
    </Row>
}

      {artworkList?.length == 0 && 
      <div className='mt-4'>
        <Card >
        <Card.Body>
          <Card.Title><h4>Nothing Here</h4></Card.Title>
          <Card.Text>
          Try searching for something else
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    }

{artworkList?.length > 0 &&
   <Pagination>
   <Pagination.Prev onClick={(e)=>{previousPage(e)}} />
   <Pagination.Item>{page}</Pagination.Item>
   <Pagination.Next onClick={(e)=>{nextPage(e)}} />
 </Pagination>
}
{!artworkList && <> </>}

        </>
    )
  }