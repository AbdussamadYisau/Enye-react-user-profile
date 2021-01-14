import React, {useEffect, useState } from 'react'
import {  } from "module";
import axios from 'axios'
import Records from './Components/Records';
import Pagination from './Components/Pagination';
import { Container} from 'react-bootstrap';


function App() {
  const [records, setRecords] = useState([]);
  const [recordToPrint, setRecordToPrint] = useState(records);
  const [keysArr, setKeysArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [searchGender, setSearchGender] = useState("");
  const [searchPayment, setSearchPayment] = useState("");
  
  const [genderFilter, setGenderFilter] = useState([]);
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



  useEffect(() => {
    if(searchGender === 'All') {
      setFilteredPatients(
        records.filter((record) =>
          record.Gender.toLowerCase()
        )
      );
    } else {
      setFilteredPatients(
        records.filter((record) =>
          
          record.Gender.toLowerCase() === (searchGender.toLowerCase())
        )
      );
    }
  }, [searchGender, records]);



  useEffect(() => {
    if (searchPayment === 'All') {
      setFilteredPatients(
        records.filter((record) =>
          record.PaymentMethod.toLowerCase()
        )
      );

    } else {
      setFilteredPatients(
        records.filter((record) =>
          record.PaymentMethod.toLowerCase().includes(searchPayment.toLowerCase())
        )
      );

    }
  }, [searchPayment, records]);
  
 
  //  Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);


  //  Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  //  Search Result 

  const searchResult = () => {
      if (filteredPatients.length === records.length) {
        return(
          <Records records ={currentPosts} keysArr = {keysArr} loading = {loading} />
        );
      } else {

        console.log(filteredPatients);
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
              type='text'
              className='form-control'
              placeholder='Search First Name or Last Name'
              onChange={(e) => setSearch(e.target.value)}
            />
            
            {/* <h2> Filter Based on Gender or Payment Method</h2> */}

            <h2> Filter Based on Gender or Payment Method</h2>
            <div className='d-flex'>
        
                <select onChange={(e) => setSearchGender(e.target.value)}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option selected value='All'>All</option>
                </select>
                  
            
                <select
                  onChange={(e) => setSearchPayment(e.target.value)}
                >
                  <option value='CC'>CC</option>
                  <option value='check'>Check</option>
                  <option value='paypal'>PayPal</option>
                  <option value='money order'>Money Order</option>
                  <option selected value='All'>All</option>

                </select>
            

            </div>

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

