// Layouts/Menus/SettingsMenu.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateIconSidebar } from './utils';  // adjust the path according to your directory structure


export function useSettingsMenu(isCurrentState, setIscurrentState, setIsSettings, isSettings) {

  const history = useNavigate();

  useEffect(() => {
    if (isCurrentState === "options") {
      history("/options");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "categories") {
      history("/categories");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, isCurrentState]);


  return [
    {
      label: "الإعدادات",
      isHeader: true,
    },
    {
      id: "settings",
      label: "الإعدادات",
      icon: "ri-apps-2-line",
      link: "/#",


      stateVariables: isSettings,
      click: function (e) {
        e.preventDefault();
        setIsSettings(!isSettings);
        setIscurrentState("settings");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "options",
          label: "الإعدادات",
          link: "/settings",
          parentId: "settings",
          click: function (e) {
            e.preventDefault();
            setIscurrentState("options");
          },
        },
        {
          id: "categories",
          label: "التصنيف",
          link: "/settings/categories",
          parentId: "settings",
          click: function (e) {
            e.preventDefault();
            setIscurrentState("categories");
          },
        },
        {
          id: "groups",
          label: "المجموعات",
          link: "/settings/groups",
          parentId: "settings",
          click: function (e) {
            e.preventDefault();
            setIscurrentState("groups");
          },
        },
      ],
    },
  ];
}


