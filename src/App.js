import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
//import { iconsBrands } from "./icons/iconsBrands";
//import { iconsRegular } from "./icons/iconsRegular";
import { iconsSolid } from "./icons/iconsSolid";
import * as faSolid from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App({ plugin }) {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const getReactIconName = (icon) => {
    let iconNameSpaces = icon.name.replace("-", " ");
    while (iconNameSpaces.indexOf("-") !== -1) {
      iconNameSpaces = iconNameSpaces.replace("-", " ");
    }
    const iconNameSplit = iconNameSpaces.split(" ");
    let reactIconName = "";
    iconNameSplit.forEach((str) => {
      reactIconName = `${reactIconName}${str[0].toUpperCase()}${str.substr(1)}`;
    });
    return reactIconName;
  };

  useEffect(() => {
    iconsSolid.forEach((icon) => {
      const reactIconName = getReactIconName(icon);
      library.add(faSolid[`fa${reactIconName}`]);
    });
  }, []);

  return (
    <>
      <div className="App">
        {!selectedIcon && <h3>No icon selected</h3>}
        {!!selectedIcon && (
          <div
            className="selected-icon"
            key={`${selectedIcon.prefix}${selectedIcon.name}`}
          >
            <div>
              <FontAwesomeIcon
                icon={[selectedIcon.prefix, selectedIcon.name]}
              />
            </div>
            <span>{selectedIcon.name}</span>
            <div onClick={() => setSelectedIcon(null)} className="remove-text">
              Remove
            </div>
          </div>
        )}
        <div className="grid">
          {!selectedIcon &&
            iconsSolid.map((icon) => {
              const reactIconName = getReactIconName(icon);

              return (
                <div
                  onClick={() =>
                    handleIconClick({
                      ...icon,
                      reactName: `fa${reactIconName}`,
                    })
                  }
                  className="icon"
                  key={`${icon.prefix}${icon.name}`}
                >
                  <div>
                    <FontAwesomeIcon icon={[icon.prefix, icon.name]} />
                  </div>
                  <span>{icon.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
