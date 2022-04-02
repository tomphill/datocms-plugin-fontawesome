import {
  connect,
  IntentCtx,
  RenderFieldExtensionCtx,
} from "datocms-plugin-sdk";
import { render } from "./utils/render";
import "datocms-react-ui/styles.css";
import FontAwesomePicker from "./components/FontAwesomePicker";
import ReactDOM from "react-dom";

if (process.env.NODE_ENV === "development") {
  const container = document.createElement("div");
  document.body.appendChild(container);

  ReactDOM.render(<FontAwesomePicker />, container);
} else if (process.env.NODE_ENV === "production") {
  connect({
    manualFieldExtensions(ctx: IntentCtx) {
      return [
        {
          id: "fontawesome",
          name: "Font Awesome",
          type: "editor",
          fieldTypes: ["json"],
        },
      ];
    },
    renderFieldExtension(
      fieldExtensionId: string,
      ctx: RenderFieldExtensionCtx
    ) {
      switch (fieldExtensionId) {
        case "fontawesome":
          return render(<FontAwesomePicker ctx={ctx} />);
        default:
          return null;
      }
    },
  });
}
