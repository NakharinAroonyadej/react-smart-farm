import { atom } from "recoil"

const lightPrimary = "#e2e8f0"
const lightSecondary = "white"
const darkPrimary = "#141418"
const darkSecondary = "#23232e"

export const themeState = atom({
  key: "theme",
  default: "dark",
})

export const darkThemePrimaryState = atom({
  key: "darkPrimary",
  default: darkPrimary,
})

export const darkThemeSecondaryState = atom({
  key: "darkSecondary",
  default: darkSecondary,
})

export const lightThemePrimaryState = atom({
  key: "lightPrimary",
  default: lightPrimary,
})

export const lightThemeSecondaryState = atom({
  key: "lightSecondary",
  default: lightSecondary,
})
