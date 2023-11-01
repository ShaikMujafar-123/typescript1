import "./propertyList.css";
import { PropertyTypes } from "../../utils/config";
const PropertyList : React.FC = () => {
  return (
    <div className="pList">
        {PropertyTypes.map((property) =>
      <div className="pListItem">
        <img
          src={property.propertyImg}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{property.propertyName}</h1>
          <h2>{property.availablity}</h2>
        </div>
      </div>
      )}
    </div>
  );
};

export default PropertyList;