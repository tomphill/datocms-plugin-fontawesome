import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { FC, useState } from "react";
import get from "lodash/get";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { iconsBrands } from "../icons/iconsBrands";
import { iconsRegular } from "../icons/iconsRegular";
import { iconsSolid } from "../icons/iconsSolid";
import * as faSolid from "@fortawesome/free-solid-svg-icons";
import * as faRegular from "@fortawesome/free-regular-svg-icons";
import * as faBrands from "@fortawesome/free-brands-svg-icons";

import "./styles.css";
import { Canvas } from "datocms-react-ui";

type Props = {
  ctx: RenderFieldExtensionCtx;
};

const FontAwesomePicker: FC<Props> = ({ ctx }) => {
  const initialValue = get(ctx?.formValues, ctx?.fieldPath || "");
  const [showIcons, setShowIcons] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(
    typeof initialValue === "string" ? JSON.parse(initialValue) : null
  );

  const handleIconClick = (icon: FontAwesomeIconProps) => {
    setSelectedIcon(icon);
    ctx?.setFieldValue(ctx.fieldPath, icon ? JSON.stringify(icon) : "");
  };

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

  const getReactIconName = (icon: { prefix: string; name: string }) => {
    let iconNameSpaces = icon?.name?.replace("-", " ") || "";
    while (iconNameSpaces.indexOf("-") !== -1) {
      iconNameSpaces = iconNameSpaces.replace("-", " ");
    }
    const iconNameSplit = iconNameSpaces.split(" ");
    let reactIconName = "";
    iconNameSplit.forEach((str: string) => {
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
    <Canvas ctx={ctx}>
      <div className="App">
        {!selectedIcon && (
          <>
            <div style={{ marginBottom: 20 }}>
              <span className="toggler" onClick={() => setShowIcons((s) => !s)}>
                {showIcons ? "Hide" : "Show"} all icons
              </span>
            </div>
            {!!showIcons && (
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
          </>
        )}
        {!!selectedIcon && (
          <div
            className="selected-icon"
            key={`${selectedIcon.prefix}${selectedIcon.iconName}`}
          >
            <div>
              <FontAwesomeIcon icon={selectedIcon} />
            </div>
            <span>{selectedIcon.iconName}</span>
            <div
              onClick={() => {
                ctx?.setFieldValue(ctx.fieldPath, null);
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
            !!showIcons &&
            workingIcons.map((icon) => {
              const reactIconName = getReactIconName(icon);
              let importFrom: any;
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
                      ...importFrom[`fa${reactIconName}`],
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
        {!selectedIcon && !!showIcons && !!workingIcons.length && (
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
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleDoubleLeft} />
                </button>
                <button
                  onClick={() => setCurrentPage((s) => s - 1)}
                  disabled={currentPage === 1}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleLeft} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((s) => s + 1)}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleRight} />
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  className="btn"
                  style={{
                    background: ctx?.theme.primaryColor || "black",
                  }}
                >
                  <FontAwesomeIcon icon={faSolid.faAngleDoubleRight} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Canvas>
  );
};

export default FontAwesomePicker;
