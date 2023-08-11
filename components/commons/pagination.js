import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
export default function Pagination({ page, setPage, dataPagination }) {
    const MoreNews = () => {
        setPage(page + 1);
    };

    const OldNews = () => {
        setPage(page - 1);
    };
    console.log(dataPagination);
    return (
        <Container className="navigation">
            <Row>
                <Col md={3} className="newNews">
                    {" "}
                </Col>
                <Col md={6} className="pageNumber">
                    <p>
                        {page == 1 ? "" : <FontAwesomeIcon onClick={OldNews} icon={faCaretLeft} />} Página {page} de {dataPagination?.pageCount} {page == dataPagination?.pageCount ? "" : <FontAwesomeIcon onClick={MoreNews} icon={faCaretRight} />}
                    </p>
                </Col>
                <Col md={3} className="oldNews"></Col>
            </Row>
        </Container>
    );
}
