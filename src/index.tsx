import {
  connect,
  IntentCtx,
  OnBootCtx,
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
    async onBoot(ctx: OnBootCtx) {
      // if we already performed the migration, skip
      if (ctx.plugin.attributes.parameters.migratedFromLegacyPlugin) {
        return;
      }

      // if the current user cannot edit fields' settings, skip
      if (!ctx.currentRole.meta.final_permissions.can_edit_schema) {
        return;
      }

      // get all the fields currently associated to the plugin...
      const fields = await ctx.loadFieldsUsingPlugin();

      // ... and for each of them...
      await Promise.all(
        fields.map(async (field: any) => {
          // set the fieldExtensionId to be the new one
          await ctx.updateFieldAppearance(field.id, [
            {
              operation: "updateEditor",
              newFieldExtensionId: "fontawesome",
            },
          ]);
        })
      );

      // save in configuration the fact that we already performed the migration
      ctx.updatePluginParameters({
        ...ctx.plugin.attributes.parameters,
        migratedFromLegacyPlugin: true,
      });
    },
  });
}
