import FeaturedWebinars from "@/components/webinars/featuredWebinars/featuredWebinars";
import Container from "../container/Container";
import FeaturedNews from "@/components/news/featuredNews/featuredNews";

export default function RecomendedArticles() {
    return <Container className="grid grid-cols-2 justify-items-center text-start">
        <FeaturedNews />
        <FeaturedWebinars />
    </Container>
}