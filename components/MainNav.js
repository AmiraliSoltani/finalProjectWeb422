import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useState} from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from '../lib/authenticate';

export default function MainNav() {
  const [search, setSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
let token = readToken()

  function logout(){
    setIsExpanded(false)
    removeToken()
    router.push(`/login`)

  }

  async function submitForm(e){
    e.preventDefault();
    setIsExpanded(false)
    if(search){
      //setSearchHistory(current => [...current, `title=true&q=${search}`]);
      setSearchHistory(await addToHistory(`title=true&q=${search}`))
      setSearch("")
      router.push(`/artwork?title=true&q=${search}`)
    } 
  }

  function toggle(){
  setIsExpanded(!isExpanded)
  }

  function close(){
    setIsExpanded(false)
  }

  return (
    <>
    <Navbar expand="lg" style={{backgroundColor:"#2c3e50"}} className="fixed-top navbar-dark " expanded={isExpanded}>
    <Container>
      <Navbar.Brand >Amirali Soltani</Navbar.Brand>
      <Navbar.Toggle onClick={toggle} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={close}>Home</Nav.Link></Link>
        {token &&<Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={close}>Advanced Search</Nav.Link></Link>}


        </Nav>

        &nbsp;{token &&<Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
             value={search} onChange={(e) => setSearch(e.target.value)}
            />
                   <Button className='btn btn-success' type="submit" >Search</Button>
          </Form>}&nbsp;
          {token &&
          <Nav>
          <NavDropdown title={token.userName} id="basic-nav-dropdown">
          <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/favourites"}  onClick={close} >Favourites</NavDropdown.Item></Link>
          <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/history"} onClick={close} >Search History</NavDropdown.Item></Link>
         <NavDropdown.Item active={router.pathname === "/login"} onClick={logout} >logout</NavDropdown.Item>

            </NavDropdown>
          </Nav>}

          {!token &&
          <Nav className="ml-auto">
           <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={close}>Register</Nav.Link></Link>
           <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={close} >Log in</Nav.Link></Link>
        </Nav>}

      </Navbar.Collapse>
    </Container>
  </Navbar>
  <br />
  <br />
  </>
  )
}
