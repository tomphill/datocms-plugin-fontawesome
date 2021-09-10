import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
//import { iconsBrands } from "./icons/iconsBrands";
//import { iconsRegular } from "./icons/iconsRegular";
import { iconsSolid } from "./icons/iconsSolid";
import * as faSolid from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App({ plugin }) {
  return (
    <div className="App">
      {iconsSolid.map((icon) => {
        let iconNameSpaces = icon.name.replace("-", " ");
        while (iconNameSpaces.indexOf("-") !== -1) {
          iconNameSpaces = iconNameSpaces.replace("-", " ");
        }
        const iconNameSplit = iconNameSpaces.split(" ");
        let reactIconName = "";
        iconNameSplit.forEach((str) => {
          reactIconName = `${reactIconName}${str[0].toUpperCase()}${str.substr(
            1
          )}`;
        });

        library.add(faSolid[`fa${reactIconName}`]);
        return (
          <div className="icon" key={`${icon.prefix}${icon.name}`}>
            <div>
              <FontAwesomeIcon icon={[icon.prefix, icon.name]} />
            </div>
            <span>{icon.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
