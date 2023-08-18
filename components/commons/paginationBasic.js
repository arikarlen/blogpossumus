import { Container, Row, Col, Pagination } from "react-bootstrap";
import { useState } from "react";

export default function PaginationBasic({ page, setPage, dataPagination }) {
    const [activePage, setActivePage] = useState(page);
    let items = [];

    const firstPage = () => {
        setPage(1);
        setActivePage(1);
    };

    const lastPage = () => {
        setPage(dataPagination?.pageCount);
        setActivePage(dataPagination?.pageCount);
    };

    for (let number = 1; number <= dataPagination?.pageCount; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === activePage}
                onClick={() => {
                    setActivePage(number);
                    setPage(number);
                }}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container className="navigation">
            <Row>
                <Col md={3} className="newNews">
                    {" "}
                </Col>
                <Col md={6} className="pageNumber" style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination size="sm">
                        <Pagination.First onClick={firstPage} />
                        {items}
                        <Pagination.Last onClick={lastPage} />
                    </Pagination>
                </Col>
                <Col md={3} className="oldNews"></Col>
            </Row>
        </Container>
    );
}
