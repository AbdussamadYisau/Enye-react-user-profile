import React, {useEffect, useState, useMemo } from 'react'
import {  } from "module";
import axios from 'axios'
import Records from './Components/Records';
import Pagination from './Components/Pagination';
import { Container} from 'react-bootstrap';


function App() {
  const [records, setRecords] = useState([]);
  const [keysArr, setKeysArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://api.enye.tech/v1/challenge/records');
      setRecords(res.data.records.profiles);
      setKeysArr(Object.keys(res.data.records.profiles[0]));
      setLoading(false);
    }

    fetchPosts();
  }, []); 


  useEffect(() => {
    setFilteredPatients(
      records.filter((record) =>
        record.FirstName.toLowerCase().includes(search.toLowerCase()) ||
        record.LastName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, records]);
  
 
  //  Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

  console.log(filteredPatients.length);

  //  Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  //  Search Result 

  const searchResult = () => {
      if (filteredPatients.length === records.length) {
        return(
          <Records records ={currentPosts} keysArr = {keysArr} loading = {loading} />
        );
      } else {
        return(
          <Records records ={filteredPatients} keysArr = {keysArr} loading = {loading} />
        );
      }
  }

  return (
      <>
        <div>
          <Container>
            <h1>Enye React User Profiles</h1>
            <input
              type="text"
              placeholder="Search First Name"
              onChange={(e) => setSearch(e.target.value)}
            />

          {
            searchResult()
          }
          <Pagination postsPerPage={postsPerPage} totalPosts={records.length} paginate={paginate} />
          </Container>
        </div>
      </>
  );

}

export default App;

