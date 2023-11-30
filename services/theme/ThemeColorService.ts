import { makeAutoObservable } from "mobx";
import { BasicColorSchema, useColorMode } from "@vueuse/core";
import {
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/vue/20/solid";
import { IThemeColorService } from "./IThemeColorService";
import { BaseSwitchItem } from "~/models/base/BaseSwitchItem";

export class ThemeColorService implements IThemeColorService {
  /**
   * Class that holds all the logic for getting and setting the theme (light/dark/auto)..
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the overall theme setting.
   * The ThemeColorService implements the IThemeColorService.
   *
   */
  themes: BaseSwitchItem[] = [
    // Altough mode and name look similar, the type that is implemented is different.
    // The 'mode' is necessery in order to:
    // 1: use the setTheme method, the mode can only be changed with this type of argument
    // 2: filter with getItem, the values compared should be of the same type
    new BaseSwitchItem({
      id: 1,
      name: "Light",
      icon: SunIcon,
      mode: "light",
    }),
    new BaseSwitchItem({
      id: 2,
      name: "Dark",
      icon: MoonIcon,
      mode: "dark",
    }),
    new BaseSwitchItem({
      id: 3,
      name: "Auto",
      icon: ComputerDesktopIcon,
      mode: "auto",
    }),
  ];

  constructor() {
    makeAutoObservable(this);
  }

  mode = useColorMode({
    emitAuto: true,
  });

  getTheme(): BaseSwitchItem {
    const theme = this.themes.find((i) => i.mode === this.mode.value);

    if (!theme) {
      return this.themes[0];
    }
    return theme;
  }

  setTheme(theme: BasicColorSchema) {
    this.mode.value = theme;
  }
}

export const themeColorService = new ThemeColorService();
