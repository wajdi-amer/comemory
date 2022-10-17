import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';

import useStyles from './styles';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination/Paginate';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Homepage = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tagsSearch, setTagsSearch] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if(search.trim() || tagsSearch) {
            dispatch(getPostsBySearch({ search, tagsSearch: tagsSearch.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tagsSearch.join(',')}`)
        } else {
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => setTagsSearch([...tagsSearch, tag]);
    const handleDelete = (tagToDelete) => setTagsSearch(tagsSearch.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' label='Search Memories...' onKeyUp={handleKeyPress}
                                fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tagsSearch}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search by Tags...'
                                variant='outlined'
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} className={classes.pagination}>
                            <Paginate page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Homepage
