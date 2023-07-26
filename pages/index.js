import { Container } from "react-bootstrap";
import FeaturedNews from "../components/featuredNews";
import Header from "../components/header";
import ListNews from "../components/blogList";
import Footer from "../components/footer";

export async function getServerSideProps() {
    const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;
    // Fetch data from external API
    const resBlog = await fetch(URLBLOG);
    const dataBlog = await resBlog.json();
    const dataNews = dataBlog;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const data = dataInstitucional;
    // Pass data to the page via props
    return { props: { dataNews, data } };
}

export default function Home({ dataNews, data }) {
    return (
        <>
            <Header />
            <FeaturedNews dataNews={dataNews.data} />
            <ListNews dataNews={dataNews.data} />
            <Footer dataInstitutional={data} />
        </>
    );
}
