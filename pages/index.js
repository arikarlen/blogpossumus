import { Container } from "react-bootstrap";
import FeaturedNews from "../components/featuredNews";
import Header from "../components/header";

export async function getServerSideProps() {
    const URL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}/`;

    // Fetch data from external API
    const res = await fetch(URL);
    const data = await res.json();
    const dataNews = data;
    // Pass data to the page via props
    return { props: { dataNews } };
}

export default function Home({ dataNews }) {
    return (
        <>
            <Header />
            <Container>
                <FeaturedNews dataNews={dataNews.data} />
            </Container>
        </>
    );
}
