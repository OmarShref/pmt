import coinIcon from "../assets/coin.png";

export default function NotFound() {
  return (
    <>
      <div className="grid h-screen place-items-center">
        <div>
          <img src={coinIcon} alt="coin icon" className="mx-auto h-14 w-14" />
          <p className="my-4 text-center text-lg">Sorry, Page Not Found !!!.</p>
        </div>
      </div>
    </>
  );
}
