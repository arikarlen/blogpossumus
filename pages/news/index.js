import Footer from "../../components/commons/footer";
import Header from "../../components/commons/header";
import ListNews from "../../components/news/newsList";

export async function getServerSideProps() {
    const URLBLOG = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_BLOG}?populate=*`;
    const URLINSTITUCIONAL = `${process.env.NEXT_PUBLIC_API}/${process.env.NEXT_PUBLIC_API_INSTITUTIONAL}?populate[0]=Contacto&populate[1]=Assets.Logo_Alt`;

    const resBlog = await fetch(URLBLOG);
    const dataBlog = await resBlog.json();
    const dataNews = dataBlog;

    const resInstitucional = await fetch(URLINSTITUCIONAL);
    const dataInstitucional = await resInstitucional.json();
    const data = dataInstitucional;

    return { props: { dataNews, data } };
}

export default function NewsSection({ dataNews, data }) {
    return (
        <>
            <Header />
            <ListNews dataNews={dataNews.data} />
            <Footer dataInstitutional={data} />
        </>
    );
}
