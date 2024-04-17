import ContainerWrapper from "../ContainerWrapper/ContainerWrapper";
import "./Detection.scss";
import DetectionImage from "./DetectionImage/DetectionImage";
import ListResultDetection from "./ListResultDetection/ListResultDetection";

import database from "../../config/firebaseConfig";
import { useEffect, useState } from "react";
import { ref, child, get, onValue } from "firebase/database";

function Detection() {
  const [imageData, setImageData] = useState();
  const [imageKeyList, setImageKeyList] = useState([]);
  const [currentImages, setCurrentImages] = useState(null);

  useEffect(() => {
    const dbRef = ref(database);

    onValue(dbRef, (sns) => {
      get(child(dbRef, "images_info"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const imageInfo = snapshot.val();
            console.log(imageInfo);
            if (imageInfo) {
              setImageData(imageInfo);
              const keyList = Object.keys(imageInfo).reverse();
              // console.log(keyList);
              setImageKeyList(keyList);

              // Lấy hình ảnh mới nhất từ danh sáchs
              setCurrentImages(imageInfo[keyList[0]]);
            } else {
              setImageKeyList([]);
              setCurrentImages(null);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const handleOnChangeImage = (key) => {
    console.log("change key:s", key);
    setCurrentImages(imageData[key]);
  };

  return (
    <div className="detection-container pt-5">
      <div className="container mt-5">
        <div className="row">
          <div class="col-lg-9 col-md-9 col-sm-12 mb-3">
            <ContainerWrapper>
              <div className="p-4 pb-0">
                <div className="time-detection text-center mb-4 ">
                  <span className="fst-italic">
                    Thời gian nhận diện:{" "}
                    {currentImages &&
                      currentImages["time_predict"].split(".")[0]}
                  </span>
                </div>
                <DetectionImage images={currentImages && currentImages} />
                <div className="final-result text-center mt-3">
                  <b>Kết quả: </b>
                  {currentImages && currentImages.result === 0
                    ? "Đạt"
                    : "Không đạt"}
                </div>
              </div>
            </ContainerWrapper>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-0 ">
            <ContainerWrapper>
              <ListResultDetection
                handleOnChangeImage={handleOnChangeImage}
                keyList={imageKeyList}
                imageData={imageData}
              />
            </ContainerWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detection;
