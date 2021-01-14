import React, {useEffect, useState } from 'react'
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://api.enye.tech/v1/challenge/records');
      setRecords(res.data.records.profiles);
      setKeysArr(Object.keys(res.data.records.profiles[0]));
      setLoading(false);
      console.log(res.data.records.profiles);
    }

    fetchPosts();
  }, []); 
  
  console.log(records);
  //  Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

  //  Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
      <>
        <div>
          <Container>
            <Records records ={currentPosts} keysArr = {keysArr} loading = {loading} />
            <Pagination postsPerPage={postsPerPage} totalPosts={records.length} paginate={paginate} />
          </Container>
        </div>
      </>
  );

}

export default App;

