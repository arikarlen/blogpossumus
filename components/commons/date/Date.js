import moment from "moment";
import "moment/locale/es";

export default function Date({ date }) {
  return (
    <>
      {moment(date).format("DD [de] MMMM [del] YYYY")}
    </>
  );
}
