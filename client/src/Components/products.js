import React from 'react';
import ProductCard from './productCard';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductsQuery } from '../Redux/api/productsApiSlice';
import { filterAction } from '../Redux/Features/filterSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { catagory, type, page } = useSelector((state) => state.filter);
    const name = useSelector((state) => state.search.name);

    const deviceWidth = () => {
        return window.innerWidth < 900;
    };

    const itemsPerPage = deviceWidth() ? 10 : 18;

    const { data: allProducts, isError, isLoading } = useGetProductsQuery({ page, limit: itemsPerPage, type, catagory, name });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching products</div>;
    }

    const totalPages = Math.ceil(allProducts?.total / itemsPerPage);

    return (
        <>
            <Grid container spacing={2}>
                {allProducts?.data.map((items) => {
                    return (
                        <Grid item lg={2} sm={4} xs={6} key={items._id}>
                            <ProductCard
                                id={items._id}
                                details={items.details}
                                name={items.name}
                                price={items.price}
                                quantity={items.quantity}
                                location={items.location}
                                catagory={items.catagory}
                                type={items.type}
                                url={items.url}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                <Grid item lg={12}>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '1rem',
                        }}
                    >
                        <ButtonGroup aria-label="outlined button group">
                            {[...Array(totalPages).keys()].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <Button
                                        key={pageNum}
                                        onClick={() => {
                                            dispatch(filterAction.setPage(pageNum));
                                        }}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </ButtonGroup>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default Products;
