import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconsBrands } from "./icons/iconsBrands";
import { iconsRegular } from "./icons/iconsRegular";
import { iconsSolid } from "./icons/iconsSolid";
import * as faSolid from "@fortawesome/free-solid-svg-icons";
import * as faRegular from "@fortawesome/free-regular-svg-icons";
import * as faBrands from "@fortawesome/free-brands-svg-icons";
import "./App.css";

function App({ plugin }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(
    plugin?.getFieldValue(plugin?.fieldPath) || null
  );
  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    plugin?.setFieldValue(plugin?.fieldPath, JSON.stringify(icon));
  };

  console.log("VALUE: ", JSON.parse(plugin?.getFieldValue(plugin?.fieldPath)));

  const allIcons = [...iconsSolid, ...iconsRegular, ...iconsBrands]
    .filter((icon) => {
      if (searchTerm) {
        return icon.name.indexOf(searchTerm.toLowerCase()) !== -1;
      } else {
        return icon;
      }
    })
    .sort((a, b) => {
      const aName = `${a.name}${a.prefix}`;
      const bName = `${b.name}${b.prefix}`;

      if (aName > bName) {
        return 1;
      } else if (aName < bName) {
        return -1;
      }
      return 0;
    });

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

  const pageSize = 30;
  const workingIcons = [...allIcons].slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  );
  const totalPages = Math.ceil(allIcons.length / pageSize);

  return (
    <>
      <div className="App">
        {!selectedIcon && (
          <div className="search-input-wrapper">
            <input
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchTerm(e.target.value);
              }}
              placeholder="Search..."
              type="search"
            />
          </div>
        )}
        {!!selectedIcon && (
          <div
            className="selected-icon"
            key={`${selectedIcon.prefix}${selectedIcon.name}`}
          >
            <div>
              <FontAwesomeIcon icon={selectedIcon.reactImport} />
            </div>
            <span>{selectedIcon.name}</span>
            <div
              onClick={() => {
                plugin?.setFieldValue(plugin?.fieldPath, null);
                setSelectedIcon(null);
              }}
              className="remove-text"
            >
              Remove
            </div>
          </div>
        )}
        <div className="grid">
          {!selectedIcon &&
            workingIcons.map((icon) => {
              const reactIconName = getReactIconName(icon);
              let importFrom;
              switch (icon.prefix) {
                case "fas":
                  importFrom = faSolid;
                  break;
                case "far":
                  importFrom = faRegular;
                  break;
                case "fab":
                  importFrom = faBrands;
                  break;
                default:
                  break;
              }

              return (
                <div
                  onClick={() =>
                    handleIconClick({
                      ...icon,
                      reactImport: importFrom[`fa${reactIconName}`],
                    })
                  }
                  className="icon"
                  key={`${icon.prefix}${icon.name}`}
                >
                  <div>
                    <FontAwesomeIcon icon={importFrom[`fa${reactIconName}`]} />
                  </div>
                  <span>{icon.name}</span>
                </div>
              );
            })}
        </div>
        {!workingIcons.length && <h3>No icons found.</h3>}
        {!selectedIcon && !!workingIcons.length && (
          <div className="pagination">
            <div>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <div className="pages">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{
                    background: plugin?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleDoubleLeft} />
                </button>
                <button
                  onClick={() => setCurrentPage((s) => s - 1)}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{
                    background: plugin?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleLeft} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((s) => s + 1)}
                  className="btn"
                  style={{
                    background: plugin?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleRight} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="btn"
                  style={{
                    background: plugin?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleDoubleRight} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
