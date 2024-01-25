import Link from "next/link";
import { Button, Container, Row } from "react-bootstrap";
import styles from './relatedNews.module.css'

export default function NoRelatedNewsFounded(){
    return <Container className={styles.noRelatedNews}>
    <Row>
      <h2>No se encontraron notas relacionadas</h2>
      <Link href="/news" style={{textDecoration: 'none'}} className="d-flex justify-content-center">
        <Button variant="primary">Ver todas las notas</Button>
      </Link>
    </Row>
  </Container>
}