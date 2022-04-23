import React, { useState } from 'react';
import List from '../List';
import axios from 'axios';
import { Row, Col, InputGroup, Input, Button } from 'reactstrap';
import { useToasts } from "react-toast-notifications";
import 'bootstrap/dist/css/bootstrap.css';

const Search = () => {
    const [searchedWord, setSearchedWord] = useState('');
    const [defiArray, setDefiArray] = useState([]);
    const { addToast } = useToasts();

    const handleChange = (val) => {
        setSearchedWord(val);
    }

    const searchWord = async () => {
        try {
            const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`, {});
            if (data.status === 200) {
                setDefiArray(data.data.splice(0, 1));
            } else {
                throw new Error(data.title);
            }
        } catch (error) {
            if (error.message == 'Request failed with status code 404') {
                addToast('No defination found.', { appearance: 'error', autoDismiss: true });
            } else {
                addToast(error.message || 'Something went wrong', { appearance: 'error', autoDismiss: true });
            }
            setDefiArray([]);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchedWord != '') {
            searchWord();
        }
    }
    return (
        <>
            <div className='mb-4' style={{ display: 'flex' }}>
                <InputGroup>
                    <Input bsSize='lg' onChange={(e) => handleChange(e.target.value)} id='word' name='word'
                        onKeyDown={(e) => handleKeyPress(e)} />
                    <Button onClick={() => searchWord()} color="success"
                        disabled={searchedWord != '' ? false : true}>
                        Search
                    </Button>
                </InputGroup>
            </div>
            <div style={{ maxHeight: '400px', overflow: 'auto', overflowX: 'hidden' }}>
                <Row style={{ justifyContent: 'center' }}>
                    {defiArray.length > 0 && defiArray.map((data, i) =>
                        <Col md='8' key={data.word + i}>
                            <List data={data} index={i} key={data.word + i + 'list'} />
                        </Col>
                    )}
                </Row>
            </div>

        </>
    )
}

export default Search;
