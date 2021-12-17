import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";
import forms from "windicss/plugin/forms";

export default defineConfig({
    extract: {
        exclude: ["node_modules"],
    },
    safelist: ["prose", "prose-sm", "m-auto"],
    darkMode: "class",
    plugins: [typography, forms],
    theme: {
        colors: {
            blue: colors.blue,
            red: colors.red,
            gray: colors.gray,
            green: colors.green,
            white: colors.white,
        },
    },
});
