import { RiEmotionSadFill } from "react-icons/ri";

const PageNotFound = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-evenly items-center">
        <div className="m-auto flex flex-col justify-evenly items-center border border-gray-300 rounded-md">
          <div className="m-3 flex flex-col justify-evenly items-center">
            <div className="font-bold text-sm m-2">Calculator App</div>
            <RiEmotionSadFill size={40} />
            <div className="font-bold text-2xl m-2">Page Not Found</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
