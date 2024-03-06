import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "@/components/commons/container/Container";
import Title from "../titles";
import Breadcrumb from "../breadCrumb/BreadCrumb";
import { filterNews, resetNews } from "app/news/actions";
import { filterWebinars, resetWebinars } from "app/webinars/actions";

export default function SearchInput({ type }) {
  const isWebinar = type.toLowerCase() === "webinars";
  const isNews = type.toLowerCase() === "news";

  async function onSubmit(FormData) {
    "use server";
    if (isNews) {
      await filterNews(FormData);
    }
    if (isWebinar) {
      await filterWebinars(FormData);
    }
  }

  return (
    <>
      <Container className="pt-20 xs:pt-10">
        <Breadcrumb
          items={[
            { text: "Inicio", href: "/", active: false },
            { text: type, href: `/${type.toLowerCase()}`, active: true, resetFunction: isNews ? resetNews : resetWebinars },
          ]}
        />
      </Container>
      <Container className="mt-10 md:mt-0">
        <Title title={type} className="text-center" />
        <form action={onSubmit} className="w-full my-4 flex justify-center">
          <input
            type="text"
            name="key"
            aria-describedby="passwordHelpBlock"
            className="py-1 px-1 rounded-l-2xl bg-light-gray border border-light-gray focus:border-yellow ease-in-out duration-150 w-auto md:w-96"
          />
          <button
            type="Submit"
            name="Buscar"
            className={`rounded-r-2xl py-1 px-2 bg-yellow border-yellow`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </Container>
    </>
  );
}
