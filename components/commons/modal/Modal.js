import Image from "next/image";
import Container from "../container/Container";
import closeIcon from "../../../assets/close-circle.png";

function Modal({ children, show, onHide, ...props }) {
  return (
    show && (
      <>
        <Container
          fluid
          className="h-screen grid justify-items-center items-center fixed z-20 top-0 left-0 w-screen"
        >
          <Container
            fluid
            className="bg-black h-screen opacity-30 fixed z-20 top-0 left-0 w-full"
            onClick={onHide}
          ></Container>
          <article
            className="h-max bg-white w-10/12 md:w-5/12 flex flex-col rounded-2xl justify-center items-center z-30"
            {...props}
          >
            {children}
          </article>
        </Container>
      </>
    )
  );
}

const Header = ({ children, handleClose, ...props }) => {
  return (
    <div
      className="bg-cover bg-no-repeat rounded-t-2xl bg-center relative h-40 text-white flex justify-center items-end"
      {...props}
    >
      <Image
        className="absolute top-3 right-3 cursor-pointer"
        src={closeIcon.src}
        alt="Close modal"
        onClick={handleClose}
        width={30}
        height={30}
      />
      {children}
    </div>
  );
};

const Title = ({ children, ...props }) => (
  <h2 className="!font-gotham !font-bold !text-l text-center" {...props}>
    {children}
  </h2>
);

Modal.Title = Title
Modal.Header = Header

export default Modal