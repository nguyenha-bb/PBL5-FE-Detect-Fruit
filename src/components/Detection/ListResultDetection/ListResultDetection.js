import { useState } from "react";
import {
  Checkicon,
  ChevDownIcon,
  ChevRightIcon,
  CloseIcon,
} from "../../Icon/Icon";
import "./ListResultDetection.scss";
import ResultItem from "./ResultItem";

function ListResultDetection({ keyList, handleOnChangeImage, imageData }) {
  const [isToggleListResult, setIsToggleResult] = useState(true);

  const handleToggleListResult = () => {
    setIsToggleResult(!isToggleListResult);
  };
  return (
    <div className="list-results-container">
      <div
        className="title-results d-flex gap-2 justify-content-center align-items-center"
        onClick={() => handleToggleListResult()}
      >
        <span>Kết quả nhận diện</span>{" "}
        {isToggleListResult ? (
          <ChevDownIcon />
        ) : (
          <ChevRightIcon width="20" height="20" color="#e8b12d" />
        )}
      </div>
      {isToggleListResult && keyList ? (
        <div className="list-results mt-3">
          {keyList.map((item, index) => {
            return (
              <ResultItem
                key={index}
                handleOnChangeImage={() => handleOnChangeImage(item)}
                leftIcon={
                  imageData[item].result === 0 ? (
                    <Checkicon color="#15CB53" />
                  ) : (
                    <CloseIcon color="red" />
                  )
                }
              >
                <div className="d-flex flex-column">
                  <span className="text-start">
                    {imageData[item].result === 0 ? "Đạt" : "Không đạt"}
                  </span>
                  <span className="time">
                    {imageData[item]["time_predict"].split(".")[0]}
                  </span>
                </div>
              </ResultItem>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ListResultDetection;
